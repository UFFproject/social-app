import DashboardActions from '@/components/dashboard/dashboard-actions';
import DashboardSearch from '@/components/dashboard/dashboard-search';
import PostPreviewCard from '@/components/dashboard/post-preview-card';
import ProfileCard from '@/components/dashboard/profile-card';

export default function Page() {
  return (
    <>
      <ProfileCard
        name="Name"
        surname="Surname"
        profile={{
          dob: '09.08.2024 (20 years old)',
          fos: 'Informatics',
          languages: 'Polish, Ukrainian, English',
          nationality: 'Ukrainian 🇺🇦',
          sex: 'Male',
          university: 'KUL',
        }}
      />
      <DashboardSearch />
      <DashboardActions />
      <PostPreviewCard
        name="Name"
        surname="Surname"
        createdAt="25.03.2025 17:30"
      />
    </>
  );
}
