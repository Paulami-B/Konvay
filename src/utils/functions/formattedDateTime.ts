export const formattedDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isSameDay = date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();
    if(isSameDay){
        return date.toLocaleTimeString(undefined, {hour: "numeric", minute: "2-digit", hour12: true}).toString();
    }
    else{
        const isSameYear = date.getFullYear() === now.getFullYear()
        if(isSameYear){
            return date.toLocaleTimeString(undefined, {month: "short", day: "numeric"}).toString();
        }
        else{
            return date.toLocaleTimeString(undefined, {year: "numeric", month: "short", day: "numeric"}).toString();
        }
    }
}