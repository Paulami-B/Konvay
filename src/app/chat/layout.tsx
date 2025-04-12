import VerticalSideBar from '@/components/VerticalSideBar'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen w-screen md:grid md:grid-cols-14'>
      <div className='hidden md:block md:col-span-1'>
        <VerticalSideBar />
      </div>
      <div className='md:col-span-13'>
        {children}
      </div>
    </div>
  )
}
