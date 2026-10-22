import { doc, addDoc, updateDoc, collection, getFirestore, limit, orderBy, query, QueryDocumentSnapshot, serverTimestamp, startAfter, getDocs, onSnapshot, writeBatch } from "@react-native-firebase/firestore";
import { User, Message } from '../types/Message'

const db = getFirestore();
const MSG_LIMIT = 50;
const messagesRef = (roomId: string) => collection(db, `rooms/${roomId}/messages`);
export type MessageCursor = QueryDocumentSnapshot;


export async function postMessage(roomId: string, text: string, user:User){
    const createBatch = writeBatch(db);

    createBatch.set(doc(messagesRef(roomId)), {
        user,text,createdAt:serverTimestamp(),
    });

    createBatch.update(doc(db, 'rooms', roomId), {
        lastMsgAt: serverTimestamp(),
    });

    await createBatch.commit();
    // await addDoc(
    // messagesRef(roomId),
    // {text, user, createdAt: serverTimestamp()});
    
    // await updateDoc(
    // doc(db, `rooms/${roomId}`),
    // {lastMessageAt: serverTimestamp(),
    // });
}

export function messageTo(snap: MessageCursor): Message {
    const data = snap.data();
    return {
        id: snap.id,
        text: data.text ?? '',
        createdAt: data.createdAt?.toDate() ?? new Date(),
        user: data.user,
    }
}

export async function getMessages(roomId: string, after?: MessageCursor){

    const queryMessage = after
        ? query(messagesRef(roomId), orderBy('createdAt', 'desc'), startAfter(after), limit(MSG_LIMIT))
        : query(messagesRef(roomId), orderBy('createdAt', 'desc'), limit(MSG_LIMIT));

    const snapshot = await getDocs(queryMessage);
    return {
        messages: snapshot.docs.map(messageTo),
        newest: snapshot.docs[0],
        oldest: snapshot.docs.at(-1),
        hasMore: snapshot.docs.length === MSG_LIMIT,
    };
};

export function SnapMessages(roomId: string,
    newest:MessageCursor,
    onChange:(messages: Message[]) => void,
    onError:(error: Error) => void)
    {
    
    const q = newest
    ? query(messagesRef(roomId), orderBy('createdAt', 'asc'), startAfter(newest))
    : query(messagesRef(roomId), orderBy('createdAt', 'asc'));

    return onSnapshot(
        q, snapshot => onChange(snapshot.docs.map(messageTo)), onError 
    );
}

