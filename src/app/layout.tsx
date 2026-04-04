import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NAF | Tikinti Texnikası İcarəsi",
  description: "Müasir mühəndislik həlləri və peşəkar tikinti texnikası icarəsi.",
};

import AdminReturnButton from "@/components/AdminReturnButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="az"
      className={`${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8f9fa] text-[#1a1a1a] selection:bg-neutral-700 selection:text-white">
        {children}
        <AdminReturnButton />
      </body>
    </html>
  );
}
