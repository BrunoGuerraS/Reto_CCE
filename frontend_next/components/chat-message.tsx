import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatMessageProps {
  message: string
  isUser: boolean
  timestamp: string
  avatar?: string
  fromName: string
}

export function ChatMessage({ message, isUser, timestamp, avatar, fromName }: ChatMessageProps) {
  return (
    <div className={cn("flex gap-3 p-4", isUser && "flex-row-reverse")}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatar || "/placeholder.svg"} />
        <AvatarFallback className={cn(isUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
          {isUser ? "TU" : "CCE"}
        </AvatarFallback>
      </Avatar>
      <div className={cn("flex flex-col gap-1 max-w-xs", isUser && "items-end")}>
        <small>{fromName}</small>
        <div
          className={cn(
            "rounded-lg px-3 py-2 text-sm",
            isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          {message}
        </div>
        <span className="text-xs text-muted-foreground">{timestamp}</span>
      </div>
    </div>
  )
}
