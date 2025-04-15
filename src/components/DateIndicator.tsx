import { getRelativeDateTime, isSameDay } from "@/utils/functions/dateTime";
import { IMessage } from "@/utils/store/chatStore";

type DateIndicatorProps = {
	message: IMessage;
	previousMessage?: IMessage;
};
const DateIndicator = ({ message, previousMessage }: DateIndicatorProps) => {
	return (
		<>
			{!previousMessage || !isSameDay(previousMessage._creationTime, message._creationTime) ? (
				<div className='flex justify-center'>
					<p className='text-sm text-gray-500 dark:text-gray-100 mb-2 p-1 rounded-md bg-gray-100 dark:bg-gray-600'>
						{getRelativeDateTime(message, previousMessage)}
					</p>
				</div>
			) : null}
		</>
	);
};
export default DateIndicator;