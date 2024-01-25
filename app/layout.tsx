import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// TODO - UPDATE THIS
export const metadata: Metadata = {
  title: "Wordle Game",
  description: "Dacodes Challenge",
};

//TODO- ADD SELECT GAME PAGE
//TODO- ADD EXTRA GAMES

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
