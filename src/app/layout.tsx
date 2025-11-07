import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Footer from "@/components/layout/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Nazar Propiedades - Inmobiliaria en Mendoza",
  description:
    "Encontrá la propiedad perfecta en Mendoza con el mejor acompañamiento profesional. Inmobiliaria con más de 15 años de experiencia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className={`${manrope.variable} antialiased`}>
        <Navbar />
        <WhatsAppButton />
        {children}
        <Footer />
      </body>
    </html>
  );
}
