import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Conversify - 회화 학습 도우미",
  description: "일상 대화를 통해 외국어를 쉽게 배우는 회화 학습 도우미",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <BottomNavigation />
        <Toaster position="top-center" toastOptions={{
          className: 'md:!top-auto md:!bottom-0 md:!left-auto md:!right-0 md:!translate-x-0',
        }}/>
      </body>
    </html>
  );
}
