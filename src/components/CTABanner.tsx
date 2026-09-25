'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Clock3, ShieldCheck, Sparkles } from 'lucide-react';
import { CONTACT } from '@/utils/constants';
import { EASE, VIEWPORT, curtainUp } from '@/utils/animations';
import { ArchOrnament, SealBadge, WhatsAppIcon } from '@/components/ui/Icons';

const perks = [
  { icon: ShieldCheck, label: 'Sem compromisso' },
  { icon: Clock3, label: 'Resposta em até 1h' },
  { icon: Sparkles, label: 'Plano por escrito' },
];

export const CTABanner: FC = () => (
  <section id="contato" className="relative py-28 md:py-40 overflow-hidden grain bg-paper">
    {/* Arco de luz atrás do título */}
    <div className="halo w-[46rem] h-[46rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100" />
    {/* A máscara dissolve as "pernas" do arco: sem ela restam barras verticais
        atravessando o título. */}
    <ArchOrnament className="absolute top-0 left-1/2 -translate-x-1/2 w-[46rem] max-w-none text-clay/25 pointer-events-none [mask-image:linear-gradient(to_bottom,#000_15%,transparent_72%)]" />
    <div className="absolute inset-0 dot-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent_75%)] pointer-events-none" />

    <div className="container mx-auto px-5 md:px-8 relative z-10">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative w-24 h-24 mb-12"
        >
          <SealBadge className="absolute inset-0 w-full h-full text-pine/50 slow-spin" />
          <span className="absolute inset-0 flex items-center justify-center label text-[0.5rem] text-clay leading-[1.6]">
            grátis
          </span>
        </motion.div>

        {/* O gatilho fica nas máscaras: a linha deslocada em 112% está
            totalmente recortada e nunca seria vista pelo IntersectionObserver. */}
        <h2 className="font-display text-[2.8rem] leading-[0.92] sm:text-[4.2rem] md:text-[5.4rem] text-pine">
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="block overflow-hidden pb-[0.14em]"
          >
            <motion.span variants={curtainUp} className="block">
              Pronta para se
            </motion.span>
          </motion.span>
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="block overflow-hidden pb-[0.18em]"
          >
            <motion.span
              variants={curtainUp}
              transition={{ duration: 0.95, ease: EASE, delay: 0.1 }}
              className="block italic text-clay"
            >
              transformar?
            </motion.span>
          </motion.span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: EASE, delay: 0.32 }}
          className="mt-8 mb-11 text-[1.08rem] leading-[1.7] text-stone max-w-lg"
        >
          Quarenta minutos de conversa, diagnóstico e um plano por escrito.
          A avaliação é gratuita — e o plano é seu, mesmo que você decida
          não seguir com a gente.
        </motion.p>

        <motion.a
          href={CONTACT.WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASE, delay: 0.42 }}
          className="btn btn-clay pulse-ring px-10 py-5 text-[0.72rem]"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>Agendar avaliação gratuita</span>
        </motion.a>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-12 pt-8 border-t border-pine/15 w-full flex flex-wrap justify-center gap-x-9 gap-y-3"
        >
          {perks.map((perk) => (
            <li key={perk.label} className="flex items-center gap-2.5 label text-[0.55rem] text-stone">
              <perk.icon className="w-3.5 h-3.5 text-jade" strokeWidth={1.5} />
              {perk.label}
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  </section>
);
