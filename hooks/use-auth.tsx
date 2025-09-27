"use client";

import z from "zod";
import { UserSchema } from "@/types/user";
import supabase from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type User = z.infer<typeof UserSchema>;

export function useAuth() {
  const router = useRouter();

  async function handleLogin(datas: User) {
    try {
      const { email, password } = datas;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        router.push("/"); // ✅ client redirect
      } else {
        toast.success(`Welcome ${data.user?.email}`);
        router.push("/dashboard"); // ✅ client redirect
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to logout");
    } else {
      toast.success("Logged out successfully");
      router.push("/"); 
    }
  }

  return { handleLogin, handleLogout };
}
