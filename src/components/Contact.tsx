import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { ChevronDown } from "lucide-react";
import { WavyBg } from "@/lib/WavyBg";
import { HighlightedText, GradientText } from "@/lib/StyledText";
import { ExternalLink } from "@/lib/ExternalLink";

export function Contact() {
  return (
    <section
      id="contact"
      className="bg-primary px-0 text-white flex flex-col items-center text-center"
    >
      <WavyBg className="max-w-screen-lg">
        <h1>Não encontrou o que procura?</h1>
        <p className="text-lg">
          Estamos aqui para ajudar! <br /> Se você não encontrou exatamente o
          que estava procurando em nossa loja, não se preocupe. Teremos o maior
          prazer em criar algo especial para você. <br />{" "}
          <span className="font-semibold">
            Entre em contato conosco através de uma das opções abaixo:
          </span>
        </p>
        <ul className="grid grid-cols-1 gap-6 place-items-center md:place-items-stretch min-[845px]:grid-cols-3">
          <li className="bg-primary-light rounded-lg p-6 space-y-3 flex flex-col items-center">
            <header className="flex items-center gap-3">
              <FaWhatsapp size={22} />
              <h3 className="font-semibold text-lg">Whatsapp</h3>
            </header>
            <p>
              Envie uma mensagem pelo WhatsApp para{" "}
              <HighlightedText>+55 (48) 99119-0544</HighlightedText>.
              Respondemos em até 24 horas.
            </p>
          </li>
          <ChevronDown className="md:hidden" />
          <li className="bg-primary-light rounded-lg p-6 space-y-3 flex flex-col items-center">
            <header className="flex items-center gap-3">
              <FaInstagram size={22} />
              <h3 className="font-semibold text-lg">Instagram</h3>
            </header>
            <p>
              Estamos sempre ativos no Instagram! Envie uma DM para{" "}
              <GradientText variant="instagram">
                <ExternalLink
                  href="https://www.instagram.com/mm.cozycrochet/"
                  className="hover:underline hover:text-fuchsia-300"
                >
                  @mm.cozycrochet
                </ExternalLink>
              </GradientText>{" "}
              com seu pedido customizado.
            </p>
          </li>
          <ChevronDown className="md:hidden" />
          <li className="bg-primary-light rounded-lg p-6 space-y-3 flex flex-col items-center">
            <header className="flex items-center gap-3">
              <BiLogoGmail size={22} />
              <h3 className="font-semibold text-lg">Email</h3>
            </header>
            <p>
              Envie um e-mail para{" "}
              <span className="font-semibold">mmcozycrochet@gmail.com</span> com
              suas dúvidas, sugestões ou pedidos personalizados.
            </p>
          </li>
        </ul>
      </WavyBg>
    </section>
  );
}
