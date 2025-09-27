import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function supabaseServer() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: async () => (await cookies()).getAll(),
        setAll: (cookiesToSet) => {
          // ketika di route handler / middleware: set cookie di response
          // Implementasi tergantung di mana kamu pakai
          // contohnya di middleware / handler, buat response dan lakukan response.cookies.set(...)
          // Supabase docs punya contoh
        },
      },
    }
  );
}
