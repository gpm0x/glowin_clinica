'use client';

import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Gem, Fingerprint, Globe2 } from 'lucide-react';
import { fadeInUp, staggerContainer, VIEWPORT, EASE, shutter } from '@/utils/animations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Mark } from '@/components/ui/Mark';

const values = [
  {
    icon: Gem,
    title: 'Estética de resultado',
    description:
      'Definimos o objetivo, registramos o ponto de partida em foto padronizada e comparamos a cada marco. Sem isso, resultado é opinião.',
  },
  {
    icon: Fingerprint,
    title: 'Protocolo, não pacote',
    description:
      'Sua pele tem uma assinatura própria. O plano nasce dela — do seu histórico, do seu tempo e do seu orçamento —, nunca de uma tabela pronta.',
  },
  {
    icon: Globe2,
    title: 'Técnica atualizada',
    description:
      'Equipe em formação contínua nas escolas de referência em harmonização e rejuvenescimento, dentro e fora do país.',
  },
];

export const ValueProp: FC = () => (
  <section className="relative py-24 md:py-32 overflow-hidden">
    <div className="halo w-[34rem] h-[34rem] top-1/4 -left-40 opacity-70" />

    <div className="container mx-auto px-5 md:px-8 relative z-10">
      <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-14 lg:gap-20 items-start">
        {/* ---- Coluna fixa: título + fotografia em arco ---- */}
        <div className="lg:sticky lg:top-32">
          <SectionHeading
            index="01"
            eyebrow="Por que a Glowin"
            title={
              <>
                Três compromissos{' '}
                <span className="italic">
                  <Mark delay={0.55}>inegociáveis</Mark>
                </span>
              </>
            }
            description="É o que sustenta cada antes e depois que você vai ver mais abaixo."
          />

          {/* O `clip-path` da revelação vive no invólucro — no mesmo elemento
              ele anularia o recorte em arco. */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative mt-12 h-[18rem] sm:h-[22rem] hidden lg:block"
          >
            <motion.div
              variants={shutter}
              className="absolute inset-0 arch-down overflow-hidden bg-paper-3 photo-wash"
            >
              <Image
                src="https://images.unsplash.com/photo-1630835425197-50feeba99ecd?auto=format&fit=crop&q=80&w=900"
                alt="Ambiente da clínica Glowin"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover photo-warm"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ---- Coluna de conteúdo: entradas separadas por réguas ---- */}
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="flex flex-col lg:pt-4"
        >
          {values.map((value, i) => (
            <motion.li
              key={value.title}
              variants={fadeInUp}
              className="group relative border-t border-pine/15 last:border-b py-9 lg:py-11 grid grid-cols-[auto_1fr] gap-6 sm:gap-8"
            >
              {/* Índice + ícone */}
              <div className="flex flex-col items-center gap-4">
                <span className="label-num text-clay">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <motion.span
                  whileHover={{ rotate: -8 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="w-11 h-11 rounded-full border border-pine/15 flex items-center justify-center text-jade transition-colors duration-500 group-hover:bg-pine group-hover:text-paper group-hover:border-pine"
                >
                  <value.icon className="w-[1.15rem] h-[1.15rem]" strokeWidth={1.3} />
                </motion.span>
              </div>

              <div>
                <h3 className="font-display text-[1.7rem] sm:text-[2rem] leading-tight text-pine mb-3">
                  {value.title}
                </h3>
                <p className="text-[0.98rem] leading-[1.7] text-stone max-w-md">
                  {value.description}
                </p>
              </div>

              {/* Fio terracota que corre na régua superior ao passar o mouse */}
              <span className="absolute -top-px left-0 h-px w-0 bg-clay transition-all duration-700 group-hover:w-full" />
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </div>
  </section>
);
