import ChatContainer from "@/components/ChatContainer";
import Contacts from "@/components/Contacts";

export default function Chat() {
  return (
    <div className="md:grid md:grid-cols-13 divide-x divide-orange-100 dark:divide-orange-900">
        <div className="md:block col-span-4 lg:col-span-4">
          <Contacts />
        </div>
        <div className="md:block col-span-7 lg:col-span-9">
          <ChatContainer />
        </div>
    </div>
  )
}
