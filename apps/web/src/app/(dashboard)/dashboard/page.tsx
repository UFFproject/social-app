import { CreatePost, Feed } from '@/uff-web-dashboard';

export default function Page() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <CreatePost />
      <Feed />
    </div>
  );
}
