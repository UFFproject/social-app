import { useMutation } from '@tanstack/react-query';
import { editProfile } from '../services/profile';

export function useEditProfile() {
  return useMutation({
    mutationFn: editProfile,
  });
}
