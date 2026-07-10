export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow dark:bg-gray-800">
      <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
      <span
        className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
        style={{ animationDelay: "0.2s" }}
      />
      <span
        className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
        style={{ animationDelay: "0.4s" }}
      />
    </div>
  );
}
