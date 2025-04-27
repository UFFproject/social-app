import { useMutation } from '@tanstack/react-query';
import { signIn } from '../services/auth';

export function useSignIn() {
  return useMutation({
    mutationFn: signIn,
  });
}
