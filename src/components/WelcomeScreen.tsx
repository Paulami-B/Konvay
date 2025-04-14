export default function WelcomeScreen() {
  return (
    <div className="bg-orange-50 dark:bg-gray-800 h-full flex justify-center py-20 dark:text-marigold">
      <div>
        <div className="flex justify-center gap-2 text-4xl mb-8 items-center">Get started with 
          <p className="font-bold font-caveat text-5xl">Konvay</p>
          <img src="/Logo.png" className="h-18"/>
        </div>
        <img src="/Welcome.png" className="h-72" />
        <p className="items-center text-cneter text-2xl">Seamless chats, anytime, anywhere</p>
      </div>
    </div>
  )
}