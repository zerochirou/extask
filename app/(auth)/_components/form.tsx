"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserSchema } from "@/types/user";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

export function LoginForm() {
  const { handleLogin } = useAuth();
  const [show, setShow] = useState<"password" | "text">("password");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
  });

  if (
    form.formState.errors.password?.message ||
    form.formState.errors.email?.message
  ) {
    toast.error(
      form.formState.errors.password?.message ||
        form.formState.errors.email?.message
    );
  }

  const handleUserLogin = (data: z.infer<typeof UserSchema>) => {
    startTransition(async () => {
      await handleLogin(data);
      form.reset();
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={form.handleSubmit(handleUserLogin)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-bold text-primary">Private Area Website</h1>
            <div className="text-center text-sm">
              Only those who have and are permitted to access this website
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className={cn(
                  form.formState.errors.email?.message &&
                    "border border-destructive bg-destructive ring ring-destructive"
                )}
                required
                {...form.register("email")}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <div className="flex flex-row items-center gap-2">
                <Input
                  id="password"
                  type={show}
                  required
                  className={cn(
                    form.formState.errors.password?.message &&
                      "border border-destructive bg-destructive ring ring-destructive"
                  )}
                  {...form.register("password")}
                />
                <Button
                  variant={"outline"}
                  type="button"
                  onClick={() =>
                    setShow(show === "password" ? "text" : "password")
                  }
                >
                  {show === "text" ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </div>
            <Button type="submit" disabled={isPending} className="w-full mt-2">
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
