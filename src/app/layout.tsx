import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { supabaseAdmin } from "@/lib/supabase/client";
import { headers } from "next/headers";
import MaintenancePage from "@/components/MaintenancePage";
import AdminReturnButton from "@/components/AdminReturnButton";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await supabaseAdmin
    .from('site_settings')
    .select('site_name')
    .eq('id', 'main')
    .single();

  return {
    title: settings?.site_name || "Naf Company",
    description: "Yanğın təhlükəsizliyi sistemləri",
    verification: {
      google: "9ZpZjOt1jjfndBksCT2eNtccK34O1HRcwXe6Qh1xM7c",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const fullPath = headerList.get('x-pathname') || ""; // Middleware-dən gəlməlidir, yoxdursa referer-dən təxmin edək
  const referer = headerList.get('referer') || "";
  const isAdmin = referer.includes('/admin') || fullPath.includes('/admin');

  const { data: settings } = await supabaseAdmin
    .from('site_settings')
    .select('maintenance_mode')
    .eq('id', 'main')
    .single();

  const isMaintenance = settings?.maintenance_mode && !isAdmin;

  return (
    <html
      lang="az"
      className={`${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8f9fa] text-[#1a1a1a] selection:bg-neutral-700 selection:text-white">
        {isMaintenance ? <MaintenancePage /> : children}
        <AdminReturnButton />
      </body>
    </html>
  );
}
