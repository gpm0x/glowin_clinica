'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useTransform,
  useInView,
  type AnimationPlaybackControls,
} from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
  Play,
  CalendarDays,
  Repeat2,
  TrendingUp,
} from 'lucide-react';
import { BEFORE_AFTER } from '@/utils/data';
import { CONTACT } from '@/utils/constants';
import { EASE, VIEWPORT } from '@/utils/animations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Mark } from '@/components/ui/Mark';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { cn } from '@/utils/cn';

const clamp = (v: number) => Math.min(100, Math.max(0, v));

/**
 * Galeria antes/depois — a pausa escura da página.
 *
 * O fundo em tinta isola a fotografia do papel: aqui a atenção é toda da
 * imagem, e o terracota vira o único ponto de cor.
 */
export const BeforeAfterGallery: FC = () => {
  const [caseIndex, setCaseIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [ariaValue, setAriaValue] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);

  const frameRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<AnimationPlaybackControls | null>(null);
  const isInView = useInView(frameRef, { once: true, margin: '-120px' });

  const active = BEFORE_AFTER[caseIndex];

  /* --- posição do divisor (0–100) em motion value: arrasta sem re-render --- */
  const x = useMotionValue(50);
  const clipBefore = useTransform(x, (v) => `inset(0 ${100 - v}% 0 0)`);
  const handleLeft = useTransform(x, (v) => `${v}%`);
  const beforeLabelOpacity = useTransform(x, [6, 22], [0, 1]);
  const afterLabelOpacity = useTransform(x, [78, 94], [1, 0]);

  /** Varredura automática que ensina a interação assim que a seção aparece. */
  const playDemo = useCallback(() => {
    demoRef.current?.stop();
    demoRef.current = animate(x, [50, 88, 14, 50], {
      duration: 3.6,
      times: [0, 0.34, 0.72, 1],
      ease: EASE,
      onComplete: () => setAriaValue(50),
    });
  }, [x]);

  useEffect(() => {
    if (isInView && !hasInteracted) playDemo();
    return () => demoRef.current?.stop();
  }, [isInView, hasInteracted, playDemo]);

  const stopDemo = useCallback(() => {
    demoRef.current?.stop();
    setHasInteracted(true);
  }, []);

  /* --------------------------- arraste --------------------------- */
  const setFromClientX = useCallback(
    (clientX: number) => {
      const rect = frameRef.current?.getBoundingClientRect();
      if (!rect || rect.width === 0) return;
      x.set(clamp(((clientX - rect.left) / rect.width) * 100));
    },
    [x]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    stopDemo();
    setIsDragging(true);
    setFromClientX(e.clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: PointerEvent) => {
      e.preventDefault();
      setFromClientX(e.clientX);
    };
    const onUp = () => {
      setIsDragging(false);
      setAriaValue(Math.round(x.get()));
    };

    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [isDragging, setFromClientX, x]);

  /* -------------------------- teclado --------------------------- */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    let next: number | null = null;

    if (e.key === 'ArrowLeft') next = x.get() - step;
    else if (e.key === 'ArrowRight') next = x.get() + step;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = 100;

    if (next === null) return;
    e.preventDefault();
    stopDemo();
    const value = clamp(next);
    x.set(value);
    setAriaValue(Math.round(value));
  };

  /* ---------------------- troca de caso ------------------------- */
  const goToCase = (i: number) => {
    const total = BEFORE_AFTER.length;
    setCaseIndex((i + total) % total);
    stopDemo();
    animate(x, 50, { duration: 0.7, ease: EASE });
    setAriaValue(50);
  };

  return (
    <section
      id="resultados"
      className="relative py-24 md:py-32 bg-pine text-paper overflow-hidden grain"
    >
      <div className="absolute inset-0 dot-grid-invert opacity-50 pointer-events-none" />
      <div className="halo halo-jade w-[42rem] h-[42rem] top-0 -left-52 opacity-45" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14 md:mb-16">
          <SectionHeading
            invert
            index="05"
            eyebrow="Resultados"
            title={
              <>
                Arraste e veja a{' '}
                <span className="italic">
                  <Mark invert delay={0.5}>
                    transformação
                  </Mark>
                </span>
              </>
            }
            description="Casos reais de pacientes Glowin. Mova o divisor para comparar — ou use as setas do teclado."
          />

          {/* Navegação de casos */}
          <div className="flex items-center gap-4 shrink-0">
            <span className="label-num text-paper/45">
              {String(caseIndex + 1).padStart(2, '0')}
              <span className="text-paper/25"> / {String(BEFORE_AFTER.length).padStart(2, '0')}</span>
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => goToCase(caseIndex - 1)}
                aria-label="Caso anterior"
                className="w-11 h-11 rounded-full border border-paper/20 text-paper flex items-center justify-center transition-all duration-400 hover:bg-paper hover:text-pine"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => goToCase(caseIndex + 1)}
                aria-label="Próximo caso"
                className="w-11 h-11 rounded-full border border-paper/20 text-paper flex items-center justify-center transition-all duration-400 hover:bg-paper hover:text-pine"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* =============== COMPARADOR =============== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.9, ease: EASE }}
          className="grid lg:grid-cols-[1.55fr_1fr] gap-8 lg:gap-12 items-start"
        >
          {/* --- Quadro --- */}
          <div
            ref={frameRef}
            role="slider"
            tabIndex={0}
            aria-label={`Comparação antes e depois — ${active.title}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={ariaValue}
            aria-valuetext={`${ariaValue}% do antes visível`}
            onPointerDown={handlePointerDown}
            onKeyDown={handleKeyDown}
            className={cn(
              // `touch-pan-y`: o gesto horizontal é nosso, o vertical continua rolando a página
              'relative w-full aspect-[4/5] sm:aspect-[16/12] arch-soft overflow-hidden bg-pine-2 select-none touch-pan-y',
              'outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-4 focus-visible:ring-offset-pine',
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="absolute inset-0"
              >
                {/* Camada base: DEPOIS */}
                <Image
                  src={active.afterImage}
                  alt={`Depois — ${active.title}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55rem"
                  className="object-cover photo-warm"
                  priority={caseIndex === 0}
                  draggable={false}
                />

                {/* Camada superior: ANTES, recortada até o divisor */}
                <motion.div
                  style={{ clipPath: clipBefore, WebkitClipPath: clipBefore }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.beforeImage}
                    alt={`Antes — ${active.title}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55rem"
                    className="object-cover photo-warm"
                    draggable={false}
                  />
                  {/* Dessaturação sutil no "antes" reforça a leitura da evolução */}
                  <div className="absolute inset-0 bg-pine/30 mix-blend-color" />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Etiquetas na base: no topo o arco as recortaria.
                A métrica não aparece aqui — ela já consta na ficha ao lado. */}
            <motion.span
              style={{ opacity: beforeLabelOpacity }}
              className="absolute bottom-5 left-5 label text-[0.52rem] px-3.5 py-2 rounded-full bg-pine/70 backdrop-blur-md text-paper/85 pointer-events-none"
            >
              Antes
            </motion.span>

            <motion.span
              style={{ opacity: afterLabelOpacity }}
              className="absolute bottom-5 right-5 label text-[0.52rem] px-3.5 py-2 rounded-full bg-clay text-paper pointer-events-none"
            >
              Depois
            </motion.span>

            {/* Divisor + punho */}
            <motion.div
              style={{ left: handleLeft }}
              className="absolute top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none z-20"
            >
              <div className="ba-seam absolute inset-0 w-[2px] -translate-x-1/2 left-1/2" />

              <div
                className={cn(
                  'ba-handle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                  'w-14 h-14 rounded-full bg-paper text-pine',
                  'flex items-center justify-center transition-transform duration-300',
                  isDragging ? 'scale-110' : 'scale-100'
                )}
              >
                <MoveHorizontal className="w-5 h-5" strokeWidth={1.5} />
              </div>

              {/* Dica de arraste — some após a primeira interação */}
              <AnimatePresence>
                {!hasInteracted && (
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                    className="label absolute top-1/2 left-1/2 -translate-x-1/2 mt-11 whitespace-nowrap text-[0.5rem] text-paper/70"
                  >
                    arraste
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* --- Ficha do caso --- */}
          <div className="lg:pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <h3 className="font-display text-[2.2rem] md:text-[2.6rem] leading-[1.05] text-paper mb-4">
                  {active.title}
                </h3>
                <p className="text-[0.98rem] leading-[1.7] text-paper/55 mb-8">
                  {active.description}
                </p>

                <dl className="border-t border-paper/15">
                  {[
                    { icon: Repeat2, term: 'Sessões', value: active.sessions },
                    { icon: CalendarDays, term: 'Prazo', value: active.interval },
                    { icon: TrendingUp, term: 'Ganho', value: active.metric },
                  ].map((row) => (
                    <div
                      key={row.term}
                      className="flex items-center justify-between gap-4 py-4 border-b border-paper/15"
                    >
                      <dt className="flex items-center gap-3 label text-[0.54rem] text-paper/45">
                        <row.icon className="w-3.5 h-3.5 text-clay-light" strokeWidth={1.5} />
                        {row.term}
                      </dt>
                      <dd className="text-[0.92rem] text-paper/90 text-right">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <button
                  onClick={() => {
                    setHasInteracted(false);
                    playDemo();
                  }}
                  className="btn btn-outline-invert mt-7 px-6 py-3"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Reproduzir comparação</span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* =============== MINIATURAS =============== */}
        <div className="mt-12">
          <div className="no-scrollbar flex gap-3 overflow-x-auto snap-x pb-2">
            {BEFORE_AFTER.map((item, i) => (
              <button
                key={item.id}
                onClick={() => goToCase(i)}
                aria-label={`Ver caso ${item.title}`}
                aria-current={i === caseIndex}
                className={cn(
                  'group relative shrink-0 snap-start w-36 sm:w-48 overflow-hidden transition-all duration-500',
                  i === caseIndex ? 'opacity-100' : 'opacity-45 hover:opacity-80'
                )}
              >
                <div className="relative aspect-[4/3] arch-down overflow-hidden bg-pine-2">
                  <Image
                    src={item.afterImage}
                    alt=""
                    fill
                    sizes="12rem"
                    className="object-cover photo-warm transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <span className="flex items-baseline gap-2 mt-2.5 text-left">
                  <span className="label-num text-[0.58rem] text-clay-light">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[0.78rem] leading-snug text-paper/80">
                    {item.title}
                  </span>
                </span>

                {i === caseIndex && (
                  <motion.span
                    layoutId="thumb-active"
                    className="absolute top-0 left-0 right-0 h-[2px] bg-clay z-10"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* =============== CHAMADA =============== */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="mt-16 pt-10 border-t border-paper/15 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <p className="font-display text-[1.6rem] md:text-[2.1rem] leading-tight text-paper text-center sm:text-left max-w-lg">
            O próximo antes e depois pode ser o seu.
          </p>
          <a
            href={CONTACT.WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-clay px-8 py-4 shrink-0"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Quero minha avaliação</span>
          </a>
        </motion.div>

        <p className="mt-8 text-[0.72rem] leading-relaxed text-paper/25 max-w-2xl">
          Imagens ilustrativas. Resultados variam conforme características
          individuais, adesão ao protocolo e número de sessões realizadas.
        </p>
      </div>
    </section>
  );
};
