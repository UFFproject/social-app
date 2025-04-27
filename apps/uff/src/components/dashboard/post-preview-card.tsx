import { EllipsisIcon, UserIcon } from 'lucide-react';

interface PostPreviewCardProps {
  name: string;
  surname: string;
  createdAt: string;
}

export default function PostPreviewCard({
  name,
  surname,
  createdAt,
}: PostPreviewCardProps) {
  return (
    <div className="bg-secondary rounded-3xl p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="border-4 border-white rounded-full">
            <UserIcon className="size-12 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-3xl font-semibold">
              {name} {surname}
            </span>
            <span className="text-sm text-white">posted: {createdAt}</span>
          </div>
        </div>

        <EllipsisIcon className="size-10 text-white" />
      </div>

      <div className="min-h-60"></div>
    </div>
  );
}
