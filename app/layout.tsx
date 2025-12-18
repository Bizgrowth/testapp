import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Social Content Generator",
  description: "Create viral, platform-optimized social media content powered by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
