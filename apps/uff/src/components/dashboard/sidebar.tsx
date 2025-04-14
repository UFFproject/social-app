import { Button } from '@uff/ui/button';
import {
  HomeIcon,
  LayoutIcon,
  MessageCircleIcon,
  SmileIcon,
  StarIcon,
  ThumbsUpIcon,
  UserIcon,
  UsersIcon,
} from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-[225px] bg-background2 p-2 rounded-xl flex flex-col gap-2 top-20 sticky h-[calc(100vh-104px)]">
      <Button>
        <UserIcon className="!size-5" />
        <span className="flex-1">Your account</span>
      </Button>
      <Button>
        <HomeIcon className="!size-5" />
        <span className="flex-1">Home</span>
      </Button>
      <Button>
        <UsersIcon className="!size-5" />
        <span className="flex-1">Friends</span>
      </Button>
      <Button>
        <MessageCircleIcon className="!size-5" />
        <span className="flex-1">Chats</span>
      </Button>
      <Button>
        <SmileIcon className="!size-5" />
        <span className="flex-1">Communities</span>
      </Button>
      <Button>
        <LayoutIcon className="!size-5" />
        <span className="flex-1">e - KUL</span>
      </Button>
      <Button>
        <ThumbsUpIcon className="!size-5" />
        <span className="flex-1">Recommendations</span>
      </Button>
      <Button>
        <StarIcon className="!size-5" />
        <span className="flex-1">Favourites</span>
      </Button>
    </aside>
  );
}
