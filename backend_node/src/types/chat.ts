export enum Presence {
  Online = "online",
  Offline = "offline",
}

export type UserState = {
    sockets: Set<string>;
    status: Presence;
    lastSeen: number;
};

export type UsersListItem = {
    name: string;
    status: Presence;
};

export type MessagePayload = {
    id: number;
    message: string;
    timestamp: string;
    isUser: boolean;
    fromName: string;
};