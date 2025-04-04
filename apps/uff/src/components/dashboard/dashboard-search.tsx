import { PencilIcon } from 'lucide-react';

export default function DashboardSearch() {
  return (
    <div className="bg-background2 flex items-center p-4 rounded-xl">
      <input
        type="text"
        className="bg-transparent placeholder:text-white placeholder:text-lg  flex-1 focus-visible:outline-none text-white"
        placeholder="You can leave your status or something interesting about you here..."
      />
      <PencilIcon className="size-5 text-white" />
    </div>
  );
}
