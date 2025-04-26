import { cn } from '@uff/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@uff/ui/avatar';
import { UserIcon } from 'lucide-react';

export default function UserAvatar({ className }: { className?: string }) {
  return (
    <Avatar className={cn('size-8', className)}>
      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
      <AvatarFallback>
        <UserIcon className="size-4 text-muted-foreground" />
      </AvatarFallback>
    </Avatar>
  );
}
