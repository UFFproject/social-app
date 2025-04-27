'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/uff-ui';
import { LogOut, MoonIcon, Settings, SunIcon, User } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { UserAvatar } from '@/uff-web-shared';
import { client } from '@/uff-api-client';

export function UserDropdown() {
  const { setTheme, resolvedTheme } = useTheme();
  const router = useRouter();

  const Icon = resolvedTheme === 'light' ? MoonIcon : SunIcon;

  const switchTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  const onSignOut = async () => {
    await client.api.v1.auth.logout.$post();
    router.refresh();
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
        <DropdownMenuItem onClick={onSignOut}>
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
