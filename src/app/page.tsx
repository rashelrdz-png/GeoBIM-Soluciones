import IPhoneScroll from "@/components/iPhoneScroll";
import { Sparkles, Menu, Shield, Cpu, Smartphone, Layers } from "lucide-react";

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="relative bg-[#020c1b] min-h-screen overflow-x-hidden">
      {/* Premium Glassmorphic Header */}
      <header className="fixed top-0 left-0 right-0 z-40 h-20 glass-panel border-b border-[#075383]/15 flex items-center justify-between px-6 md:px-16 pointer-events-auto">
        <div className="flex items-center gap-3">
          <Layers className="w-6 h-6 text-[#fbba37]" />
          <span className="font-extrabold uppercase tracking-[0.25em] text-sm text-white">
            GeoBIM <span className="text-[#fbba37] text-glow-gold font-light">Soluciones</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
          <a href="#" className="text-white hover:text-[#fbba37] transition-colors duration-300">Inicio</a>
          <a href="#laser3d" className="hover:text-[#fbba37] transition-colors duration-300">Láser 3D</a>
          <a href="#simulacion" className="hover:text-[#fbba37] transition-colors duration-300">Simulación</a>
          <a href="#gemelodigital" className="hover:text-[#fbba37] transition-colors duration-300">Gemelo Digital</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden sm:inline-block px-6 py-2.5 rounded-full border border-[#fbba37]/30 text-[#fbba37] hover:bg-[#fbba37] hover:text-black font-extrabold uppercase text-[9px] tracking-[0.2em] transition-all duration-300 shadow-[0_0_15px_rgba(251,186,55,0.1)] hover:shadow-[0_0_20px_rgba(251,186,55,0.3)]">
            Digitaliza tu proyecto ahora
          </button>
          <button className="p-2 text-white/80 hover:text-white md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Scrollytelling Canvas Section */}
      <IPhoneScroll />

      {/* Specs Features Section */}
      <section className="relative z-20 bg-[#020c1b] py-36 px-6 md:px-24 border-t border-[#075383]/15">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[#fbba37] text-xs font-bold uppercase tracking-[0.3em] mb-3">Nuestros Servicios</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white text-glow-white">Ingeniería Vial de Precisión</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-10 rounded-3xl glass-panel relative group hover:border-[#075383]/45 transition-all duration-500">
              <div className="p-4 rounded-2xl bg-[#075383]/10 w-fit text-[#fbba37] mb-8 group-hover:scale-110 transition-transform duration-300">
                <Layers className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-[#fbba37] uppercase tracking-wider mb-4">
                Escaneo Láser 3D
              </h4>
              <p className="text-white/60 text-sm leading-relaxed font-light">
                Captura rápida de nubes de puntos con precisión de ±2mm para estructuras complejas, vialidades y puentes de gran escala.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-10 rounded-3xl glass-panel relative group hover:border-[#075383]/45 transition-all duration-500">
              <div className="p-4 rounded-2xl bg-[#075383]/10 w-fit text-[#fbba37] mb-8 group-hover:scale-110 transition-transform duration-300">
                <Cpu className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-[#fbba37] uppercase tracking-wider mb-4">
                Análisis de Esfuerzos (FEA)
              </h4>
              <p className="text-white/60 text-sm leading-relaxed font-light">
                Evaluaciones estructurales avanzadas por método de elementos finitos para predecir comportamiento mecánico dinámico bajo cargas.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-10 rounded-3xl glass-panel relative group hover:border-[#075383]/45 transition-all duration-500">
              <div className="p-4 rounded-2xl bg-[#075383]/10 w-fit text-[#fbba37] mb-8 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-[#fbba37] uppercase tracking-wider mb-4">
                Modelos As-Built BIM
              </h4>
              <p className="text-white/60 text-sm leading-relaxed font-light">
                Entregables de modelado tridimensional inteligente en Revit e IFC estándares para la operación y mantenimiento continuo de activos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* High-End Premium Footer */}
      <footer className="relative z-20 bg-[#010712] py-20 px-6 md:px-16 border-t border-[#075383]/15 text-white/40 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="font-extrabold uppercase tracking-[0.3em] text-sm text-white">
              GeoBIM Soluciones
            </span>
            <p className="text-white/30 text-center md:text-left text-xs font-light max-w-sm">
              Digitalización milimétrica de tu proyecto.
            </p>
          </div>

          <div className="flex items-center gap-6 text-white/40">
            <a href="#" className="hover:text-[#fbba37] transition-colors duration-300"><TwitterIcon className="w-5 h-5" /></a>
            <a href="#" className="hover:text-[#fbba37] transition-colors duration-300"><InstagramIcon className="w-5 h-5" /></a>
            <a href="#" className="hover:text-[#fbba37] transition-colors duration-300"><GithubIcon className="w-5 h-5" /></a>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto border-t border-[#075383]/10 mt-16 pt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-[10px] uppercase tracking-widest font-semibold">
          <p>© 2026 GeoBIM Soluciones. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors duration-300">Términos de Uso</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Privacidad</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

