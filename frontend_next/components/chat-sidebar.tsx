"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useLanguage } from "@/contexts/language-context"

interface User {
  id: string
  name: string
  status?: "connected" | "away" | "offline"
}

interface ChatSidebarProps {
  users: User[]
}


export function ChatSidebar({ users }: ChatSidebarProps) {
  const { t } = useLanguage()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "connected":
        return t("connected")
      case "away":
        return t("away")
      case "offline":
        return t("offline")
      default:
        return t("offline")
    }
  }

  return (
    <div className="w-80 border-r bg-card flex flex-col">
      <div className="border-b">
        <div className="p-4 bg-primary/5">
          <h3 className="font-medium text-sm text-primary mb-3">{t("generalGroup")}</h3>
          <div className="space-y-2">
            {users.map((user) => (
              <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(user.status ?? "offline")}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{getStatusText(user.status ?? "offline")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
