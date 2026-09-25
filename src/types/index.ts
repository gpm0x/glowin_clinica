export interface Service {
  id: string;
  title: string;
  description: string;
  /** Nome do ícone lucide-react resolvido em Services.tsx */
  icon: string;
  duration: string;
  /** Imagem de apoio exibida no preview que segue o cursor */
  image: string;
  highlighted?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  procedure: string;
  quote: string;
  rating: number;
  /** Cidade/bairro — dá lastro ao depoimento */
  location: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BeforeAfter {
  id: string;
  beforeImage: string;
  afterImage: string;
  /** Nome do procedimento — título do caso */
  title: string;
  /** Linha de apoio exibida sob o título */
  description: string;
  sessions: string;
  interval: string;
  /** Ganho principal medido/percebido, ex. "+40% volume" */
  metric: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

/** Etapa do método Glowin — a jornada da paciente, do contato ao pós. */
export interface ProcessStep {
  id: string;
  step: string;
  title: string;
  description: string;
  duration: string;
  icon: string;
}

/** Marco da trajetória da fundadora — ano + fato, exibido como linha do tempo. */
export interface FounderMilestone {
  year: string;
  title: string;
  description: string;
}

/** Perfil da fundadora da clínica. */
export interface Founder {
  name: string;
  role: string;
  /** Registro profissional — dá lastro legal ao perfil */
  registry: string;
  portrait: string;
  /** Parágrafo de abertura, em tom editorial */
  lead: string;
  /** Segundo parágrafo, mais pessoal */
  body: string;
  /** Frase de assinatura, exibida como citação em destaque */
  quote: string;
  /** Formação e titulações, em lista curta */
  credentials: string[];
  milestones: FounderMilestone[];
}
