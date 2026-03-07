import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Yash Bhosale | Data Science & Engineering",
  description: "Portfolio of Yash Bhosale — Data Science student specializing in ML, computer vision, and geospatial analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-white text-black`}>
        {children}
      </body>
    </html>
  );
}
