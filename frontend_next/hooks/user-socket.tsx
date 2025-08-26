"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { socket } from "@/lib/scoket";

type PresenceSrv = "online" | "offline";
type PresenceUI = "connected" | "away" | "offline";

type User = { id: string; name: string, staus?: string };
type ChatMsg = {
  id: number;
  message: string;
  timestamp: string;
  isUser: boolean;
  fromName: string
};
type SocketCtx = {
  me: User | null;
  users: User[];
  messages: ChatMsg[];
  connected: boolean;
  title: string;
  register: (username: string) => void;
  sendMessage: (text: string) => void;
  disconnect: () => void;
};

const Ctx = createContext<SocketCtx | null>(null);

const normalize = (s: PresenceSrv): PresenceUI => (s === "online" ? "connected" : "offline");

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [me, setMe] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const pendingNameRef = useRef<string>("");
  const [title, setTitle] = useState("Chat CCE");


  useEffect(() => {
    const onConnect = () => {
      setConnected(true);
      const name = pendingNameRef.current || (socket as any).auth?.username || "Anon";
      setMe({ id: socket.id!, name });
    };

    const onDisconnect = () => {
      setConnected(false);
      setMe((prev) => (prev ? { ...prev, id: "" } : null));
    };

    const onUsersList = (list: { name: string; status: PresenceSrv }[]) => {
      setUsers(list.map(u => ({
        id: u.name,
        name: u.name,
        status: normalize(u.status)
      })));
    };

    const onUserLeft = ({ id }: { id: string }) =>
      setUsers((prev) => prev.filter((x) => x.id !== id));

    const onMessage = (m: ChatMsg) => {
      setMessages(prev => [...prev, m]);
    };

    const onTitleUpdate = ({ title }: { title: string }) => {
      document.title = title;
      const titleEl = document.querySelector("title")
      if (titleEl) titleEl.textContent = title;
      setTitle(title);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("users:list", onUsersList);
    socket.on("user:left", onUserLeft);
    socket.on("message", onMessage);
    socket.on("title:update", onTitleUpdate);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("users:list", onUsersList);
      socket.off("user:left", onUserLeft);
      socket.off("message", onMessage);
      socket.off("title:update", onTitleUpdate);
    };
  }, []);

  const register = (username: string) => {
    pendingNameRef.current = username;
    socket.auth = { username };
    socket.connect();
  };

  const sendMessage = (text: string) => {
    const t = text.trim();
    if (!t) return;
    socket.emit("message", t);
  };

  const disconnect = () => {
    socket.disconnect();
    setUsers([]);
    setMessages([]);
  };

  const value = useMemo(
    () => ({ me, users, messages, connected, title, register, sendMessage, disconnect }),
    [me, users, messages, connected, title]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSocket() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSocket must be used within <SocketProvider>");
  return ctx;
}
