"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { useSocket } from "@/hooks/user-socket"

export function RegistrationForm() {
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const { register } = useSocket()
  const { t } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError(t("nameRequired"))
      return
    }
    register(name.trim())
  }

  return (
    <div className="flex-1 bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">{t("welcome")}</CardTitle>
          <CardDescription>{t("enterName")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder={t("namePlaceholder")}
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError("")
                }}
                className={error ? "border-red-500" : ""}
              />
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              {t("continue")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
