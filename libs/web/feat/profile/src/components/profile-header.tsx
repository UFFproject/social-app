'use client';

import Image from 'next/image';
import Link from 'next/link';
import { UserAvatar } from '@/uff-web-shared';
import { useProfile } from '@/uff-web-settings';
import { Button } from '@/uff-ui';
import { CakeIcon, MapPin, MoreHorizontalIcon, PencilIcon } from 'lucide-react';
import placholder from '../assets/placeholder.svg';
import { format } from 'date-fns';

export function ProfileHeader() {
  const { data } = useProfile();

  return (
    <div className="space-y-4 bg-secondary rounded-lg">
      <div className="relative">
        <div className="h-48 w-full overflow-hidden rounded-lg">
          <Image
            src={placholder}
            alt="cover photo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-16 left-4 border-4 border-background rounded-full">
          <UserAvatar className="size-28" />
        </div>
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <Button variant="outline" className="bg-background/80" asChild>
            <Link href="/settings/profile">
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit Profile
            </Link>
          </Button>

          <Button variant="outline" size="icon" className="bg-background/80">
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="pt-16 px-4 pb-4">
        <h1 className="text-2xl font-bold">
          {data.name} {data.surname}
        </h1>
        <p className="text-muted-foreground">
          @{data.name?.toLowerCase()}
          {data.surname?.toLowerCase()}
        </p>

        <p className="mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        <div className="flex flex-wrap gap-y-2 gap-x-4 mt-4 text-sm text-muted-foreground">
          {data.nationality && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{data.nationality}</span>
            </div>
          )}
          {data.dateOfBirth && (
            <div className="flex items-center">
              <CakeIcon className="h-4 w-4 mr-1" />
              <span>{format(data.dateOfBirth, 'do MMMM')}</span>
            </div>
          )}
        </div>

        <div className="flex space-x-4 mt-4 text-sm">
          <div>
            <span className="font-semibold">{0}</span>{' '}
            <span className="text-muted-foreground">Following</span>
          </div>
          <div>
            <span className="font-semibold">{0}</span>{' '}
            <span className="text-muted-foreground">Followers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
