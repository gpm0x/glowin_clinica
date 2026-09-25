'use client';

import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FOUNDER } from '@/utils/data';
import { CONTACT } from '@/utils/constants';
import {
  VIEWPORT,
  drawRule,
  fadeInUp,
  shutter,
  staggerContainer,
  writeOn,
} from '@/utils/animations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Mark } from '@/components/ui/Mark';
import { SealBadge, SignatureMark, WhatsAppIcon } from '@/components/ui/Icons';

/**
 * A fundadora — pausa de tinta no meio da página.
 *
 * O retrato entra em arco (a forma-assinatura da marca) com revelação de
 * obturador, e a assinatura manuscrita é "escrita" logo abaixo da citação.
 * A trajetória fecha a seção como uma faixa de três marcos, cada um sob uma
 * régua que se desenha ao entrar em tela.
 */
export const Founder: FC = () => (
  <section
    id="fundadora"
    className="relative py-24 md:py-32 bg-pine text-paper overflow-hidden grain"
  >
    <div className="absolute inset-0 dot-grid-invert opacity-40 pointer-events-none" />
    <div className="halo halo-jade w-[40rem] h-[40rem] -top-32 -right-40 opacity-45" />

    <div className="container mx-auto px-5 md:px-8 relative z-10">
      <SectionHeading
        invert
        index="02"
        eyebrow="A fundadora"
        title={
          <>
            Quem{' '}
            <span className="italic">
              <Mark invert delay={0.5}>
                assina
              </Mark>
            </span>{' '}
            cada plano
          </>
        }
        className="mb-14 md:mb-20"
      />

      <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-14 lg:gap-20 items-start">
        {/* ---- Retrato + identificação ---- */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative"
          >
            {/* Moldura terracota deslocada — profundidade sem sombra */}
            <span
              aria-hidden
              className="absolute -left-3 -bottom-3 w-full h-full arch border border-clay/40 pointer-events-none"
            />

            {/* O `clip-path` da revelação vive no invólucro: no mesmo elemento
                do `border-radius` em arco ele anularia o recorte. */}
            <motion.div
              variants={shutter}
              className="relative aspect-[3/4] arch overflow-hidden bg-pine-2 photo-wash"
            >
              <Image
                src={FOUNDER.portrait}
                alt={`Retrato de ${FOUNDER.name}, ${FOUNDER.role.toLowerCase()} da Glowin`}
                fill
                sizes="(max-width: 1024px) 100vw, 34vw"
                className="object-cover object-top photo-warm"
              />
            </motion.div>

            {/* Carimbo girando sobre a quina inferior do retrato */}
            <SealBadge className="slow-spin absolute -bottom-10 -right-6 w-28 h-28 text-paper/30 hidden sm:block" />
          </motion.div>

          {/* Placa de identificação */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mt-14 sm:mt-16 border-t border-paper/15 pt-7"
          >
            <motion.h3
              variants={fadeInUp}
              className="font-display text-[1.9rem] sm:text-[2.2rem] leading-none text-paper"
            >
              {FOUNDER.name}
            </motion.h3>
            <motion.p variants={fadeInUp} className="label text-clay-light mt-3">
              {FOUNDER.role}
            </motion.p>
            <motion.p variants={fadeInUp} className="label-num text-paper/40 mt-2">
              {FOUNDER.registry}
            </motion.p>
          </motion.div>
        </div>

        {/* ---- Texto, citação e formação ---- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="lg:pt-2"
        >
          <motion.p
            variants={fadeInUp}
            className="text-[1.12rem] sm:text-[1.2rem] leading-[1.7] text-paper/85 max-w-2xl"
          >
            {FOUNDER.lead}
          </motion.p>

          {/* Citação: fio terracota à esquerda, assinatura escrita embaixo */}
          <motion.figure
            variants={fadeInUp}
            className="relative my-11 pl-7 border-l border-clay/50"
          >
            <blockquote className="font-display italic text-[1.75rem] sm:text-[2.15rem] leading-[1.24] text-paper">
              &ldquo;{FOUNDER.quote}&rdquo;
            </blockquote>

            <figcaption className="mt-6 flex items-end gap-5">
              {/* Herda os rótulos do `figure`; só declara a própria variante */}
              <motion.span variants={writeOn} className="block shrink-0">
                <SignatureMark className="w-32 sm:w-40 text-clay-light" />
              </motion.span>
              <span className="label text-[0.55rem] text-paper/35 pb-1">
                {FOUNDER.name}
              </span>
            </figcaption>
          </motion.figure>

          <motion.p
            variants={fadeInUp}
            className="text-[0.98rem] leading-[1.75] text-paper/60 max-w-2xl"
          >
            {FOUNDER.body}
          </motion.p>

          {/* Formação */}
          <motion.div variants={fadeInUp} className="mt-12">
            <p className="label text-paper/40 mb-6">Formação</p>
            <ul className="flex flex-col">
              {FOUNDER.credentials.map((credential) => (
                <li
                  key={credential}
                  className="group flex items-start gap-4 border-t border-paper/12 last:border-b py-4 transition-colors duration-500 hover:bg-paper/5"
                >
                  <span
                    aria-hidden
                    className="mt-[0.62em] h-px w-4 shrink-0 bg-clay transition-all duration-500 group-hover:w-7"
                  />
                  <span className="text-[0.95rem] leading-[1.6] text-paper/75">
                    {credential}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.a
            variants={fadeInUp}
            href={CONTACT.WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-paper px-8 py-4 mt-10"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Falar com a equipe</span>
          </motion.a>
        </motion.div>
      </div>

      {/* ---- Trajetória ---- */}
      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="grid sm:grid-cols-3 gap-10 sm:gap-8 lg:gap-12 mt-20 md:mt-28"
      >
        {FOUNDER.milestones.map((milestone) => (
          <motion.li key={milestone.year} variants={fadeInUp} className="relative pt-7">
            <motion.span
              variants={drawRule}
              style={{ transformOrigin: 'left center' }}
              className="absolute top-0 left-0 right-0 h-px bg-paper/20"
            />
            <span className="numeral block text-[2.6rem] leading-none text-clay-light">
              {milestone.year}
            </span>
            <h3 className="font-display text-[1.35rem] leading-tight text-paper mt-4 mb-3">
              {milestone.title}
            </h3>
            <p className="text-[0.92rem] leading-[1.7] text-paper/55">
              {milestone.description}
            </p>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  </section>
);
