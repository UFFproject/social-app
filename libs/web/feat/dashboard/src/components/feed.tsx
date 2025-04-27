'use client';

import { usePosts } from '../hooks/use-posts';
import { PostCard } from './post-card';

export function Feed() {
  const { data } = usePosts();

  return (
    <div className="flex flex-col gap-4">
      {data?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
