"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex flex-col items-center py-4 gap-4 px-6 max-w-screen-xl lg:grid lg:grid-cols-3 lg:place-items-center lg:m-auto">
      <Link href="/">
        <Image width={90} height={90} src="/images/logo.png" alt="Logo" />
      </Link>
      <nav className="flex gap-8 flex-wrap items-center justify-center">
        <Link
          href="/"
          className={
            pathname === "/"
              ? "font-semibold underline underline-offset-8 decoration-2"
              : ""
          }
        >
          Home
        </Link>
        <Link href="#about">Sobre</Link>
        <Link
          href="/store"
          className={
            pathname === "/store"
              ? "font-semibold underline underline-offset-8 decoration-2"
              : ""
          }
        >
          Loja
        </Link>
        <Link href="#contact">Contato</Link>
      </nav>
        <Link href="/store" className="hidden lg:inline">
          <Button>Encomendar</Button>
        </Link>
    </header>
  );
}
