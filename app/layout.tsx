import type { Metadata } from "next";
import { Faculty_Glyphic } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const ltSuperior = localFont({
  src: [
    { path: "./assets/fonts/lt_superior/LTSuperior-Thin.ttf", weight: "100", style: "normal" },
    { path: "./assets/fonts/lt_superior/LTSuperior-ThinItalic.ttf", weight: "100", style: "italic" },
    { path: "./assets/fonts/lt_superior/LTSuperior-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "./assets/fonts/lt_superior/LTSuperior-ExtraLightItalic.ttf", weight: "200", style: "italic" },
    { path: "./assets/fonts/lt_superior/LTSuperior-Light.ttf", weight: "300", style: "normal" },
    { path: "./assets/fonts/lt_superior/LTSuperior-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "./assets/fonts/lt_superior/LTSuperior-Regular.ttf", weight: "400", style: "normal" },
    { path: "./assets/fonts/lt_superior/LTSuperior-Italic.ttf", weight: "400", style: "italic" },
    { path: "./assets/fonts/lt_superior/LTSuperior-Medium.ttf", weight: "500", style: "normal" },
    { path: "./assets/fonts/lt_superior/LTSuperior-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "./assets/fonts/lt_superior/LTSuperior-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./assets/fonts/lt_superior/LTSuperior-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "./assets/fonts/lt_superior/LTSuperior-Bold.ttf", weight: "700", style: "normal" },
    { path: "./assets/fonts/lt_superior/LTSuperior-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "./assets/fonts/lt_superior/LTSuperior-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./assets/fonts/lt_superior/LTSuperior-ExtraBoldItalic.ttf", weight: "800", style: "italic" },
    { path: "./assets/fonts/lt_superior/LTSuperior-Black.ttf", weight: "900", style: "normal" },
    { path: "./assets/fonts/lt_superior/LTSuperior-BlackItalic.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-lt-superior",
});

const facultyGlyphic = Faculty_Glyphic({
  variable: "--font-faculty-glyphic",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

// Production domain. Override per-env with NEXT_PUBLIC_SITE_URL if needed.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://datgeekmanu.com";

const siteTitle = "Emmanuel Holonou — Backend, SaaS & AI Software Engineer";
const siteDescription =
  "I help startups and businesses turn complex ideas into reliable production software — backend platforms, SaaS products, and AI systems. Let's build it.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    url: siteUrl,
    siteName: "datgeek.manu",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

// JSON-LD structured data — Person + the service offered. Helps search and AI
// engines understand who Emmanuel is and what he does. No fabricated claims.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Emmanuel C. Holonou",
      alternateName: "Manu",
      jobTitle: "Software Engineer",
      email: "mailto:holonouemmanuel0@gmail.com",
      url: siteUrl,
      knowsAbout: [
        "Backend engineering",
        "SaaS architecture",
        "AI systems",
        "RAG",
        "APIs",
        "Distributed systems",
        "Production infrastructure",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "datgeek.manu — Software Engineering",
      description: siteDescription,
      url: siteUrl,
      provider: { "@id": `${siteUrl}/#person` },
      areaServed: "Worldwide",
      serviceType: [
        "Product Engineering",
        "Backend & System Architecture",
        "AI & Intelligent Systems",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ltSuperior.variable} ${facultyGlyphic.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
