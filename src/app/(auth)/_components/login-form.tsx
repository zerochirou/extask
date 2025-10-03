'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { userSchema } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Mosaic } from 'react-loading-indicators';

export function LoginForm() {
  const [show, setShow] = useState<string>('password');
  const [isPending, startTransition] = useTransition();
  const { login } = useAuth();
  const { handleSubmit, register, reset, formState } = useForm<
    z.infer<typeof userSchema>
  >({
    resolver: zodResolver(userSchema),
  });
  const handleLogin = async (data: z.infer<typeof userSchema>) => {
    startTransition(async () => {
      await login(data);
      reset();
    });
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <Mosaic
            color="oklch(0.5974 0.1989 22.5790)"
            size="large"
            text="Load Resource"
            textColor=""
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-6">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-xl font-bold text-primary">
                Private Area Website
              </h1>
              <div className="text-center text-sm">
                Only those who have and are permitted to access this website
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="m@example.com"
                  {...register('email')}
                  className={cn(
                    formState.errors.email?.message &&
                      'border border-destructive text-destructive bg-destructive/20 ring ring-destructive'
                  )}
                  required
                />
                <Label className="text-destructive">
                  {formState.errors.email?.message}
                </Label>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <div className="flex flex-row items-center gap-2">
                  <Input
                    id="password"
                    type={show}
                    required
                    {...register('password')}
                    className={cn(
                      formState.errors.password?.message &&
                        'border border-destructive text-destructive bg-destructive/20 ring ring-destructive'
                    )}
                  />
                  <Button
                    variant={'outline'}
                    type="button"
                    onClick={() =>
                      setShow(show === 'password' ? 'text' : 'password')
                    }
                  >
                    {show === 'text' ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
                <Label className="text-destructive">
                  {formState.errors.password?.message}
                </Label>
              </div>
              <Button
                type="submit"
                className="mt-2 w-full"
                disabled={
                  !!(
                    formState.errors.email?.message ||
                    formState.errors.password?.message ||
                    isPending
                  )
                }
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LogIn />
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
