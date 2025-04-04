import { Button } from '@libs/ui/button';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';

interface ProfileCardProps {
  name: string;
  surname: string;
  profile: {
    university: string;
    fos: string;
    nationality: string;
    sex: string;
    languages: string;
    dob: string;
  };
}

export default function ProfileCard({
  name,
  surname,
  profile: { dob, fos, languages, nationality, sex, university },
}: ProfileCardProps) {
  return (
    <div className="bg-background3 p-4 rounded-2xl space-y-12">
      <div className="flex justify-end">
        <Button className="h-7" asChild>
          <Link href="/edit">Edit</Link>
        </Button>
      </div>

      <div className="flex items-end">
        <div className="flex gap-4 flex-1">
          <div className="border-[10px] border-white rounded-full">
            <UserIcon className="size-28 text-white" />
          </div>
          <div className="flex flex-col justify-end">
            <span className="text-4xl font-bold text-white">{name}</span>
            <span className="text-4xl font-bold text-white">{surname}</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col text-white font-medium">
          <span>University: {university}</span>
          <span>Field of study: {fos}</span>
          <span>Nationality: {nationality}</span>
          <span>Sex: {sex}</span>
          <span>Languages: {languages}</span>
          <span>Date of birth: {dob}</span>
        </div>
      </div>
    </div>
  );
}
