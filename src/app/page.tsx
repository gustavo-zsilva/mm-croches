import { Header } from "@/components/Header";
import { Main } from "@/components/Main";
import { About } from "@/components/About";
import { Products } from "@/components/Products";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen space-y-10">
      <Header />
      <Main />
      <About />
      <Products />
      <Contact />
      <Footer />
    </main>
  );
}
