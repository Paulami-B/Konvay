import { FiSearch } from "react-icons/fi";
import { MdSendAndArchive } from "react-icons/md";
import ChatTile from "@/components/ChatTile";

export default function Contacts() {
  return (
    <div className="h-screen w-full p-4 pt-0 md:p-4 bg-orange-50/40 flex flex-col">
      <div className="top-0 h-fit sticky bg-[#FFFCF8] z-50">
        <div className="text-4xl font-bold my-2 hidden md:block">Chats</div>
        <div className="flex items-center gap-2 bg-orange-50 rounded-lg p-3">
          <FiSearch size={20} strokeWidth={3} className="text-orange-500" />
          <input className="w-full border-none focus:outline-none focus:ring-0 text-lg" placeholder="Search" />
        </div>
        <div className="flex items-center justify-start gap-3 text-xl py-5">
          <MdSendAndArchive size={30} className=""/>
          <p className="text-lg text-orange-500 font-semibold">Archived</p>
        </div>
        <hr className="text-gray-300" />
      </div>
      <div className="flex-1 overflow-auto pr-2">
        <div className="py-3">
          <h1 className="text-lg font-semibold text-gray-500 mb-3">Pinned</h1>
          <ChatTile />
          <ChatTile />
          <ChatTile />
          <ChatTile />
        </div>
        <div className="py-3">
          <h1 className="text-lg font-semibold text-gray-500 mb-3">All Chats</h1>
          <ChatTile />
        </div>
      </div>
    </div>
  )
}