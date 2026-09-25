'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ArrowUp } from 'lucide-react';
import { CONTACT, CLINIC, HOURS } from '@/utils/constants';
import { fadeInUp, staggerContainer, VIEWPORT, EASE } from '@/utils/animations';
import { GlowinMark, InstagramIcon, WhatsAppIcon } from '@/components/ui/Icons';

const quickLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Método', href: '#metodo' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' },
];

export const Footer: FC = () => (
  <footer className="relative bg-pine text-paper pt-20 pb-8 overflow-hidden grain">
    <div className="absolute inset-0 dot-grid-invert opacity-40 pointer-events-none" />
    <div className="halo halo-jade w-[32rem] h-[32rem] -bottom-44 left-1/4 opacity-40" />

    <div className="container mx-auto px-5 md:px-8 relative z-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_1.1fr_1fr] gap-12 lg:gap-10 pb-16 border-b border-paper/15"
      >
        {/* Marca */}
        <motion.div variants={fadeInUp}>
          <a href="#inicio" className="flex items-center gap-3 mb-6 group w-fit">
            <GlowinMark className="w-6 h-7 text-paper transition-transform duration-700 group-hover:-translate-y-0.5" />
            <span className="font-display text-[1.6rem] leading-none text-paper">Glowin</span>
          </a>

          <p className="text-[0.95rem] leading-[1.7] text-paper/50 mb-8 max-w-xs">
            Clínica de estética avançada em {CLINIC.CITY}. Protocolos
            personalizados, diagnóstico fotográfico e acompanhamento próximo —
            do primeiro contato ao último retorno.
          </p>

          <div className="flex gap-2.5">
            <a
              href={CONTACT.INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Glowin"
              className="w-11 h-11 rounded-full border border-paper/20 text-paper flex items-center justify-center transition-all duration-400 hover:bg-paper hover:text-pine"
            >
              <InstagramIcon className="w-[1.1rem] h-[1.1rem]" />
            </a>
            <a
              href={CONTACT.WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp da Glowin"
              className="w-11 h-11 rounded-full border border-paper/20 text-paper flex items-center justify-center transition-all duration-400 hover:bg-paper hover:text-pine"
            >
              <WhatsAppIcon className="w-[1.1rem] h-[1.1rem]" />
            </a>
          </div>
        </motion.div>

        {/* Navegação */}
        <motion.nav variants={fadeInUp} aria-label="Rodapé">
          <h2 className="label text-[0.55rem] text-clay-light mb-7">Navegação</h2>
          <ul className="flex flex-col gap-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group inline-flex items-center gap-2.5 text-[0.95rem] text-paper/55 hover:text-paper transition-colors duration-300"
                >
                  <span className="w-0 h-px bg-clay-light transition-all duration-400 group-hover:w-4" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>

        {/* Contato */}
        <motion.div variants={fadeInUp}>
          <h2 className="label text-[0.55rem] text-clay-light mb-7">Contato</h2>
          <ul className="flex flex-col gap-4">
            <li>
              <a
                href={`tel:+${CONTACT.WHATSAPP_NUMBER}`}
                className="flex items-start gap-3 text-[0.95rem] text-paper/55 hover:text-paper transition-colors"
              >
                <Phone className="w-4 h-4 text-clay-light shrink-0 mt-1" strokeWidth={1.5} />
                <span>{CONTACT.WHATSAPP_DISPLAY}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.EMAIL}`}
                className="flex items-start gap-3 text-[0.95rem] text-paper/55 hover:text-paper transition-colors"
              >
                <Mail className="w-4 h-4 text-clay-light shrink-0 mt-1" strokeWidth={1.5} />
                <span>{CONTACT.EMAIL}</span>
              </a>
            </li>
            <li className="flex items-start gap-3 text-[0.95rem] text-paper/55">
              <MapPin className="w-4 h-4 text-clay-light shrink-0 mt-1" strokeWidth={1.5} />
              <span>
                {CLINIC.CITY}, {CLINIC.STATE}
                <br />
                <span className="text-paper/30 text-[0.85rem]">{CLINIC.NOTE}</span>
              </span>
            </li>
          </ul>
        </motion.div>

        {/* Horários */}
        <motion.div variants={fadeInUp}>
          <h2 className="label text-[0.55rem] text-clay-light mb-7">Horários</h2>
          <ul className="flex flex-col">
            {HOURS.map((hour) => (
              <li
                key={hour.day}
                className="flex justify-between items-baseline gap-4 border-b border-paper/12 py-3 last:border-0"
              >
                <span className="text-[0.92rem] text-paper/50">{hour.day}</span>
                <span
                  className={
                    hour.time === 'Fechado'
                      ? 'label text-[0.52rem] text-paper/25'
                      : 'label text-[0.52rem] text-paper/85'
                  }
                >
                  {hour.time}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Rodapé inferior */}
      <div className="pt-7 flex flex-col md:flex-row justify-between items-center gap-5 label text-[0.52rem] text-paper/35">
        <p>© {new Date().getFullYear()} {CLINIC.NAME} · Todos os direitos reservados</p>

        <a
          href="#inicio"
          className="group flex items-center gap-3 hover:text-paper transition-colors"
        >
          Voltar ao topo
          <span className="w-8 h-8 rounded-full border border-paper/20 flex items-center justify-center transition-all duration-400 group-hover:bg-paper group-hover:text-pine group-hover:-translate-y-1">
            <ArrowUp className="w-3.5 h-3.5" />
          </span>
        </a>
      </div>
    </div>

    {/* Assinatura tipográfica gigante — sobe ao entrar em tela */}
    <div className="relative overflow-hidden mt-14" aria-hidden>
      <motion.div
        initial={{ y: '30%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 1.2, ease: EASE }}
        className="select-none pointer-events-none text-center font-display leading-[0.78] text-paper/[0.07] text-[23vw] tracking-tight"
      >
        GLOWIN
      </motion.div>
    </div>
  </footer>
);
