import { FC, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

export const InstagramIcon: FC<IconProps> = ({ className, ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
    {...rest}
  >
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none" />
  </svg>
);

/** Glifo oficial do WhatsApp (preenchido) — mais reconhecível que um balão genérico. */
export const WhatsAppIcon: FC<IconProps> = ({ className, ...rest }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden {...rest}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
    <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2.1 22l5.35-1.37a9.83 9.83 0 0 0 4.59 1.15h.01c5.43 0 9.85-4.42 9.85-9.86 0-2.63-1.02-5.11-2.88-6.97A9.79 9.79 0 0 0 12.04 2zm0 1.86c2.14 0 4.15.83 5.66 2.35a7.94 7.94 0 0 1 2.35 5.65c0 4.42-3.6 8.01-8.02 8.01a8 8 0 0 1-4.07-1.11l-.29-.17-3.03.77.81-2.95-.19-.3a7.94 7.94 0 0 1-1.22-4.25c0-4.41 3.6-8 8-8z" />
  </svg>
);

/**
 * Monograma Glowin: um arco — a mesma forma que recorta as fotos do site —
 * com um "G" implícito no vazio interno e uma semente terracota no centro.
 */
export const GlowinMark: FC<IconProps> = ({ className, ...rest }) => (
  <svg viewBox="0 0 40 44" fill="none" className={className} aria-hidden {...rest}>
    {/* Arco externo */}
    <path
      d="M2 42V20a18 18 0 0 1 36 0v22"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
    />
    {/* Arco interno, deslocado — cria a leitura de "G" */}
    <path
      d="M10.5 42V20.5a9.5 9.5 0 0 1 19 0V42h-9.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="square"
      opacity="0.45"
    />
    {/* Semente central */}
    <ellipse cx="20" cy="20.5" rx="3.1" ry="4.4" fill="var(--clay)" />
  </svg>
);

/** Selo circular com texto em arco, usado como carimbo decorativo. */
export const SealBadge: FC<IconProps> = ({ className, ...rest }) => (
  <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden {...rest}>
    <defs>
      <path id="seal-path" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" />
    </defs>
    <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
    <circle cx="60" cy="60" r="48" stroke="currentColor" strokeWidth="0.6" opacity="0.22" />
    <text fill="currentColor" fontSize="8.6" letterSpacing="4.4" fontFamily="var(--font-mono)">
      <textPath href="#seal-path" startOffset="0%">
        GLOWIN CLÍNICA · SÃO PAULO · ESTÉTICA DE RESULTADO ·
      </textPath>
    </text>
  </svg>
);

/**
 * Arco decorativo com linhas concêntricas — usado como ornamento estrutural
 * atrás de títulos e no rodapé. Pura textura, sem semântica.
 */
export const ArchOrnament: FC<IconProps> = ({ className, ...rest }) => (
  <svg viewBox="0 0 200 130" fill="none" className={className} aria-hidden {...rest}>
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <path
        key={i}
        d={`M${10 + i * 14} 130V${75 - i * 4}a${90 - i * 14} ${70 - i * 10} 0 0 1 ${
          (90 - i * 14) * 2
        } 0V130`}
        stroke="currentColor"
        strokeWidth="1"
        opacity={0.9 - i * 0.13}
      />
    ))}
  </svg>
);

/**
 * Assinatura manuscrita da fundadora — traçado único, pensado para ser
 * "escrito" com `pathLength` pelo componente que o usa. Por isso os atributos
 * de animação ficam de fora: quem chama decide se anima e quando.
 *
 * As duas letras (M e B) são um monograma estilizado, não uma assinatura real;
 * troque o `d` por um traçado vetorizado da assinatura verdadeira quando tiver.
 */
export const SignatureMark: FC<IconProps & { pathClassName?: string }> = ({
  className,
  pathClassName,
  ...rest
}) => (
  <svg viewBox="0 0 260 90" fill="none" className={className} aria-hidden {...rest}>
    <path
      className={pathClassName}
      d="M12 70C18 44 24 22 28 20c4-2 5 12 8 26 3 13 6 20 10 18 4-2 7-16 11-30 4-15 7-24 10-22 3 2 3 20 4 34 1 12 3 18 7 16"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      className={pathClassName}
      d="M96 74c14-38 22-58 27-58 6 0 7 8 3 15-4 8-13 13-22 14 11 0 20 3 23 9 3 7-3 15-13 17-7 1-13-1-16-6"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      className={pathClassName}
      d="M150 66c26-6 52-11 78-13 10-1 17 1 20 4 3 4-1 8-9 9"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.75"
    />
  </svg>
);
