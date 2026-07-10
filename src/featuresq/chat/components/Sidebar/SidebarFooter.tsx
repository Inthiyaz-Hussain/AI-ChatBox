import { User } from "lucide-react";

export default function SidebarFooter(): React.JSX.Element {
  return (
    <div className="border-t border-gray-200 p-4 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-gray-200 p-2">
          <User size={20} />
        </div>

        <div>
          <p className="font-medium">Hussain</p>
          <p className="text-sm text-gray-500">Frontend Developer</p>
        </div>
      </div>
    </div>
  );
}
