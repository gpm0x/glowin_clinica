import { FC } from 'react';
import { MARQUEE_ITEMS } from '@/utils/data';

/**
 * Faixa infinita de procedimentos, em tinta sólida — funciona como o respiro
 * escuro entre o herói claro e o método. O trilho é duplicado e transladado
 * -50% para que o laço seja imperceptível.
 */
export const Marquee: FC = () => {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative bg-pine text-paper py-5 overflow-hidden select-none grain">
      <div className="marquee-track">
        {items.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center shrink-0">
            <span className="font-display text-[1.15rem] md:text-[1.5rem] text-paper/85 px-6 whitespace-nowrap">
              {item}
            </span>
            <span
              className="w-1 h-1 rounded-full bg-clay-light shrink-0"
              aria-hidden
            />
          </div>
        ))}
      </div>

      {/* Esmaecimento nas bordas */}
      <div className="absolute inset-y-0 left-0 w-20 md:w-36 bg-gradient-to-r from-pine to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-36 bg-gradient-to-l from-pine to-transparent pointer-events-none" />
    </div>
  );
};
