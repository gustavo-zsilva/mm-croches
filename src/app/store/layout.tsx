import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store | MM Cozy Crochet",
  description: "MM Cozy Crochet Store",
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
