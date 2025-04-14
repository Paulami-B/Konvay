import DateIndicator from "./DateIndicator";
import { MessageProps } from "./RecievedMessage";

export default function SentMessage({previousMessage, message}: MessageProps) {
  const date = new Date(message._creationTime);
	const hour = date.getHours().toString().padStart(2, "0");
	const minute = date.getMinutes().toString().padStart(2, "0");
	const time = `${hour}:${minute}`;
  return (
    <>
    <DateIndicator message={message} previousMessage={previousMessage} />
      <div className="w-full flex justify-end items-end">
        <div className='relative bg-orange-200 dark:bg-marigold dark:text-gray-700 rounded w-fit min-w-48 max-w-3/4 lg:max-w-2/3 px-3 py-3 m-3'>
            {message.content}
            <div className="absolute text-xs text-gray-700 bottom-0 right-1 p-1">{time}</div>
        </div>
      </div>
    </>
  )
}
