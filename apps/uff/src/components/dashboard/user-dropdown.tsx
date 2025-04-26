'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@uff/ui/dropdown-menu';
import { LogOut, MoonIcon, Settings, SunIcon, User } from 'lucide-react';
import Link from 'next/link';
import UserAvatar from '../user-avatar';
import { useTheme } from 'next-themes';
import { signOut } from '../../services/auth';
import { useRouter } from 'next/navigation';

export default function UserDropdown() {
  const { setTheme, resolvedTheme } = useTheme();
  const router = useRouter();

  const Icon = resolvedTheme === 'light' ? MoonIcon : SunIcon;

  const switchTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <span>
          <UserAvatar />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User className="h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={switchTheme}>
          <Icon className="size-4" />
          {resolvedTheme === 'light' ? 'Dark' : 'Light'}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await signOut();
            router.refresh();
          }}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
