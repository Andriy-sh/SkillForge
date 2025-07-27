export default function ChatBoxSkeleton() {
  return (
    <div className="animate-pulse flex flex-col h-[80vh] border rounded shadow-lg bg-white">
      <div className="p-4 border-b font-semibold text-lg bg-gray-100">
        <div className="h-6 bg-gray-300 rounded w-1/3" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-gray-50">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className={`flex ${
              idx % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-lg ${
                idx % 2 === 0
                  ? "bg-gray-300 rounded-bl-none"
                  : "bg-gray-300 rounded-br-none"
              }`}
            >
              <div className="h-4 bg-gray-400 rounded w-24 mb-1" />
              <div className="h-4 bg-gray-400 rounded w-32" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center p-4 border-t bg-white">
        <div className="flex-1 h-10 bg-gray-200 rounded mr-2" />
        <div className="h-10 w-16 bg-gray-300 rounded" />
      </div>
    </div>
  );
}
