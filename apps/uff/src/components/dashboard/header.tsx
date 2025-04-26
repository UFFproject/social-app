import { cn } from '@uff/ui';
import { Button } from '@uff/ui/button';
import UserDropdown from './user-dropdown';

export default function Header() {
  return (
    <header className="h-14 border-b flex justify-between items-center px-4">
      <div></div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className={cn(
            'relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64'
          )}
        >
          <span className="inline-flex">Search...</span>
          <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.35rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>

        <UserDropdown />
      </div>
    </header>
  );
}
