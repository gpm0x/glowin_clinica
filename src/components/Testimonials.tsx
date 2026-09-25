'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '@/utils/data';
import { CONTACT } from '@/utils/constants';
import { EASE, VIEWPORT, fadeInUp, staggerContainer } from '@/utils/animations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Mark } from '@/components/ui/Mark';
import { ArchOrnament, InstagramIcon } from '@/components/ui/Icons';
import { cn } from '@/utils/cn';

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/** Deslocamentos verticais alternados — quebram a grade e dão ritmo editorial. */
const OFFSETS = ['lg:mt-0', 'lg:mt-14', 'lg:mt-4', 'lg:mt-20', 'lg:mt-8'];

export const Testimonials: FC = () => (
  <section id="depoimentos" className="relative py-24 md:py-32 overflow-hidden">
    <div className="halo w-[36rem] h-[36rem] top-10 left-1/3 opacity-70" />

    <div className="container mx-auto px-5 md:px-8 relative z-10">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16 md:mb-20">
        <SectionHeading
          index="06"
          eyebrow="Depoimentos"
          title={
            <>
              Quem já{' '}
              <span className="italic">
                <Mark delay={0.5}>brilhou</Mark>
              </span>{' '}
              com a gente
            </>
          }
          description="Depoimentos coletados após a última sessão de cada protocolo, publicados com autorização."
        />

        <ArchOrnament className="hidden lg:block w-40 text-clay/40 shrink-0" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-start"
      >
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.id}
            variants={fadeInUp}
            className={cn(
              'card-paper corner-tick group p-8 lg:p-9 flex flex-col h-full',
              OFFSETS[i % OFFSETS.length],
              // O primeiro depoimento ganha peso: ocupa duas colunas e vira tinta
              i === 0 && 'sm:col-span-2 lg:col-span-1 lg:row-span-2'
            )}
          >
            <div className="flex items-center justify-between gap-4 mb-7">
              <div className="flex gap-0.5" aria-label={`${t.rating} de 5 estrelas`}>
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="w-3 h-3 text-clay fill-clay" />
                ))}
              </div>
              <span className="label-num text-[0.58rem] text-stone/50">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            <blockquote
              className={cn(
                'font-display leading-[1.35] text-pine flex-1',
                i === 0 ? 'text-[1.6rem] lg:text-[1.9rem]' : 'text-[1.3rem]'
              )}
            >
              “{t.quote}”
            </blockquote>

            <figcaption className="mt-8 pt-6 border-t border-pine/12 flex items-center gap-4">
              <span className="w-11 h-11 rounded-full bg-paper-2 border border-pine/12 flex items-center justify-center font-display text-[0.95rem] text-jade shrink-0 transition-colors duration-500 group-hover:bg-pine group-hover:text-paper">
                {initials(t.name)}
              </span>
              <span className="min-w-0">
                <span className="block font-display text-[1.05rem] text-pine leading-tight">
                  {t.name}
                </span>
                <span className="block label text-[0.5rem] leading-[1.7] text-stone/80 mt-1">
                  {t.procedure} · {t.location}
                </span>
              </span>
            </figcaption>
          </motion.figure>
        ))}

        {/* Cartão-convite: fecha a grade e leva ao Instagram */}
        <motion.a
          variants={fadeInUp}
          href={CONTACT.INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'group relative bg-pine text-paper p-8 lg:p-9 flex flex-col justify-between min-h-[16rem] overflow-hidden transition-transform duration-500 hover:-translate-y-1.5',
            OFFSETS[TESTIMONIALS.length % OFFSETS.length]
          )}
        >
          <div className="absolute inset-0 dot-grid-invert opacity-40 pointer-events-none" />
          <div className="halo halo-jade w-56 h-56 -bottom-20 -right-16 opacity-60" />

          <InstagramIcon className="w-6 h-6 text-clay-light relative z-10" />

          <div className="relative z-10">
            <p className="font-display text-[1.6rem] leading-tight mb-3">
              Mais 400 histórias no nosso Instagram.
            </p>
            <span className="label text-[0.55rem] text-paper/60 inline-flex items-center gap-2">
              {CONTACT.INSTAGRAM_HANDLE}
              <span className="h-px w-6 bg-clay-light transition-all duration-500 group-hover:w-12" />
            </span>
          </div>
        </motion.a>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        className="mt-12 label text-[0.56rem] text-stone/70"
      >
        Nomes abreviados a pedido das pacientes.
      </motion.p>
    </div>
  </section>
);
