'use client';

import { Button } from '@uff/ui/button';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useProfile } from '../../hooks/use-profile';
import { formatISO } from 'date-fns';

export default function ProfileCard() {
  const { data } = useProfile();

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
            <span className="text-4xl font-bold text-white">{data?.name}</span>
            <span className="text-4xl font-bold text-white">
              {data?.surname}
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-col text-white font-medium">
          <span>Field of study: {data?.fieldOfStudy}</span>
          <span>Nationality: {data?.nationality}</span>
          <span>Sex: {data?.gender}</span>
          <span>Languages: {data?.languages}</span>
          <span>
            Date of birth:{' '}
            {data?.dateOfBirth &&
              formatISO(data.dateOfBirth, {
                representation: 'date',
              })}
          </span>
        </div>
      </div>
    </div>
  );
}
