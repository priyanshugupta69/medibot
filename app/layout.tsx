import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/footer";
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
        {/* <link rel="shortcut icon" href={favicon} /> */}
        <link rel="shortcut icon" href="/human_2.png" />
      </head>
      <body className="max-h-10">
        <div className="h-24">
          <div className="absolute inset-0 flex justify-center items-center z-[-10]">
            <div className="flex opacity-50 items-center">
            <img src="/human_2.png" alt="Medibot Logo" className="w-28 md:w-52" />
            <div className="text-5xl md:text-8xl text-[#A49B9B]">Huego</div>
            </div>
          </div>
          {children}
          <Footer/>
        </div>

      </body>
    </html>
  );
}
