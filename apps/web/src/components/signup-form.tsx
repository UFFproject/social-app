'use client';

import { Button } from '@/uff-ui';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/uff-ui';
import { Input } from '@/uff-ui';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

const schema = z.object({
  forename: z.string().min(1, 'Forename is required'),
  surname: z.string().min(1, 'Surname is required'),
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required'),
});

type Values = z.infer<typeof schema>;

function onSubmit(values: Values) {
  toast.success('Submitted values\n' + JSON.stringify(values));
}

export default function SignupForm() {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      forename: '',
      surname: '',
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center gap-4">
          <FormField
            control={form.control}
            name="forename"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
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
                <Input placeholder="john@example.com" {...field} />
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
                <Input placeholder="••••••" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
