export default function ChatTile() {
    return (
        <button
        className="w-full grid grid-cols-9 gap-3 items-center p-3 bg-white dark:bg-gray-700/50 hover:bg-orange-300/30 dark:hover:bg-gray-600/80 rounded-lg cursor-pointer my-2">
            <div className="col-span-1 md:col-span-2">
                <div className="h-fit w-fit relative">
                    <img src="https://tinypng.com/images/social/website.jpg" className="w-12 h-12 md:w-8 md:h-8 lg:w-12 lg:h-12 rounded-full" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                </div>
            </div>
            <div className="col-span-7 md:col-span-6 dark:text-orange-50 text-start w-full">
                <div className="font-bold">Pink Panda</div>
                <div className="text-sm">Message by pink panda</div>
            </div>
            <div className="col-span-1 text-sm">
                <div className="dark:text-gray-300 text-xs lg:text-xs">5:32</div>
                <div className="h-fit w-fit my-3 text-xs px-1.5 py-0.5 bg-marigold rounded-full font-bold text-white">1</div>
            </div>
        </button>
    )
}
