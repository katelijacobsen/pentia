import { useState} from 'react';
import { getAuth } from '@react-native-firebase/auth';
import { postMessage } from '../repos/repoMessage';


export function useSendMessage(roomId: string){
    const [ sending, setSending ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);

    async function send(text: string): Promise<boolean>{
        const message = text.trim();
        const user = getAuth().currentUser;

        if(message === '' || !user){
            return false;
        }

        setSending(true);
        setError(null);


        try{
            await postMessage(roomId, message,{
                uid: user.uid,
                name: user.displayName || 'Unknown',
                avatarUrl: user.photoURL || null
            });
            return true;
        } catch(error) {
            console.error('failed to send', error)
            return false;
        }finally{
            setSending(false);
        }

    }
    return{
        send,
        sending,
        error
    };
}
