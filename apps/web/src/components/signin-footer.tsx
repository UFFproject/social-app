import { Button } from '@/uff-ui';
import Link from 'next/link';

export default function SigninFooter() {
  return (
    <div className="flex items-center mt-6 justify-center">
      <p className="text-sm text-muted-foreground">Dont have an account?</p>
      <Button asChild variant="link">
        <Link href="/signup">Sign Up</Link>
      </Button>
    </div>
  );
}
