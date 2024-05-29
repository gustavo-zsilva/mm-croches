import { FaWhatsapp } from "react-icons/fa";
import { Mail } from "lucide-react";
import { WavyBg } from "@/lib/WavyBg";

export function Contact() {
  return (
    <section id="contact" className="bg-primary px-0 space-y-10 text-white">
      <WavyBg>
        <h1>Entre em contato</h1>
        <div className="text-lg text-center space-y-6">
          <p>Para pedidos customizados, entre em contato por Whatsapp:</p>
          <span className="flex items-center gap-4 justify-center">
            <FaWhatsapp size={24} />
            +55 48 xxxx-xxx
          </span>
          <p>Entre em contato também por email:</p>
          <span className="flex items-center gap-4 justify-center">
            <Mail />
            example@gmail.com
          </span>
        </div>
      </WavyBg>
    </section>
  );
}
