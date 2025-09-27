import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Toaster position="top-center" />
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}
