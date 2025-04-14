import Header from '../../components/dashboard/header';
import Sidebar from '../../components/dashboard/sidebar';
import { PropsWithChildren } from 'react';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto flex gap-12 py-6">
        <Sidebar />

        <div className="flex-1 space-y-4">{children}</div>
      </div>
    </>
  );
}
