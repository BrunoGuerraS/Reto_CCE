"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  es: {
    welcome: "¡Bienvenido a la Cámara de Comercio Exterior!",
    enterName: "Ingresa tu nombre para continuar",
    namePlaceholder: "Tu nombre completo",
    continue: "Continuar",
    nameRequired: "El nombre es requerido",
    generalGroup: "Grupo General",
    onlineUsers: "Usuarios en línea",
    connected: "Conectado",
    away: "Ausente",
    offline: "Desconectado",
    help: "Ayuda",
    language: "Idioma",
    search: "Buscar conversaciones...",
    support: "Soporte CCE",
    online: "En línea",
    typeMessage: "Escribe un mensaje...",
    send: "Enviar",
  },
  en: {
    welcome: "Welcome to the Cámara de Comercio Exterior!",
    enterName: "Enter your name to continue",
    namePlaceholder: "Your full name",
    continue: "Continue",
    nameRequired: "Name is required",
    generalGroup: "General Group",
    onlineUsers: "Online Users",
    connected: "Connected",
    away: "Away",
    offline: "Offline",
    help: "Help",
    language: "Language",
    search: "Search conversations...",
    support: "CCE Support",
    online: "Online",
    typeMessage: "Type a message...",
    send: "Send",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.es] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
