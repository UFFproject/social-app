import { Tabs, TabsList, TabsTrigger } from '@/uff-ui';

export function ProfileTabs() {
  return (
    <Tabs defaultValue="posts" className="mt-6">
      <TabsList className="w-full grid grid-cols-3">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="media">Media</TabsTrigger>
        <TabsTrigger value="friends">Friends</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
