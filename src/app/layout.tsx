import type { Metadata } from "next";
import { poppins } from "@/utils/fonts";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "MM Cozy Crochet",
  description: "MM Cozy Crochet Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${poppins.className} m-auto`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
