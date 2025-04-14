import { IMessage } from "@/utils/store/chatStore";
import DateIndicator from "./DateIndicator";

export type MessageProps = {
    previousMessage?: IMessage,
    message: IMessage
}

export default function RecievedMessage({previousMessage, message}: MessageProps) {
    const date = new Date(message._creationTime);
	const hour = date.getHours().toString().padStart(2, "0");
	const minute = date.getMinutes().toString().padStart(2, "0");
	const time = `${hour}:${minute}`;
    return (
        <>
            <DateIndicator message={message} previousMessage={previousMessage} />
            <div className="relative items-start bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded w-fit min-w-48 max-w-3/4 lg:max-w-2/3 px-3 py-2 m-3">
                {message.content}
                <div className="absolute text-xs text-gray-700 bottom-0 right-1 p-1">{time}</div>
            </div>
        </>
    )
}