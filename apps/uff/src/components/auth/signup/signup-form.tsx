'use client';

import { signUpSchema, SignUpValues } from '../../../services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@uff/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@uff/ui/form';
import { Input } from '@uff/ui/input';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useSignUp } from '../../../hooks/use-sign-up';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      forename: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const router = useRouter();

  const { mutate, isPending } = useSignUp();

  function onSubmit(values: SignUpValues) {
    mutate(values, {
      onSuccess() {
        form.reset();
        toast.success('Signed Up Successfully');
        router.push('/signin');
      },
      onError(error) {
        toast.error(error.message ?? 'Something went wrong.');
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center gap-4">
          <FormField
            control={form.control}
            name="forename"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Forename</FormLabel>
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" type="email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="••••••" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="••••••" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            'Sign Up'
          )}
        </Button>
      </form>
    </Form>
  );
}
