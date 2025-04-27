import { SigninFooter, SigninForm } from '@/uff-web-sign-in';

export default function SignInPage() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-16 text-center">Sign in</h2>

      <SigninForm />

      <SigninFooter />
    </>
  );
}
