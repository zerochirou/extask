import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";

const geistSans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // pilih variasi yang dibutuhkan
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Extask - Zerochiro Private Website",
  description: "Zerochiro's work management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="selection:bg-primary selection:text-white">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
