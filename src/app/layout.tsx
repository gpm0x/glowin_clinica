import type { Metadata, Viewport } from "next";
import { Fraunces, Karla, Space_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/cn";
import { CONTACT, CLINIC } from "@/utils/constants";

/** Serifa óptica com contraste alto — a voz editorial da marca. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

/** Grotesca de detalhes secos — corpo de texto legível sem ser anônimo. */
const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  display: "swap",
});

/** Monoespaçada para etiquetas, números e metadados clínicos. */
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const SITE_URL = "https://glowinclinica.com.br";
const TITLE = "Glowin Clínica | Estética de resultado em São Paulo";
const DESCRIPTION =
  "Clínica de estética avançada em São Paulo. Protocolos personalizados de harmonização facial, toxina botulínica, preenchimento e laser. Mais de 500 clientes transformados. Avaliação gratuita.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Glowin Clínica",
  },
  description: DESCRIPTION,
  keywords: [
    "clínica de estética São Paulo",
    "harmonização facial",
    "toxina botulínica",
    "preenchimento ácido hialurônico",
    "bioestimulador de colágeno",
    "laser facial",
    "estética avançada",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Glowin Clínica",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "health",
};

export const viewport: Viewport = {
  themeColor: "#f4f1e8",
  colorScheme: "light",
};

/** Dados estruturados: ajuda o Google a exibir a clínica na busca local. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Glowin Clínica",
  description: DESCRIPTION,
  url: SITE_URL,
  telephone: `+${CONTACT.WHATSAPP_NUMBER}`,
  email: CONTACT.EMAIL,
  image: `${SITE_URL}/og.jpg`,
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: CLINIC.CITY,
    addressRegion: CLINIC.STATE,
    addressCountry: "BR",
  },
  sameAs: [CONTACT.INSTAGRAM_URL],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "14:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // As variáveis de fonte ficam em <html>: os tokens do tema Tailwind são
    // declarados em `:root` e precisam enxergá-las para resolver.
    <html
      lang="pt-BR"
      className={cn(fraunces.variable, karla.variable, spaceMono.variable)}
    >
      <body className="antialiased min-h-screen flex flex-col bg-paper text-pine">
        <a href="#conteudo" className="skip-link label">
          Pular para o conteúdo
        </a>

        {children}

        <div className="grain-overlay" aria-hidden />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
