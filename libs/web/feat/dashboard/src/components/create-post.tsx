'use client';

import { Button } from '@/uff-ui';
import { Card, CardFooter, CardHeader } from '@/uff-ui';
import { UserAvatar } from '@/uff-web-shared';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/uff-ui';
import { useForm } from 'react-hook-form';
import { createPostSchema, CreatePostValues } from '@/uff-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useCreatePost } from '../hooks/use-create-post';
import { Post } from '../hooks/use-posts';

export function CreatePost() {
  const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      textContent: '',
    },
  });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useCreatePost();

  function onSubmit(values: CreatePostValues) {
    mutate(values, {
      onSuccess(data) {
        form.reset();
        toast.success('Created post');
        queryClient.setQueryData<Post[]>(['posts'], (prev) => {
          if (!prev) {
            return [data];
          }

          return [data, ...prev];
        });
      },
      onError(error) {
        toast.error(error.message ?? 'Something went wrong.');
      },
    });
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <div className="flex gap-2">
              <UserAvatar className="size-10" />
              <FormField
                control={form.control}
                name="textContent"
                render={({ field }) => (
                  <FormItem className="space-y-0 w-full">
                    <FormLabel className="sr-only">Content</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        className="w-full resize-none outline-none text-sm bg-transparent"
                        placeholder="What's on your mind?"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardHeader>
          <CardFooter className="justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {form.watch('textContent').length} characters
            </span>
            <Button
              size="sm"
              type="submit"
              disabled={isPending || !form.formState.isValid}
            >
              {isPending ? (
                <LoaderIcon className="size-4 animate-spin" />
              ) : (
                'Post'
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
