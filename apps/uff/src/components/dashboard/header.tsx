import { SearchIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 border-primary border-4 bg-secondary h-14">
      <div className="max-w-screen-xl mx-auto flex gap-12 items-center h-full">
        <Logo />
        <Nav />
      </div>
    </header>
  );
}

function Logo() {
  return (
    <Link href="/dashboard">
      <div className="h-10 bg-white px-2 border-2 border-primary  flex items-center justify-center w-[225px]">
        <span className="text-primary font-medium text-lg">
          University Friends Finder
        </span>
      </div>
    </Link>
  );
}

function Nav() {
  return (
    <div className="flex items-center justify-between flex-1">
      <SearchInput />

      <div className="border-white border-2 rounded-full">
        <UserIcon className="size-6 text-white" />
      </div>
    </div>
  );
}

function SearchInput() {
  return (
    <div className="flex h-10 items-center border-2 border-primary bg-background px-2">
      <SearchIcon className="mr-2 size-6 shrink-0 text-primary" />
      <input
        placeholder="Search"
        className="flex h-full w-full bg-transparent placeholder:font-medium text-lg placeholder:text-lg outline-none placeholder:text-primary disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}
