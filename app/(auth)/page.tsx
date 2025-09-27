import { LoginForm } from "./_components/form";

export default async function LoginPage() {
  return (
    <>
      <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm/>
        </div>
      </div>
    </>
  );
}
