import { Search } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] border rounded shadow-lg bg-white text-gray-600">
      <div className="mb-4">
        <Search size={48} className="text-blue-500" />
      </div>

      <h2 className="text-xl font-medium">Choose a chat to start a conversation</h2>
      <p className="text-sm text-gray-500 mt-1">
        Start a new conversation or select an existing chat
      </p>  
    </div>
  );
}
