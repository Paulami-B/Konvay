export default function RecievedMessage({content}: {content: string}) {
    return (
        <div className="items-start bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded w-fit max-w-3/4 lg:max-w-2/3 px-3 py-2 m-3">
            {content}
        </div>
    )
}