'use client';

import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { CONTACT } from '@/utils/constants';
import { EASE, floatWhatsApp } from '@/utils/animations';
import { WhatsAppIcon } from '@/components/ui/Icons';

/**
 * Único ponto da página onde o verde de marca do WhatsApp aparece — mantê-lo
 * exclusivo aqui o torna imediatamente reconhecível, sem competir com a
 * paleta terracota/pinho do restante do site.
 */
export const FloatingWhatsApp: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 340);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // A tarja some sozinha para não competir com o conteúdo
    const badgeTimer = setTimeout(() => setShowBadge(false), 7000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(badgeTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={floatWhatsApp}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed bottom-6 right-5 sm:right-6 z-50 flex items-center gap-3"
        >
          <AnimatePresence>
            {showBadge && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 14, scale: 0.92 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex items-center gap-3 bg-paper border border-pine/15 pl-5 pr-3 py-2.5 rounded-full shadow-[0_18px_44px_-20px_rgba(19,33,28,0.7)]"
              >
                <span className="text-[0.8rem] text-pine whitespace-nowrap">
                  Avaliação <span className="text-clay">gratuita</span>. Vamos conversar?
                </span>
                <button
                  onClick={() => setShowBadge(false)}
                  aria-label="Fechar mensagem"
                  className="text-stone/50 hover:text-pine transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={CONTACT.WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            className="relative w-14 h-14 rounded-full bg-whats text-white flex items-center justify-center shadow-[0_12px_34px_-10px_rgba(12,163,12,0.85)] transition-transform duration-300 hover:scale-110 active:scale-95"
          >
            <span className="absolute inset-0 rounded-full bg-whats opacity-35 animate-ping" />
            <WhatsAppIcon className="w-7 h-7 relative z-10" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
