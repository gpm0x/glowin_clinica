'use client';

import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_ITEMS } from '@/utils/data';
import { CONTACT } from '@/utils/constants';
import { fadeInUp, staggerContainer, EASE, VIEWPORT } from '@/utils/animations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Mark } from '@/components/ui/Mark';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { cn } from '@/utils/cn';

export const FAQ: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32 bg-paper-2 overflow-hidden grain">
      <div className="halo w-[30rem] h-[30rem] bottom-0 -left-32 opacity-70" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-14 lg:gap-20 items-start">
          {/* Coluna fixa à esquerda */}
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              index="07"
              eyebrow="Perguntas frequentes"
              title={
                <>
                  Tire suas{' '}
                  <span className="italic">
                    <Mark delay={0.5}>dúvidas</Mark>
                  </span>
                </>
              }
              description="Transparência antes, durante e depois. Se a sua pergunta não estiver aqui, é só chamar no WhatsApp."
            />

            <motion.a
              href={CONTACT.WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              className="btn btn-outline mt-9 px-7 py-3.5"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>Falar com a equipe</span>
            </motion.a>
          </div>

          {/* Acordeão */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex flex-col"
          >
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  className="relative border-t border-pine/15 last:border-b"
                >
                  {/* Régua terracota que marca o item aberto */}
                  <motion.span
                    initial={false}
                    animate={{ scaleX: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    style={{ transformOrigin: 'left center' }}
                    className="absolute -top-px left-0 right-0 h-px bg-clay"
                  />

                  <h3>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="group w-full flex items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className="flex items-start gap-5">
                        <span
                          className={cn(
                            'label-num pt-2 transition-colors duration-300',
                            isOpen ? 'text-clay' : 'text-stone/45'
                          )}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={cn(
                            'font-display text-[1.35rem] md:text-[1.6rem] leading-snug transition-colors duration-300',
                            isOpen ? 'text-clay' : 'text-pine group-hover:text-clay'
                          )}
                        >
                          {item.question}
                        </span>
                      </span>

                      {/* Sinal de mais desenhado com duas réguas — a vertical some ao abrir */}
                      <span
                        className={cn(
                          'relative shrink-0 mt-1.5 w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-400',
                          isOpen
                            ? 'border-clay bg-clay text-paper'
                            : 'border-pine/20 text-pine group-hover:border-clay'
                        )}
                      >
                        <span className="block w-3.5 h-px bg-current" />
                        <motion.span
                          animate={{ scaleY: isOpen ? 0 : 1 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="absolute block h-3.5 w-px bg-current"
                        />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="pl-11 pr-4 md:pr-16 pb-8 text-[0.97rem] leading-[1.75] text-stone">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
