'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@uff/ui/button';
import { Checkbox } from '@uff/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@uff/ui/form';
import { Input } from '@uff/ui/input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useSignIn } from '../../../hooks/use-sign-in';
import { useRouter } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
import { signInSchema, SignInValues } from '@uff/validators';

export default function SigninForm() {
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const router = useRouter();

  const { mutate, isPending } = useSignIn();

  function onSubmit(values: SignInValues) {
    mutate(values, {
      onSuccess() {
        form.reset();
        toast.success('Signed Up Successfully');
        router.push('/dashboard');
      },
      onError(error) {
        toast.error(error.message ?? 'Something went wrong.');
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

        <div className="space-y-2">
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
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Remember me</FormLabel>
                </FormItem>
              )}
            />

            <Button asChild variant="link">
              <Link href="/reset-password">Forgot password?</Link>
            </Button>
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            'Sign In'
          )}
        </Button>
      </form>
    </Form>
  );
}
