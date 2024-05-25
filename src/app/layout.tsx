import type { Metadata } from "next";
import { poppins } from "@/utils/fonts";
import "./globals.css";

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
    <html lang="pt-BR">
      <body className={`${poppins.className} px-6 m-auto bg-bgColor text-blue-950`}>{children}</body>
    </html>
  );
}
