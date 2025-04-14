import AuthBanner from '../../components/auth/auth-banner';
import React, { PropsWithChildren } from 'react';

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
