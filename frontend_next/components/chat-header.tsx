"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MoreVertical, Phone, Video } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function ChatHeader({title}: {title: string}) {
  const { t } = useLanguage()

  return (
    <div className="flex items-center justify-between p-4 border-b bg-card">
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="Cámara de Comercio Exterior" width={40} height={40} className="rounded-full" />
        <div>
          <h1 className="font-semibold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{t("online")}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Video className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
