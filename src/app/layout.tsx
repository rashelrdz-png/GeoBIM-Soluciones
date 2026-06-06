import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "GeoBIM Soluciones - Proyecto Modelado México-Pachuca",
  description: "Digitalización tridimensional milimétrica y análisis de ingeniería estructural para la modernización vial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${montserrat.className} bg-black text-white antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}

