import { formatDistance } from 'date-fns';
import { BookmarkIcon, HeartIcon, MessageCircleIcon } from 'lucide-react';
import { Post } from '../hooks/use-posts';
import { Button, Card, CardContent, CardFooter, CardHeader } from '@/uff-ui';
import { UserAvatar } from '@/uff-web-shared';

export function PostCard({ post }: { post: Post }) {
  const profile = post.author.profile;

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2">
          <UserAvatar className="size-9" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {profile?.name} {profile?.surname}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDistance(post.createdAt, new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{post.textContent}</p>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <HeartIcon className="size-4" /> 0
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircleIcon className="size-4" /> 0
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="size-8">
          <BookmarkIcon className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
