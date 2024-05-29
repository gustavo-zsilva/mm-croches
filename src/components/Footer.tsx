import Image from "next/image";
import { Socials } from "./Socials";

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 px-6 pb-10">
      <div className="flex items-center w-full gap-6">
        <div className="w-full h-0.5 bg-gray-300 rounded-full" />
        <Socials />
        <div className="w-full h-0.5 bg-gray-300 rounded-full" />
      </div>
      <Image width={90} height={90} src="/images/logo.png" alt="Logo" />
      <span className="text-xs">Copyright © 2024 MMCozyCrochet.Inc</span>
    </footer>
  );
}
