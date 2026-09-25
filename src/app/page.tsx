import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ValueProp } from "@/components/ValueProp";
import { Founder } from "@/components/Founder";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { BeforeAfterGallery } from "@/components/BeforeAfter";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

/**
 * O ritmo da página alterna papel e tinta de propósito:
 * herói (papel) → faixa (tinta) → valores (papel) → fundadora (TINTA) →
 * método (papel 2) → serviços (papel) → resultados (TINTA) →
 * depoimentos (papel) → FAQ (papel 2) → convite (papel) → rodapé (tinta).
 *
 * A fundadora entra logo após os valores: ela é a resposta à pergunta que a
 * seção anterior levanta — quem garante esses compromissos.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo" className="flex min-h-screen flex-col bg-paper">
        <Hero />
        <Marquee />
        <ValueProp />
        <Founder />
        <Process />
        <Services />
        <BeforeAfterGallery />
        <Testimonials />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
