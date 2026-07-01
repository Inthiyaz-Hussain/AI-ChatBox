export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-xl border bg-white px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></span>
          <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:0.2s]"></span>
          <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:0.4s]"></span>
        </div>
      </div>
    </div>
  );
}
