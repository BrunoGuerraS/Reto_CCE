"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { HelpCircle, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function GlobalHeader() {
  const { language, setLanguage, t } = useLanguage()

  const handleHelp = () => {
    alert(t("helpMessage"))
  }

  return (
    <header className="bg-background border-b border-border px-4 py-3 h-[58px]">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Cámara de Comercio Exterior" width={40} height={40} />
          <h1 className="text-lg font-semibold text-primary">Cámara de Comercio Exterior</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleHelp}
            className="text-muted-foreground hover:text-foreground"
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            {t("help")}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Globe className="h-4 w-4 mr-2" />
                {language === "es" ? "ES" : "EN"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("es")}>Español</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
