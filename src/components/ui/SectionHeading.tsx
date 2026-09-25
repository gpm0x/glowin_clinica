'use client';

import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE, VIEWPORT, curtainUp, drawRule } from '@/utils/animations';
import { cn } from '@/utils/cn';

interface Props {
  /** Número da seção, exibido como índice editorial (ex.: "02"). */
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  invert?: boolean;
  className?: string;
}

/**
 * Cabeçalho de seção no formato de página de revista: uma régua horizontal
 * carimbada com índice + rótulo, e o título subindo de trás de uma máscara.
 */
export const SectionHeading: FC<Props> = ({
  index,
  eyebrow,
  title,
  description,
  align = 'left',
  invert = false,
  className,
}) => {
  const centered = align === 'center';

  return (
    <div
      className={cn(
        'flex flex-col',
        centered ? 'items-center text-center mx-auto max-w-3xl' : 'items-start text-left',
        className
      )}
    >
      {/* Régua de índice */}
      <div
        className={cn(
          'flex items-center gap-4 w-full mb-7',
          centered && 'justify-center'
        )}
      >
        {index && (
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5, ease: EASE }}
            className={cn('label-num', invert ? 'text-clay-light' : 'text-clay')}
          >
            {index}
          </motion.span>
        )}

        <motion.span
          variants={drawRule}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          style={{ transformOrigin: 'left center' }}
          className={cn(
            'h-px flex-none w-10 sm:w-16',
            invert ? 'bg-paper/30' : 'bg-pine/25'
          )}
        />

        <motion.span
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
          className={cn('label', invert ? 'text-paper/60' : 'text-stone')}
        >
          {eyebrow}
        </motion.span>
      </div>

      {/* Máscara de cortina: o título sobe de baixo do overflow.
          O gatilho `whileInView` fica na máscara, não no título: deslocado em
          112% o título está inteiramente recortado, e um elemento totalmente
          recortado por um ancestral nunca é considerado visível pelo
          IntersectionObserver — a animação jamais dispararia. */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="overflow-hidden pb-[0.16em]"
      >
        <motion.h2
          variants={curtainUp}
          className={cn(
            'font-display text-[2.5rem] leading-[0.98] sm:text-[3.4rem] md:text-[4rem] max-w-4xl',
            invert ? 'text-paper' : 'text-pine'
          )}
        >
          {title}
        </motion.h2>
      </motion.div>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASE, delay: 0.24 }}
          className={cn(
            'mt-6 text-[1.05rem] leading-[1.65] max-w-xl',
            invert ? 'text-paper/60' : 'text-stone'
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};
