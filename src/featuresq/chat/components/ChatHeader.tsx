import { Menu, Moon, Sun, MoreVertical } from "lucide-react";
import useTheme from "../hooks/useTheme";

type ChatHeaderProps = {
  onOpenSidebar: () => void;
};

export default function ChatHeader({
  onOpenSidebar,
}: ChatHeaderProps): React.JSX.Element {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 transition dark:border-gray-700 dark:bg-gray-900 md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-800 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI Chat
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ask me anything
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-800">
          <MoreVertical size={20} />
        </button>
      </div>
    </header>
  );
}
