export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto p-3">{children}</div>
      </main>
    </div>
  );
}
