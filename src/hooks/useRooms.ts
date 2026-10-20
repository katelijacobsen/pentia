import { useEffect, useState } from "react";
import { Room } from '../types/Room'
import { fetchChatrooms } from '../repos/repoRoom'

export function useRooms(){
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)
    const [reloading, setReloading] = useState(false);

    async function load() {
        try {
            setRooms(await fetchChatrooms());
        } catch {
            setError('Failed to load rooms');
        }
    }

    async function reload(){
        try {
            setReloading(true);
            await load();
            setReloading(false);
        } catch {
            setError('Failed to refresh rooms')
        }
    }

    useEffect(() => {
        load().finally(() => setLoading(false));
    }, []);

    return { rooms, loading, reloading, error, reload}
}