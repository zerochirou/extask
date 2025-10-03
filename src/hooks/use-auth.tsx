'use client';

import supabase from '@/supabase/client';
import { userSchema } from '@/types/user';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import z from 'zod';

export function useAuth() {
  const router = useRouter();

  async function login(data: z.infer<typeof userSchema>) {
    const email = data.email;
    const password = data.password;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error?.message) {
      toast.error(error?.message);
      router.push('/');
    } else {
      router.push('/dashboard');
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace('/');
  }

  return { login, logout };
}
