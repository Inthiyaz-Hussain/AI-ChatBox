// import Sidebar from "../features/chat/Sidebar";
import Sidebar from "../featuresq/chat/components/Sidebar";

export default function Chat() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex flex-1 items-center justify-center">
        <h1 className="text-3xl font-bold">Chat Area</h1>
      </main>
    </div>
  );
}
