import { useMutation } from '@tanstack/react-query';
import { createPost } from '../services/post';

export function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
  });
}
