import { PropsWithChildren } from 'react';
import AuthBanner from '../../components/auth/auth-banner';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen flex">
      <AuthBanner />

      <div className="flex-1 grid place-items-center p-4">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
