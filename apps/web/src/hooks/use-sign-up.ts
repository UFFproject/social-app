import { signUp } from '../services/auth';
import { useMutation } from '@tanstack/react-query';

export function useSignUp() {
  return useMutation({
    mutationFn: signUp,
  });
}
