import { collection, getDocs, getFirestore, orderBy, query, QueryDocumentSnapshot } from "@react-native-firebase/firestore";
import { Room } from '../types/Room'

const db = getFirestore();

export async function fetchChatrooms(): Promise<Room[]> {
    const chatQuery = query(collection(db,  'rooms'), orderBy('lastMessageAt', 'desc'));
    const snapshot = await getDocs(chatQuery);

    return snapshot.docs.map(enterChatroom);
}


function enterChatroom(snap: QueryDocumentSnapshot): Room {
    const data = snap.data();

    return {
        id: snap.id,
        chatroom: data.name ?? 'No-name chatroom',
        description: data.description ?? '',
        lastMessageAt: data.lastMessageAt?.toDate() ?? null,
    };
}