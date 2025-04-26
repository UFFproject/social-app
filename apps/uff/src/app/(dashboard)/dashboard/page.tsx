import Feed from '../../../components/dashboard/feed';
import CreatePost from '../../../components/dashboard/create-post';

export default function Page() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <CreatePost />
      <Feed />
    </div>
  );
}
