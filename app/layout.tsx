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

const siteTitle = "Emmanuel Holonou – Full-Stack Software Engineer";
const siteDescription =
  "Building scalable web applications and APIs. Full-stack development, backend systems, and data engineering. Available for consulting and freelance projects.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    siteName: "datgeek.manu",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
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
        {children}
      </body>
    </html>
  );
}
