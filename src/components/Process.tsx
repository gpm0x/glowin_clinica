'use client';

import { FC, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  MessageCircle,
  ScanFace,
  ClipboardList,
  HeartPulse,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { PROCESS } from '@/utils/data';
import { CONTACT } from '@/utils/constants';
import { EASE, VIEWPORT, fadeInUp, staggerContainer } from '@/utils/animations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Mark } from '@/components/ui/Mark';
import { WhatsAppIcon } from '@/components/ui/Icons';

const ICONS: Record<string, LucideIcon> = {
  MessageCircle,
  ScanFace,
  ClipboardList,
  HeartPulse,
};

/**
 * O método Glowin — a jornada da paciente em quatro etapas.
 *
 * A linha do tempo é literal: uma régua horizontal (vertical no mobile) que se
 * preenche em terracota conforme a seção sobe pela viewport, dando a sensação
 * de progresso enquanto se lê.
 */
export const Process: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 55%'],
  });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="metodo" className="relative py-24 md:py-32 bg-paper-2 overflow-hidden grain">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="halo halo-jade w-[36rem] h-[36rem] -top-40 right-0 opacity-50" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16 md:mb-24">
          <SectionHeading
            index="03"
            eyebrow="O método"
            title={
              <>
                Quatro etapas até o{' '}
                <span className="italic">
                  <Mark delay={0.5}>seu plano</Mark>
                </span>
              </>
            }
            description="Nenhuma agulha antes da conversa. É esse roteiro que separa um resultado bonito de um resultado previsível."
          />

          <motion.a
            href={CONTACT.WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
            className="btn btn-outline px-7 py-3.5 self-start shrink-0"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>Começar pela etapa 01</span>
          </motion.a>
        </div>

        {/* ---------- Linha do tempo ---------- */}
        <div ref={ref} className="relative">
          {/* Trilho: horizontal no desktop, vertical no mobile */}
          <div className="absolute md:top-[1.35rem] md:left-0 md:right-0 md:h-px left-[1.35rem] top-0 bottom-0 w-px md:w-auto md:bottom-auto bg-pine/15" />
          <motion.div
            style={{ scaleX: fill, transformOrigin: 'left center' }}
            className="hidden md:block absolute top-[1.35rem] left-0 right-0 h-px bg-clay"
          />
          <motion.div
            style={{ scaleY: fill, transformOrigin: 'center top' }}
            className="md:hidden absolute left-[1.35rem] top-0 bottom-0 w-px bg-clay"
          />

          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="grid md:grid-cols-4 gap-10 md:gap-8"
          >
            {PROCESS.map((step) => {
              const Icon = ICONS[step.icon] ?? Sparkles;

              return (
                <motion.li
                  key={step.id}
                  variants={fadeInUp}
                  className="group relative pl-16 md:pl-0"
                >
                  {/* Marcador sobre o trilho */}
                  <span className="absolute md:relative left-0 top-0 md:left-auto w-11 h-11 rounded-full bg-paper-2 border border-pine/20 flex items-center justify-center text-jade transition-all duration-500 group-hover:bg-pine group-hover:text-paper group-hover:border-pine md:mb-8">
                    <Icon className="w-[1.1rem] h-[1.1rem]" strokeWidth={1.3} />
                  </span>

                  <div className="flex items-baseline gap-3 mb-2 md:mt-0 mt-0.5">
                    <span className="label-num text-clay">{step.step}</span>
                    <span className="h-px flex-1 bg-pine/15" />
                    <span className="label text-[0.52rem] text-stone/80 shrink-0 whitespace-nowrap">
                      {step.duration}
                    </span>
                  </div>

                  <h3 className="font-display text-[1.75rem] leading-tight text-pine mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[0.94rem] leading-[1.7] text-stone">
                    {step.description}
                  </p>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>

        {/* Nota de rodapé do método */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 md:mt-20 pt-6 border-t border-pine/15 max-w-2xl text-[0.92rem] leading-[1.75] text-stone"
        >
          <span className="label text-[0.55rem] text-clay mr-3">Nota</span>
          Etapas 01 a 03 acontecem na mesma visita, sem custo e sem obrigação de
          contratar. Você sai da clínica com o plano em mãos — mesmo que decida
          não seguir com ele.
        </motion.p>
      </div>
    </section>
  );
};
