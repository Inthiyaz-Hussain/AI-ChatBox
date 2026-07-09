import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps): React.JSX.Element {
  return (
    <div className="px-4 pb-3">
      <div className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900px-3 py-2">
        <Search size={18} className="text-gray-500" />

        <input
          type="text"
          placeholder="Search chats..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent outline-none"
        />
      </div>
    </div>
  );
}
