import { doc, addDoc, updateDoc, collection, getFirestore, limit, orderBy, query, QueryDocumentSnapshot, serverTimestamp, startAfter, getDocs } from "@react-native-firebase/firestore";
import { User, Message } from '../types/Message'

const db = getFirestore();
const MSG_LIMIT = 50;
const messagesRef = (roomId: string) => collection(db, `rooms/${roomId}/messages`);
type MessageCursor = QueryDocumentSnapshot;


async function postMessage(roomId: string, text: string, user:User){
    await addDoc(
    messagesRef(roomId),
    {text, user, createdAt: serverTimestamp()});
    
    await updateDoc(
    doc(db, `rooms/${roomId}`),
    {lastMessageAt: serverTimestamp(),
    });
}

function messageTo(snap: MessageCursor): Message {
    const data = snap.data();
    return {
        id: snap.id,
        text: data.text ?? '',
        createdAt: data.createdAt?.toDate() ?? new Date(),
        user: data.user,
    }
}

async function getMessages(roomId: string, after: MessageCursor){
    const queryMessage = query(
    messagesRef(roomId),
    orderBy('createdAt', 'desc'), 
    startAfter(after), 
    limit(MSG_LIMIT));

    const snapshot = await getDocs(queryMessage);
    return {
        messages: snapshot.docs.map(messageTo),
        oldest: snapshot.docs.at(-1),
        hasMore: snapshot.docs.length === MSG_LIMIT,
    };
};

