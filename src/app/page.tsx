import LeftPanel from "@/components/home/LeftPanel";
import RightPanel from "@/components/home/RightPanel";

export default function Home() {
  return (
    <main className="m-5">
      <div className="flex overflow-y-hidden h-[calc(100vh-50px)] max-w-[1700px] mx-auto">
        <div className="fixed top-0 left-0 w-full h-36 bg-green-primary" />
        <LeftPanel />
        <RightPanel />
      </div>
    </main>
  );
}
