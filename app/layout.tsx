import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Huego.ai",
  description: "your personal medical assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="./Huego.png" />
      </head>
      <body className="max-h-10">
        <div className="h-24">
          {children}
        </div>
      </body>
    </html>
  );
}
