import ProfileEditForm from '../../../components/profile/profile-edit-form';

export default function EditPage() {
  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <p className="text-muted-foreground">
          Update your profile information and how others see you on the
          platform.
        </p>
      </div>
      <ProfileEditForm />
    </div>
  );
}
