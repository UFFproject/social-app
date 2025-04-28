import { Feed } from '@/uff-web-dashboard';
import { ProfileHeader, ProfileTabs } from '@/uff-web-profile';

export default function ProfilePage() {
  return (
    <>
      <ProfileHeader />
      <div className="max-w-xl mx-auto space-y-4">
        <ProfileTabs />
        <Feed />
      </div>
    </>
  );
}
