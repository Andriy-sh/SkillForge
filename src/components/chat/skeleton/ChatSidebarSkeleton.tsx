export default function ChatSidebarSkeleton() {
  return (
    <aside className="w-full max-w-xs h-full bg-white border-r shadow-md flex flex-col animate-pulse">
      <div className="p-4 border-b text-lg font-semibold bg-gray-100">
        <div className="h-6 bg-gray-300 rounded w-1/3" />
      </div>

      <div className="p-2">
        <div className="h-10 bg-gray-200 rounded w-full" />
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <div className="h-4 bg-gray-300 rounded w-2/3" />
          </div>
        ))}
      </div>
    </aside>
  );
}
