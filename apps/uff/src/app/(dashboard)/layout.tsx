import { SidebarInset, SidebarProvider } from '@uff/ui/sidebar';
import { PropsWithChildren } from 'react';
import Header from '../../components/dashboard/header';
import AppSidebar from '../../components/dashboard/app-sidebar';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex-1 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
