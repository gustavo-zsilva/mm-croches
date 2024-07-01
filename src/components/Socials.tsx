import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Mail } from "lucide-react";
import { ExternalLink } from "@/lib/ExternalLink";

export function Socials() {
  return (
    <div className="flex gap-3 text-gray-500">
      <ExternalLink
        href="https://wa.me/5548991190544"
        className="border p-2 rounded-full hover:bg-gray-200/20 transition-colors"
      >
        <FaWhatsapp size={24} />
      </ExternalLink>
      <ExternalLink
        href="https://instagram.com/mm.cozycrochet"
        className="border p-2 rounded-full hover:bg-gray-200/20 transition-colors"
      >
        <FaInstagram size={24} />
      </ExternalLink>
      <a
        href="mailto:mmcozycrochet@gmail.com"
        className="border p-2 rounded-full hover:bg-gray-200/20 transition-colors"
      >
        <Mail />
      </a>
    </div>
  );
}
