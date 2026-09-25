'use client';

import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { CONTACT } from '@/utils/constants';
import { EASE } from '@/utils/animations';
import { GlowinMark, InstagramIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { cn } from '@/utils/cn';

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Fundadora', href: '#fundadora' },
  { label: 'Método', href: '#metodo' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' },
];

export const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trava o scroll do body enquanto o menu mobile estiver aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-paper/85 backdrop-blur-xl border-b border-pine/12 py-3'
            : 'bg-transparent py-6'
        )}
      >
        <div className="container mx-auto px-5 md:px-8 flex items-center justify-between gap-6">
          {/* Marca */}
          <a href="#inicio" className="flex items-center gap-3 group shrink-0">
            <GlowinMark className="w-6 h-7 text-pine transition-transform duration-700 group-hover:-translate-y-0.5" />
            <span className="font-display text-[1.6rem] leading-none tracking-tight text-pine">
              Glowin
            </span>
            <span className="hidden sm:block label text-[0.54rem] text-stone/70 border-l border-pine/15 pl-3 leading-[1.5]">
              Clínica
              <br />
              São Paulo
            </span>
          </a>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="link-rule label text-[0.6rem] text-pine/70 hover:text-clay transition-colors duration-300 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Ações desktop */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a
              href={CONTACT.INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Glowin"
              className="text-pine/55 hover:text-clay transition-colors duration-300"
            >
              <InstagramIcon className="w-[1.1rem] h-[1.1rem]" />
            </a>
            <a
              href={CONTACT.WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ink px-6 py-3"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>Agendar</span>
            </a>
          </div>

          {/* Toggle mobile — duas barras que viram um X */}
          <button
            className="lg:hidden relative w-9 h-9 -mr-1 flex flex-col items-center justify-center gap-[6px]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className={cn('block h-px w-6', menuOpen ? 'bg-paper' : 'bg-pine')}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className={cn('block h-px w-6', menuOpen ? 'bg-paper' : 'bg-pine')}
            />
          </button>
        </div>

        {/* Barra de progresso de leitura */}
        <motion.div
          style={{ scaleX: progress }}
          className={cn(
            'scroll-progress absolute bottom-0 left-0 right-0 h-[2px] transition-opacity duration-500',
            isScrolled ? 'opacity-100' : 'opacity-0'
          )}
        />
      </motion.header>

      {/* Overlay mobile: cortina de tinta que desce */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-40 lg:hidden bg-pine grain flex flex-col justify-center px-7"
          >
            <div className="halo halo-jade w-[24rem] h-[24rem] -top-24 -right-28 opacity-50" />
            <div className="absolute inset-0 dot-grid-invert opacity-40 pointer-events-none" />

            <nav className="flex flex-col relative z-10">
              {navLinks.map((link, i) => (
                <div key={link.label} className="overflow-hidden border-b border-paper/10">
                  <motion.a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.75, ease: EASE, delay: 0.18 + i * 0.055 }}
                    className="flex items-baseline gap-4 py-4 font-display text-[2.1rem] leading-none text-paper hover:text-clay-light transition-colors"
                  >
                    <span className="label-num text-[0.6rem] text-clay-light/70">
                      0{i + 1}
                    </span>
                    {link.label}
                  </motion.a>
                </div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
              className="mt-10 flex flex-col gap-3 relative z-10"
            >
              <a
                href={CONTACT.WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-paper w-full py-4"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Avaliação gratuita</span>
              </a>
              <a
                href={CONTACT.INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-invert w-full py-4"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>{CONTACT.INSTAGRAM_HANDLE}</span>
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.62 }}
              className="label text-[0.55rem] text-paper/35 mt-10 relative z-10"
            >
              Seg a sex · 09h — 19h · São Paulo
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
