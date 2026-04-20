import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import BrandingGradients from "@/components/ui/BrandingGradients";
import { supabaseAdmin } from "@/lib/supabase/client";
import { headers } from "next/headers";
import MaintenancePage from "@/components/MaintenancePage";
import AdminReturnButton from "@/components/AdminReturnButton";
import { GoogleAnalytics } from "@next/third-parties/google";

import { constructMetadata } from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await supabaseAdmin
    .from('site_settings')
    .select('site_name')
    .eq('id', 'main')
    .single();

  return constructMetadata();
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
      className={`${jakarta.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8f9fa] text-[#1a1a1a] selection:bg-neutral-700 selection:text-white">
        {/* Google Analytics 4 integration using @next/third-parties/google. 
            Measurement ID is configured in .env.local as NEXT_PUBLIC_GA_ID. */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        
        <BrandingGradients />
        {isMaintenance ? <MaintenancePage /> : children}
        <AdminReturnButton />
      </body>
    </html>
  );
}
