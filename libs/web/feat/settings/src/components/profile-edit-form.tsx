'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

import { toDate } from 'date-fns';
import { Loader2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useProfile } from '../hooks/use-profile';
import { editProfileSchema, EditProfileValues } from '@/uff-validators';
import { useEditProfile } from '../hooks/use-edit-profile';

import {
  Button,
  CountryDropdown,
  DatePicker,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  GenderSelect,
  Input,
} from '@/uff-ui';

export function ProfileEditForm() {
  const { data } = useProfile();

  const form = useForm<EditProfileValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: data.name ?? '',
      surname: data.surname ?? '',
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
        toast.success('Saved profile');
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
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <GenderSelect value={field.value} onChange={field.onChange} />
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
                <CountryDropdown
                  defaultValue={field.value}
                  onChange={(c) => field.onChange(c.alpha3)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="languages"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Languages</FormLabel>
              <FormControl>
                <Input placeholder="Polish" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="fieldOfStudy"
            render={({ field }) => (
              <FormItem className="flex-[3]">
                <FormLabel>Field of study</FormLabel>
                <FormControl>
                  <Input placeholder="Computer Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearOfStudy"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Year of study</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1"
                    type="number"
                    min={0}
                    max={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
