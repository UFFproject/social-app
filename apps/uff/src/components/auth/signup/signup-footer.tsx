import { Button } from '@uff/ui/button';
import Link from 'next/link';

export default function SignupFooter() {
  return (
    <div className="mt-6 flex items-center justify-center">
      <p className="text-sm text-muted-foreground">Already have an account?</p>
      <Button variant="link" asChild>
        <Link href="/signin">Sign In</Link>
      </Button>
    </div>
  );
}
