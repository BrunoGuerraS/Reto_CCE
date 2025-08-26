export function nowTimeLabel(): string {
    const now = new Date();
    return now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
}

export function nowEpochId(): number {
    return Date.now();
}
