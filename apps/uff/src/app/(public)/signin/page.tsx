import SigninFooter from '../../../components/auth/signin/signin-footer';
import SigninForm from '../../../components/auth/signin/signin-form';

export default function SignInPage() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-16 text-center">Sign in</h2>

      <SigninForm />

      <SigninFooter />
    </>
  );
}
