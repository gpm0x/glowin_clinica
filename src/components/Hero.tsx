'use client';

import { FC, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Star } from 'lucide-react';
import { CONTACT, CLINIC } from '@/utils/constants';
import { STATS } from '@/utils/data';
import { EASE } from '@/utils/animations';
import { Counter } from '@/components/ui/Counter';
import { SealBadge, WhatsAppIcon } from '@/components/ui/Icons';

const slides = [
  {
    src: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=1200',
    caption: 'Protocolos faciais',
  },
  {
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1200',
    caption: 'Tecnologia a laser',
  },
  {
    src: 'https://images.unsplash.com/photo-1566895733044-d2bdda8b6234?auto=format&fit=crop&q=80&w=1200',
    caption: 'Beleza natural',
  },
];

/** O título é revelado linha a linha, cada uma subindo de trás de uma máscara. */
const lines = [
  { text: 'Sua melhor', italic: false },
  { text: 'versão', italic: true },
  { text: 'começa hoje', italic: false },
];

export const Hero: FC = () => {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => setIndex((p) => (p + 1) % slides.length), 5400);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative overflow-hidden pt-32 pb-0 lg:pt-40 grain"
    >
      {/* Atmosfera: luz quente no alto, trama de pontos ao fundo */}
      <div className="absolute inset-0 dot-grid opacity-[0.55] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_10%,transparent_75%)] pointer-events-none" />
      <div className="halo w-[46rem] h-[46rem] -top-64 -left-40 opacity-90" />
      <div className="halo halo-jade w-[32rem] h-[32rem] top-40 -right-40 opacity-60" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        {/* --- Régua superior: metadados da clínica --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          // A régua para antes da coluna do arco: a imagem sobe para dentro
          // desta faixa e engoliria a etiqueta da direita.
          className="flex items-center justify-between gap-6 border-t border-pine/15 pt-4 mb-12 lg:mb-16 lg:pr-[34%]"
        >
          <span className="label text-stone">
            Estética avançada · {CLINIC.CITY}
          </span>
          <span className="label text-stone hidden sm:block">
            Desde {CLINIC.FOUNDED}
          </span>
          <span className="label text-clay">Avaliação gratuita</span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* ---------- Coluna editorial ---------- */}
          <motion.div
            style={{ y: textY, opacity: fade }}
            className="lg:col-span-7 relative z-10"
          >
            <h1 className="font-display text-[3.4rem] leading-[0.88] sm:text-[5rem] lg:text-[6.2rem] xl:text-[7rem] text-pine">
              {lines.map((line, i) => (
                // A folga inferior evita que a máscara corte descendentes (j, ç)
                <span key={line.text} className="block overflow-hidden pb-[0.16em]">
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.05, ease: EASE, delay: 0.3 + i * 0.1 }}
                    className={line.italic ? 'block italic text-clay pr-2' : 'block'}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            <div className="grid sm:grid-cols-[auto_1fr] gap-8 sm:gap-10 mt-10 lg:mt-12 max-w-2xl">
              {/* Régua vertical decorativa */}
              <motion.span
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, ease: EASE, delay: 0.9 }}
                style={{ transformOrigin: 'top center' }}
                className="hidden sm:block w-px bg-pine/20"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.8 }}
                className="text-[1.08rem] leading-[1.7] text-stone"
              >
                Protocolos desenhados para o seu rosto — não para uma média.
                Diagnóstico fotográfico, plano por escrito e acompanhamento
                de perto, até o resultado aparecer no espelho.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.92 }}
              className="flex flex-col sm:flex-row gap-3 mt-10"
            >
              <a
                href={CONTACT.WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ink px-8 py-4"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Agendar avaliação</span>
              </a>
              <a href="#resultados" className="btn btn-outline px-8 py-4">
                <span>Ver antes e depois</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Prova social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 1.1 }}
              className="flex items-center gap-4 mt-10"
            >
              <div className="flex -space-x-2.5">
                {slides.concat(slides).slice(0, 4).map((s, i) => (
                  <div
                    key={i}
                    className="relative w-9 h-9 rounded-full ring-2 ring-paper overflow-hidden bg-paper-3"
                  >
                    <Image
                      src={s.src}
                      alt=""
                      fill
                      sizes="36px"
                      className="object-cover photo-warm"
                      style={{ objectPosition: `${18 + i * 20}% 30%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-clay fill-clay" />
                  ))}
                </div>
                <p className="label text-[0.58rem] text-stone">
                  4,9 · 500+ pacientes
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ---------- Coluna visual: o arco ---------- */}
          <motion.div
            style={{ y: imageY }}
            className="lg:col-span-5 relative lg:-mt-28 xl:-mt-36"
          >
            {/* Arco de contorno, deslocado — dá profundidade sem sombra falsa */}
            <div className="absolute -inset-x-3 -top-3 bottom-6 arch border border-pine/15 pointer-events-none" />

            {/* A cortina de revelação fica num invólucro próprio: um `clip-path`
                aplicado no mesmo elemento substituiria o recorte em arco. */}
            <motion.div
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
              className="relative h-[24rem] sm:h-[32rem] lg:h-[38rem]"
            >
              <div className="absolute inset-0 arch overflow-hidden bg-paper-3 photo-wash">
              <AnimatePresence initial={false} mode="sync">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slides[index].src}
                    alt={slides[index].caption}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover photo-warm"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Legenda + indicadores */}
              <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-4">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={slides[index].caption}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="label text-[0.55rem] text-paper/85"
                  >
                    {slides[index].caption}
                  </motion.span>
                </AnimatePresence>

                <div className="flex gap-1.5 shrink-0">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Imagem ${i + 1}`}
                      className={`h-[2px] rounded-full transition-all duration-500 ${
                        i === index ? 'w-8 bg-paper' : 'w-3 bg-paper/40 hover:bg-paper/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
              </div>
            </motion.div>

            {/* Selo carimbado sobre a borda do arco */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 1.2 }}
              className="absolute -bottom-7 -left-4 sm:-left-8 w-24 h-24 rounded-full bg-paper border border-pine/12 flex items-center justify-center"
            >
              <SealBadge className="absolute inset-0 w-full h-full text-pine/55 slow-spin" />
              <div className="flex flex-col items-center leading-none">
                <span className="numeral text-[1.7rem] text-clay">12</span>
                <span className="label text-[0.42rem] text-stone mt-1">anos</span>
              </div>
            </motion.div>

            {/* Ficha flutuante */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
              className="hidden sm:block drift absolute -right-2 lg:-right-8 top-10 bg-paper border border-pine/12 px-5 py-4 shadow-[0_20px_50px_-30px_rgba(19,33,28,0.6)]"
            >
              <span className="label text-[0.5rem] text-stone">Satisfação</span>
              <div className="numeral text-[2.2rem] leading-none text-pine mt-1">98%</div>
              <span className="text-[0.72rem] text-stone/80">avaliações 5 estrelas</span>
            </motion.div>
          </motion.div>
        </div>

        {/* --- Faixa de números: fecha o herói com o lastro da clínica --- */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.4 }}
          className="mt-16 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 border-t border-pine/15"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`group py-7 lg:py-8 px-1 lg:px-6 flex flex-col gap-1.5 border-b lg:border-b-0 border-pine/15 ${
                i % 2 === 1 ? 'border-l lg:border-l' : ''
              } ${i > 0 ? 'lg:border-l' : ''} border-pine/15`}
            >
              <dt className="label text-[0.55rem] text-stone order-2">{stat.label}</dt>
              <dd className="order-1">
                <Counter
                  to={stat.value}
                  suffix={stat.suffix}
                  className="numeral text-[2.6rem] lg:text-[3.2rem] leading-none text-pine transition-colors duration-500 group-hover:text-clay"
                  suffixClassName="text-[0.5em]"
                />
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
};
