import { useSuspenseQuery } from '@tanstack/react-query';
import { getProfile } from '../services/profile';

export function useProfile() {
  return useSuspenseQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
}
