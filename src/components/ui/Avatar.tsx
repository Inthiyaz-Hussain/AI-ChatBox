import { User } from "lucide-react";

type AvatarProps = {
  name?: string;
  isAssistant?: boolean;
};

export default function Avatar({ name, isAssistant = false }: AvatarProps) {
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold text-white ${
        isAssistant ? "bg-green-600" : "bg-blue-600"
      }`}
    >
      {isAssistant ? (
        "AI"
      ) : name ? (
        name.charAt(0).toUpperCase()
      ) : (
        <User size={18} />
      )}
    </div>
  );
}
