import {
  Service,
  Testimonial,
  FAQItem,
  BeforeAfter,
  Stat,
  ProcessStep,
  Founder,
} from '@/types';
import antes1 from '@/assets/antes1.png';
import depois2 from '@/assets/depois2.png';
import antes3 from '@/assets/antes3.png';
import depois4 from '@/assets/depois4.png';
import fundadora from '@/assets/fundadora.png';

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Preenchimento com ácido hialurônico',
    description:
      'Volume e contorno onde o tempo levou. Técnica de baixa dose, aplicada em camadas, para um resultado que ninguém consegue apontar — só percebe.',
    icon: 'Droplets',
    duration: '45 min',
    image:
      'https://images.unsplash.com/photo-1542131597-a4390333d136?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 's2',
    title: 'Toxina botulínica',
    description:
      'Suavização de linhas de expressão preservando o movimento. Mapeamento muscular individual antes de qualquer aplicação.',
    icon: 'Sparkles',
    duration: '30 min',
    image:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 's3',
    title: 'Laser e crioterapia',
    description:
      'Rejuvenescimento tecnológico sem cirurgia. Uniformiza tom, refina textura e reduz manchas com parâmetros ajustados ao seu fototipo.',
    icon: 'Zap',
    duration: '60 min',
    image:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 's4',
    title: 'Bioestimulador de colágeno',
    description:
      'Firmeza construída de dentro para fora. O estímulo é seu; nós apenas damos o start e acompanhamos a curva de resposta.',
    icon: 'Leaf',
    duration: '50 min',
    image:
      'https://images.unsplash.com/photo-1581182800629-7d90925ad072?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 's5',
    title: 'Protocolos customizados',
    description:
      'Combinações desenhadas para o seu rosto, seu tempo e seu orçamento. Nenhum pacote de prateleira sai daqui.',
    icon: 'Gem',
    duration: 'sob medida',
    image:
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 's6',
    title: 'Avaliação gratuita',
    description:
      'Quarenta minutos de escuta, análise de pele e um plano por escrito. Sem custo, sem compromisso, sem venda de pacote na primeira visita.',
    icon: 'HeartHandshake',
    duration: '40 min',
    image:
      'https://images.unsplash.com/photo-1555820585-c5ae44394b79?auto=format&fit=crop&q=80&w=800',
    highlighted: true,
  },
];

export const PROCESS: ProcessStep[] = [
  {
    id: 'p1',
    step: '01',
    title: 'Conversa',
    description:
      'Antes de olhar a sua pele, escutamos o que te incomoda e o que você não quer mudar de jeito nenhum.',
    duration: '15 min',
    icon: 'MessageCircle',
  },
  {
    id: 'p2',
    step: '02',
    title: 'Diagnóstico',
    description:
      'Análise de pele com registro fotográfico padronizado. É esse ponto de partida que torna o resultado mensurável.',
    duration: '25 min',
    icon: 'ScanFace',
  },
  {
    id: 'p3',
    step: '03',
    title: 'Protocolo',
    description:
      'Você recebe o plano por escrito: procedimentos, número de sessões, intervalos, valores e o que esperar de cada etapa.',
    duration: 'no mesmo dia',
    icon: 'ClipboardList',
  },
  {
    id: 'p4',
    step: '04',
    title: 'Acompanhamento',
    description:
      'Retorno agendado, canal direto no WhatsApp por 24h após cada sessão e nova foto comparativa a cada marco do plano.',
    duration: 'contínuo',
    icon: 'HeartPulse',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Marina L.',
    procedure: 'Preenchimento facial',
    location: 'Pinheiros',
    quote:
      'Ficou natural do jeito que eu queria. Ninguém percebeu que eu fiz — só disseram que eu estava com uma cara boa.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Julia S.',
    procedure: 'Toxina botulínica',
    location: 'Vila Nova Conceição',
    quote:
      'O que me ganhou foi a consulta. Explicaram o que dava e o que não dava para fazer, e me desaconselharam um procedimento que eu queria. Isso é raro.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Amanda R.',
    procedure: 'Laser e peeling',
    location: 'Moema',
    quote:
      'Três sessões e as manchas que eu escondia com base há dez anos praticamente sumiram. Tenho as fotos para comprovar.',
    rating: 5,
  },
  {
    id: 't4',
    name: 'Beatriz M.',
    procedure: 'Protocolo customizado',
    location: 'Itaim Bibi',
    quote:
      'Montaram um plano que cabia no meu bolso e no meu tempo. Nada de empurrar pacote — foi tudo no meu ritmo.',
    rating: 5,
  },
  {
    id: 't5',
    name: 'Carolina F.',
    procedure: 'Bioestimulador',
    location: 'Perdizes',
    quote:
      'O acompanhamento depois é o diferencial. Mandei foto no WhatsApp num domingo e me responderam em vinte minutos.',
    rating: 5,
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'q1',
    question: 'Quanto tempo leva para ver resultados?',
    answer:
      'Depende do procedimento. Toxina botulínica mostra efeito completo entre 10 e 15 dias. Preenchimentos entregam resultado imediato que se acomoda ao longo de 2 a 3 semanas. Já bioestimuladores trabalham por meses, com ganho progressivo de firmeza a partir da sexta semana.',
  },
  {
    id: 'q2',
    question: 'Dói? Existe tempo de recuperação?',
    answer:
      'A grande maioria dos procedimentos tem desconforto mínimo — usamos anestésicos tópicos de alta performance e, quando indicado, bloqueio local. O retorno às atividades costuma ser no mesmo dia; apenas laser ablativo e alguns peelings exigem alguns dias de cuidado redobrado com sol.',
  },
  {
    id: 'q3',
    question: 'Qual é o investimento?',
    answer:
      'O valor depende do protocolo, da quantidade de material e do número de sessões. Por isso não trabalhamos com tabela genérica: na avaliação gratuita você sai com o orçamento fechado por escrito, sem surpresa depois.',
  },
  {
    id: 'q4',
    question: 'Preciso de consulta prévia?',
    answer:
      'Sempre. Nenhum procedimento é realizado sem avaliação presencial da sua pele, do seu histórico de saúde e das suas expectativas. Essa consulta é gratuita e não gera obrigação de contratar nada.',
  },
  {
    id: 'q5',
    question: 'Há risco de efeitos colaterais?',
    answer:
      'Conduzidos por profissionais habilitados e com produtos registrados na Anvisa, os riscos são baixos. Inchaço, vermelhidão e pequenos hematomas transitórios são as intercorrências mais comuns e se resolvem em poucos dias. Todo risco específico do seu caso é explicado antes, no termo de consentimento.',
  },
  {
    id: 'q6',
    question: 'Como funciona a manutenção?',
    answer:
      'Toxina botulínica pede retoque a cada 4 a 6 meses. Preenchedores duram de 12 a 24 meses conforme a região e o produto. Bioestimuladores têm efeito de 18 a 24 meses. Colocamos todas essas datas no seu plano para você se programar.',
  },
];

