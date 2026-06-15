export function formatMessageTime(data) {
    return new Date(date).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });
}