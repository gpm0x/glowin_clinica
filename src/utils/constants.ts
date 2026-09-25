export const CONTACT = {
  WHATSAPP_NUMBER: '5511954822638',
  WHATSAPP_DISPLAY: '+55 11 95482-2638',
  WHATSAPP_URL:
    'https://wa.me/5511954822638?text=Ol%C3%A1%20Glowin!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20gratuita.',
  INSTAGRAM_HANDLE: '@glowin_clinica',
  INSTAGRAM_URL: 'https://instagram.com/glowin_clinica',
  EMAIL: 'contato@glowin.com.br',
} as const;

export const CLINIC = {
  NAME: 'Glowin Clínica',
  CITY: 'São Paulo',
  STATE: 'SP',
  NOTE: 'Atendimento mediante agendamento',
  FOUNDED: 2013,
} as const;

/**
 * Paleta "Ateliê". O verde do WhatsApp fica reservado ao botão flutuante —
 * no resto da página as ações usam tinta (pinho) e terracota, que convivem
 * melhor com o papel sem competir entre si.
 */
export const COLORS = {
  PAPER: '#f4f1e8',
  PINE: '#13211c',
  JADE: '#2e6b57',
  CLAY: '#bf5a33',
  WHATSAPP: '#0ca30c',
} as const;

export const HOURS = [
  { day: 'Segunda a sexta', time: '09:00 — 19:00' },
  { day: 'Sábado', time: '09:00 — 14:00' },
  { day: 'Domingo', time: 'Fechado' },
] as const;
