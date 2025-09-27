import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = supabaseServer();

  const { data: { user }, error } = await supabase.auth.getUser();

  // misalnya kalo belum login, redirect ke login page
  if (!user) {
    const loginUrl = new URL('/', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // kalau perlu, set cookies baru jika ada perubahan session
  // Supabase documentation punya cara bagaimana response.cookies.set(...) 
  // kalau session ter-refresh

  return res;
}

// Optional: matcher supaya middleware hanya jalan di route tertentu
export const config = {
  matcher: ['/dashboard/:path*']  // contoh
};
