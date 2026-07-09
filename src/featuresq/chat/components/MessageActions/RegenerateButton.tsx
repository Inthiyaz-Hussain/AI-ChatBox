import { RotateCcw } from "lucide-react";

type RegenerateButtonProps = {
  onRegenerate: () => void;
};

export default function RegenerateButton({
  onRegenerate,
}: RegenerateButtonProps): React.JSX.Element {
  return (
    <button
      onClick={onRegenerate}
      className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-gray-500 transition hover:bg-gray-200 hover:text-black"
    >
      <RotateCcw size={15} />
      Regenerate
    </button>
  );
}