export const BEFORE_AFTER: BeforeAfter[] = [
  {
    id: 'ba1',
    beforeImage: depois2.src,
    afterImage: antes1.src,
    title: 'Preenchimento labial',
    description:
      'Volume e definição de contorno preservando a expressão natural do sorriso.',
    sessions: '1 sessão',
    interval: 'resultado em 14 dias',
    metric: '+35% de volume',
  },
];

export const STATS: Stat[] = [
  { value: 500, suffix: '+', label: 'clientes transformados' },
  { value: 12, suffix: ' anos', label: 'de experiência clínica' },
  { value: 98, suffix: '%', label: 'de satisfação declarada' },
  { value: 24, suffix: 'h', label: 'de acompanhamento pós' },
];

export const MARQUEE_ITEMS = [
  'Ácido hialurônico',
  'Toxina botulínica',
  'Bioestimulador de colágeno',
  'Skinbooster',
  'Laser fracionado',
  'Peeling químico',
  'Harmonização facial',
  'Microagulhamento',
  'Crioterapia',
  'Limpeza profunda',
] as const;

/**
 * Perfil da fundadora. Nome, registro e datas são PLACEHOLDER — troque pelos
 * dados reais antes de publicar: o registro profissional aparece na página e
 * precisa conferir com o conselho.
 */
export const FOUNDER: Founder = {
  name: 'Dra. Marina Belmonte',
  role: 'Fundadora e responsável técnica',
  registry: 'CRM-SP 148.302 · RQE 62.114',
  portrait: fundadora.src,
  lead: 'A Glowin nasceu de um incômodo: pacientes chegavam ao consultório com a foto de um rosto que não era o delas, pedindo para virar outra pessoa. Marina passou a devolver a pergunta — o que, no seu próprio rosto, você quer de volta?',
  body: 'Doze anos depois, é essa pergunta que abre toda primeira consulta da clínica. O resto — a técnica, o equipamento, o protocolo — vem depois, sempre nessa ordem, nunca ao contrário.',
  quote: 'Meu trabalho não é desenhar um rosto novo. É devolver o seu, descansado.',
  credentials: [
    'Medicina — Universidade Federal de São Paulo',
    'Residência em Dermatologia — Hospital das Clínicas FMUSP',
    'Especialização em lasers e tecnologias — Harvard Medical School',
    'Membro titular da Sociedade Brasileira de Dermatologia',
  ],
  milestones: [
    {
      year: '2013',
      title: 'A primeira sala',
      description:
        'Uma sala alugada em Pinheiros, uma maca e a decisão de fotografar cada paciente antes e depois. O arquivo da clínica começou ali.',
    },
    {
      year: '2018',
      title: 'O método por escrito',
      description:
        'As quatro etapas deixam de ser intuição e viram protocolo documentado, aplicado por toda a equipe da mesma forma.',
    },
    {
      year: '2021',
      title: 'A casa de hoje',
      description:
        'Mudança para a sede própria, com centro de tecnologias e uma equipe de cinco profissionais em formação contínua.',
    },
  ],
};
