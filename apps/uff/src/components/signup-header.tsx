import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@libs/ui/tooltip';
import { Icons } from '@libs/ui/icons';

export default function SignupHeader() {
  return (
    <div className="flex items-center justify-center gap-4 mb-16">
      <h2 className="text-2xl font-semibold">Create an account</h2>

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <Icons.Help className="size-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="max-w-sm">
              By clicking “Sign Up” you accept our Terms and Conditions. For
              information about how we collect, use and share your data, please
              see our Privacy Policy. For information about our use of cookies
              and similar technologies, please see our Cookie Policy. You may
              receive notifications from us by SMS, but you can opt out of these
              at any time.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
