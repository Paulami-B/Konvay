export default function SentMessage({content}: {content: string}) {
  return (
    <div className="w-full flex justify-end items-end">
        <div className='bg-orange-200 dark:bg-marigold dark:text-gray-700 rounded w-fit max-w-3/4 lg:max-w-2/3 px-3 py-3 m-3'>
            {content}
        </div>
    </div>
  )
}
