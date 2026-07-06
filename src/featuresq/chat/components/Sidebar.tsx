// // import { MessageSquarePlus, User } from "lucide-react";

// // import type { Chat } from "../types/chat";

// // type SidebarProps = {
// //   chats: Chat[];
// //   activeChatId: string;
// //   onNewChat: () => void;
// //   onSelectChat: (chatId: string) => void;
// // };

// // export default function Sidebar({
// //   chats,
// //   activeChatId,
// //   onNewChat,
// //   onSelectChat,
// // }: SidebarProps): React.JSX.Element {
// //   return (
// //     <aside className="flex h-screen w-72 flex-col border-r border-gray-200 bg-white">
// //       {/* Logo */}
// //       <div className="border-b border-gray-200 p-5">
// //         <h1 className="text-2xl font-bold text-blue-600">AI Chat</h1>
// //       </div>

// //       {/* New Chat */}
// //       <div className="p-4">
// //         <button
// //           onClick={onNewChat}
// //           className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
// //         >
// //           <MessageSquarePlus size={20} />
// //           New Chat
// //         </button>
// //       </div>

// //       {/* Chat List */}
// //       <div className="flex-1 overflow-y-auto px-3">
// //         {chats.map((chat) => (
// //           <button
// //             key={chat.id}
// //             onClick={() => onSelectChat(chat.id)}
// //             className={`mb-2 w-full rounded-lg px-4 py-3 text-left transition ${
// //               chat.id === activeChatId
// //                 ? "bg-blue-100 font-semibold text-blue-700"
// //                 : "hover:bg-gray-100"
// //             }`}
// //           >
// //             {chat.title}
// //           </button>
// //         ))}
// //       </div>

// //       {/* User */}
// //       <div className="border-t border-gray-200 p-4">
// //         <div className="flex items-center gap-3">
// //           <div className="rounded-full bg-gray-200 p-2">
// //             <User size={20} />
// //           </div>

// //           <div>
// //             <p className="font-medium">Hussain</p>
// //             <p className="text-sm text-gray-500">Frontend Developer</p>
// //           </div>
// //         </div>
// //       </div>
// //     </aside>
// //   );
// // }

// import SidebarHeader from "./Sidebar/SidebarHeader";
// import NewChatButton from "./Sidebar/NewChatButton";
// import ChatList from "./Sidebar/ChatList";
// import SidebarFooter from "./Sidebar/SidebarFooter";

// import type { Chat } from "../types/chat";

// type SidebarProps = {
//   chats: Chat[];
//   activeChatId: string;
//   onNewChat: () => void;
//   onSelectChat: (chatId: string) => void;
// };

// export default function Sidebar({
//   chats,
//   activeChatId,
//   onNewChat,
//   onSelectChat,
// }: SidebarProps): React.JSX.Element {
//   return (
//     <aside className="flex h-screen w-72 flex-col border-r border-gray-200 bg-white">
//       <SidebarHeader />

//       <NewChatButton onNewChat={onNewChat} />

//       <ChatList
//         chats={chats}
//         activeChatId={activeChatId}
//         onSelectChat={onSelectChat}
//       />

//       <SidebarFooter />
//     </aside>
//   );
// }

import SidebarHeader from "./Sidebar/SidebarHeader";
import SearchBar from "./Sidebar/SearchBar";
import NewChatButton from "./Sidebar/NewChatButton";
import ChatList from "./Sidebar/ChatList";
import SidebarFooter from "./Sidebar/SidebarFooter";

import type { Chat } from "../types/chat";

type SidebarProps = {
  chats: Chat[];
  activeChatId: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onRenameChat: (chatId: string, title: string) => void;
};

export default function Sidebar({
  chats,
  activeChatId,
  onNewChat,
  searchQuery,
  onSearchChange,
  onSelectChat,
  onDeleteChat,
  onRenameChat,
}: SidebarProps): React.JSX.Element {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-gray-200 bg-white">
      <SidebarHeader />

      <SearchBar value={searchQuery} onChange={onSearchChange} />

      <NewChatButton onNewChat={onNewChat} />

      <ChatList
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={onSelectChat}
        onDeleteChat={onDeleteChat}
        onRenameChat={onRenameChat}
      />

      <SidebarFooter />
    </aside>
  );
}
