'use client';

import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE } from '@/utils/animations';
import { cn } from '@/utils/cn';

interface Props {
  children: ReactNode;
  /** Atraso da varredura, em segundos. */
  delay?: number;
  /** `true` quando o texto está sobre fundo escuro. */
  invert?: boolean;
  className?: string;
}

/**
 * Marcador de texto: uma faixa terracota que varre a palavra da esquerda para
 * a direita quando entra em tela. Usa `mix-blend-mode: multiply` para se
 * comportar como caneta marca-texto de verdade — o texto continua legível
 * por baixo em vez de ser coberto.
 *
 * O gatilho é herdado, não próprio: o marcador vive dentro da máscara de
 * cortina do `SectionHeading`, onde o texto começa totalmente recortado. Um
 * elemento recortado por completo nunca conta como visível para o
 * IntersectionObserver, então um `whileInView` local jamais dispararia. Ao
 * declarar apenas `variants`, o marcador segue os rótulos "hidden"/"visible"
 * do ancestral animado — que não é recortado.
 */
export const Mark: FC<Props> = ({ children, delay = 0.5, invert = false, className }) => (
  <span className={cn('relative inline-block', className)}>
    <span className="relative z-10">{children}</span>
    <motion.span
      aria-hidden
      variants={{
        hidden: { scaleX: 0 },
        visible: {
          scaleX: 1,
          transition: { duration: 0.9, ease: EASE, delay },
        },
      }}
      style={{ transformOrigin: 'left center' }}
      className={cn(
        'absolute left-[-0.08em] right-[-0.08em] bottom-[0.1em] h-[0.34em] z-0',
        invert
          ? 'bg-clay-light/70 mix-blend-screen'
          : 'bg-clay/30 mix-blend-multiply'
      )}
    />
  </span>
);
