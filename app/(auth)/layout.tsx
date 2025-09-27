import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Toaster position="top-center"/>
      {children}
    </div>
  );
}
