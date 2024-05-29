import { About } from "@/components/About";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";
import { Products } from "@/components/Products";

export default function Home() {
  return (
    <main className="min-h-screen space-y-10">
      <Header />
      <Main />
      <About />
      <Products />
    </main>
  );
}
