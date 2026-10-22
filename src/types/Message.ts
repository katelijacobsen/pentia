export type Message = {
    id: string;
    text: string;
    createdAt: Date;
    user: User;
}

export type User = {
    uid: string;
    name: string;
    avatarUrl: string | null;
}