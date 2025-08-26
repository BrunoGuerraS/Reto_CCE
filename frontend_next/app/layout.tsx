import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import { GlobalHeader } from "@/components/global-header"
import { SocketProvider } from "@/hooks/user-socket"

export const metadata: Metadata = {
  title: "CCE Chat - Cámara de Comercio Exterior",
  description: "Sistema de chat para la Cámara de Comercio Exterior",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <SocketProvider>
          <LanguageProvider>
            <GlobalHeader />
            {children}
          </LanguageProvider>
        </SocketProvider>
      </body>
    </html>
  )
}
