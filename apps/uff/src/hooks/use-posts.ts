import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../services/post';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
}
