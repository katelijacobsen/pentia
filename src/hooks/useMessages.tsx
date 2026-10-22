import { useState, useRef, useEffect } from 'react'
import { Message } from '../types/Message'
import { SnapMessages, getMessages, type MessageCursor } from '../repos/repoMessage'

export default function useMessages(roomId: string){
    const [ older, setOlder ] = useState<Message[]>([]);
    const [ newer, setNewer ] = useState<Message[]>([]);

    const [loading, setLoading] = useState(true);
    const [ moreLoading, setMoreLoading ] = useState(true);
    const [error, setError] = useState<string>();
    
    const cursor = useRef<MessageCursor>(undefined);

    useEffect(() => {
        let isActive = true;
        let unsubscribe = () => {};

        async function loadMessages() {
            try {
                const page = await getMessages(roomId);
                if(!isActive) return;
                
                setOlder(page.messages);
                cursor.current = page.oldest;

                unsubscribe = SnapMessages(
                    roomId,
                    page.newest,
                    setNewer,
                    () => setError("Could not connect to chat, 500")
                );
            } catch (error) {
                if (isActive) {
                    setError("Loading messages failed")
                }
            } finally {
                if (isActive) {
                    setLoading(false);
                }
            }
        }
        loadMessages();
        return () => {
            isActive = false;
            unsubscribe();
        };
    }, [roomId]);
}