'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@uff/ui/button';
import { DatePicker } from '@uff/ui/date-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@uff/ui/form';
import { Input } from '@uff/ui/input';
import { editProfileSchema, EditProfileValues } from '@uff/validators';
import { toDate } from 'date-fns';
import { Loader2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useEditProfile } from '../../hooks/use-edit-profile';
import { useProfile } from '../../hooks/use-profile';

export default function ProfileEditForm() {
  const { data } = useProfile();

  const form = useForm<EditProfileValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fieldOfStudy: data.fieldOfStudy ?? '',
      gender: data.gender ?? '',
      languages: data.languages ?? '',
      nationality: data.nationality ?? '',
      relationship: data.relationship ?? '',
      dateOfBirth: data.dateOfBirth ? toDate(data.dateOfBirth) : undefined,
      yearOfStudy: data.yearOfStudy ?? 0,
    },
  });

  const { mutate, isPending } = useEditProfile();
  const queryClient = useQueryClient();

  function onSubmit(values: EditProfileValues) {
    mutate(values, {
      onSuccess(data) {
        queryClient.setQueryData(['profile'], data);
      },
      onError(error) {
        toast.error(error.message ?? 'Something went wrong');
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Input placeholder="Male" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Date of birth</FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    disabled={(date) => date > new Date()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Nationality</FormLabel>
              <FormControl>
                <Input placeholder="Poland" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relationship"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Relationship</FormLabel>
              <FormControl>
                <Input placeholder="In relationship" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fieldOfStudy"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Field of study</FormLabel>
              <FormControl>
                <Input placeholder="Computer Science" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="yearOfStudy"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Year of study</FormLabel>
              <FormControl>
                <Input placeholder="1" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Loader2Icon className="size-4 animate-spin" /> : 'Save'}
        </Button>
      </form>
    </Form>
  );
}
