import { Variants } from 'framer-motion';

/** Curva "expo-out" usada em todo o site — saída rápida, chegada macia. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Curva de entrada/saída para movimentos contínuos (loops, oscilações). */
export const EASE_SOFT = [0.45, 0, 0.25, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.055 } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -44 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 44 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

/**
 * Cortina: o conteúdo sobe de trás de uma máscara `overflow-hidden`.
 * Use no elemento interno; o pai precisa recortar.
 */
export const curtainUp: Variants = {
  hidden: { y: '112%' },
  visible: { y: '0%', transition: { duration: 0.95, ease: EASE } },
};

/**
 * Obturador: a imagem é revelada por um `clip-path` que abre de baixo
 * para cima enquanto a própria foto relaxa de uma escala maior.
 * Dá a sensação de fotografia sendo revelada, não de um simples fade.
 */
export const shutter: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.12 },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    transition: { duration: 1.25, ease: EASE },
  },
};

/** Traço horizontal que se desenha (réguas, sublinhados, marcadores). */
export const drawRule: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1, ease: EASE } },
};

/** Traço vertical, para as linhas do tempo do método. */
export const drawRuleY: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.1, ease: EASE } },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.86 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

export const floatWhatsApp: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.45, ease: EASE } },
};

/** Margem padrão de entrada em viewport para `whileInView`. */
export const VIEWPORT = { once: true, margin: '-90px' } as const;

/** Variante mais permissiva, para blocos altos que entram devagar. */
export const VIEWPORT_SOON = { once: true, margin: '-40px' } as const;

/**
 * Escrita à mão: o traço é revelado da esquerda para a direita por um
 * `clip-path`, como se estivesse sendo escrito naquele instante.
 * Usado na assinatura da fundadora.
 */
export const writeOn: Variants = {
  hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.5, ease: EASE_SOFT, delay: 0.25 },
  },
};
