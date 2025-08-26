export function sanitizeTitle(inputTitle: unknown): string {
    if (typeof inputTitle !== "string") return "";
    return inputTitle.trim().slice(0, 120);
}

export function sanitizeMessage(inputMessage: unknown): string {
    if (typeof inputMessage !== "string") return "";
    return inputMessage.trim().slice(0, 2000);
}
