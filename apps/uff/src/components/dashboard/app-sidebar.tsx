'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@uff/ui/sidebar';
import {
  Bookmark,
  Home,
  MessageCircle,
  Settings,
  Smile,
  User,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AppSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/friends', label: 'Friends', icon: Users },
    { href: '/messages', label: 'Messages', icon: MessageCircle },
    { href: '/communities', label: 'Communities', icon: Smile },
    { href: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="h-14 py-0 items-center justify-center">
        <Link href="/" className="font-bold text-lg">
          University Friends Finder
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <Icon className="size-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export function MobileSidebarTrigger() {
  return (
    <div className="flex md:hidden">
      <SidebarTrigger />
    </div>
  );
}
