"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex flex-col items-center py-4 gap-4 px-6">
      <Link href="/">
        <Image width={90} height={90} src="/images/logo.png" alt="Logo" />
      </Link>
      <nav className="flex gap-8 flex-wrap">
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
    </header>
  );
}
