"use client"

import { ChatHeader } from "@/components/chat-header"
import { ChatMessage } from "@/components/chat-message"
import { ChatInput } from "@/components/chat-input"
import { ChatSidebar } from "@/components/chat-sidebar"
import { RegistrationForm } from "@/components/registration-form"
import { useSocket } from "@/hooks/user-socket"



export default function ChatApp() {
  const { connected, users, messages, sendMessage } = useSocket();

  if (!connected) return <RegistrationForm />;

  return (
    <div className="flex h-[92vh] bg-background">
      <ChatSidebar users={users} />
      <div className="flex-1 flex flex-col">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.message}
              isUser={message.isUser}
              timestamp={message.timestamp}
              fromName={message.fromName}
            />
          ))}
        </div>
        <ChatInput onSendMessage={sendMessage} />
      </div>
    </div>
  )
}
