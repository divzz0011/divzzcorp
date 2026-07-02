import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Menggunakan font Inter yang dijamin aman dan sangat estetik-minimalis
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkenaSpace - Pastel Minimalist",
  description: "Modern Full-Stack Ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}