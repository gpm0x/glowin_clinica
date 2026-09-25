'use client';

import { FC, useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import {
  ArrowUpRight,
  Droplets,
  Gem,
  HeartHandshake,
  Leaf,
  Sparkles,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { SERVICES } from '@/utils/data';
import { CONTACT } from '@/utils/constants';
import { EASE, VIEWPORT, fadeInUp, staggerContainer } from '@/utils/animations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Mark } from '@/components/ui/Mark';
import { cn } from '@/utils/cn';

const ICONS: Record<string, LucideIcon> = {
  Droplets,
  Sparkles,
  Zap,
  Leaf,
  Gem,
  HeartHandshake,
};

/**
 * Índice de serviços em formato de sumário de revista.
 *
 * No desktop, uma fotografia em arco segue o cursor e troca conforme a linha
 * em foco — o portfólio inteiro cabe numa tela, sem carrossel, e a imagem
 * aparece só quando é útil. No mobile, cada linha traz sua própria miniatura.
 */
export const Services: FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Posição bruta do cursor → mola, para o preview "perseguir" com inércia
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const previewX = useSpring(rawX, { stiffness: 220, damping: 26, mass: 0.6 });
  const previewY = useSpring(rawY, { stiffness: 220, damping: 26, mass: 0.6 });

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = listRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set(e.clientX - rect.left);
      rawY.set(e.clientY - rect.top);
    },
    [rawX, rawY]
  );

  return (
    <section id="servicos" className="relative py-24 md:py-32 overflow-hidden">
      <div className="halo w-[38rem] h-[38rem] -right-48 top-20 opacity-80" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <SectionHeading
          index="04"
          eyebrow="Portfólio"
          title={
            <>
              Procedimentos que{' '}
              <span className="italic">
                <Mark delay={0.5}>revelam</Mark>
              </span>
            </>
          }
          description="Tecnologia conduzida por mãos experientes. Passe o mouse para ver cada procedimento."
          className="mb-14 md:mb-20 max-w-3xl"
        />

        <div
          ref={listRef}
          onMouseMove={handleMove}
          onMouseLeave={() => setHovered(null)}
          className="relative"
        >
          {/* Pré-visualização que segue o cursor (só faz sentido com mouse) */}
          <AnimatePresence>
            {hovered !== null && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, ease: EASE }}
                style={{ x: previewX, y: previewY }}
                className="hidden lg:block pointer-events-none absolute top-0 left-0 z-30 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative w-[17rem] h-[21rem] arch overflow-hidden bg-paper-3 photo-wash shadow-[0_40px_80px_-40px_rgba(19,33,28,0.7)]">
                  <Image
                    src={SERVICES[hovered].image}
                    alt=""
                    fill
                    sizes="17rem"
                    className="object-cover photo-warm"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative"
          >
            {SERVICES.map((service, i) => {
              const Icon = ICONS[service.icon] ?? Sparkles;
              const dimmed = hovered !== null && hovered !== i;

              return (
                <motion.li
                  key={service.id}
                  variants={fadeInUp}
                  onMouseEnter={() => setHovered(i)}
                  className={cn(
                    'group relative border-t border-pine/15 last:border-b transition-opacity duration-500',
                    dimmed && 'lg:opacity-35'
                  )}
                >
                  {/* Faixa que preenche a linha da esquerda para a direita */}
                  <span className="absolute inset-0 bg-paper-2 origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 -z-10" />

                  <a
                    href={CONTACT.WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    // No mobile a linha fica alta (título + texto + miniatura):
                    // índice e seta ancoram no topo, não no meio da célula.
                    className="relative grid grid-cols-[auto_1fr_auto] items-start lg:items-center gap-5 sm:gap-8 py-7 md:py-9 px-1 sm:px-4"
                  >
                    {/* Índice + ícone */}
                    <span className="flex items-center gap-4 sm:gap-5 pt-1 lg:pt-0">
                      <span className="label-num text-clay w-6">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="hidden sm:flex w-10 h-10 rounded-full border border-pine/15 items-center justify-center text-jade shrink-0 transition-all duration-500 group-hover:border-clay group-hover:text-clay group-hover:rotate-[-8deg]">
                        <Icon className="w-4 h-4" strokeWidth={1.3} />
                      </span>
                    </span>

                    {/* Título + descrição */}
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <span className="font-display text-[1.5rem] sm:text-[2rem] lg:text-[2.35rem] leading-[1.1] text-pine transition-transform duration-500 group-hover:translate-x-1.5">
                          {service.title}
                        </span>
                        {service.highlighted && (
                          <span className="label text-[0.5rem] text-paper bg-clay px-2.5 py-1 rounded-full">
                            Sem custo
                          </span>
                        )}
                      </span>

                      <span className="block mt-2 text-[0.92rem] leading-[1.65] text-stone max-w-xl lg:max-w-lg">
                        {service.description}
                      </span>

                      {/* Miniatura — substitui o preview do cursor no mobile */}
                      <span className="lg:hidden mt-4 block relative w-full h-36 sm:h-44 arch-down overflow-hidden bg-paper-3 photo-wash">
                        <Image
                          src={service.image}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 90vw, 45vw"
                          className="object-cover photo-warm"
                        />
                      </span>
                    </span>

                    {/* Duração + seta */}
                    <span className="flex items-center gap-4 sm:gap-6 shrink-0 pt-1 lg:pt-0">
                      <span className="label text-[0.55rem] text-stone/80 hidden sm:block whitespace-nowrap">
                        {service.duration}
                      </span>
                      <span className="w-10 h-10 rounded-full border border-pine/15 flex items-center justify-center text-pine shrink-0 transition-all duration-500 group-hover:bg-pine group-hover:text-paper group-hover:border-pine">
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </span>
                  </a>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 label text-[0.56rem] text-stone/70"
        >
          Todos os procedimentos exigem avaliação presencial prévia.
        </motion.p>
      </div>
    </section>
  );
};
