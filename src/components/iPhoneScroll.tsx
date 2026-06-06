"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring, motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Cpu, Shield, Sparkles, Smartphone, Layers } from "lucide-react";

const TOTAL_FRAMES = 54;

export default function IPhoneScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth progress using spring physics for inertia and fluid transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 40,
    mass: 1,
    restDelta: 0.001
  });

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const preloadImages = async () => {
      const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          const frameNum = String(i + 1).padStart(3, "0");
          img.src = `/img/frame_${frameNum}.jpg`;
          
          img.onload = () => {
            loadedImages[i] = img;
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            resolve();
          };

          img.onerror = () => {
            console.error(`Error loading image at /img/frame_${frameNum}.jpg`);
            resolve();
          };
        });
      });

      await Promise.all(promises);
      setImages(loadedImages.filter(Boolean));
      setIsLoaded(true);
    };

    preloadImages();
  }, []);

  // Update canvas on scroll
  useEffect(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };

    const renderFrame = (index: number) => {
      const img = images[index - 1];
      if (!img) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;
      
      let drawWidth, drawHeight, drawX, drawY;

      if (canvasRatio > imgRatio) {
        drawWidth = width;
        drawHeight = width / imgRatio;
        drawX = 0;
        drawY = (height - drawHeight) / 2;
      } else {
        drawWidth = height * imgRatio;
        drawHeight = height;
        drawX = (width - drawWidth) / 2;
        drawY = 0;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

      // Holographic scanlines overlay
      for (let y = 0; y < height; y += 3) {
        ctx.strokeStyle = y % 6 === 0 ? "rgba(251, 186, 55, 0.06)" : "rgba(7, 83, 131, 0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    resizeCanvas();
    renderFrame(1);

    // Subscribe to smooth progress scroll updates
    const unsubscribe = smoothProgress.on("change", (latest) => {
      // Piecewise mapping to slow down transition in the middle (frames 15 to 40)
      // progress [0.0 -> 0.2] maps to [1 -> 15] (fast camera setup)
      // progress [0.2 -> 0.8] maps to [15 -> 40] (slowed down structural deconstruction/analysis)
      // progress [0.8 -> 1.0] maps to [40 -> 54] (fast assembly/final overview)
      let targetFrame = 1;
      if (latest <= 0.2) {
        targetFrame = 1 + (latest / 0.2) * 14;
      } else if (latest <= 0.8) {
        targetFrame = 15 + ((latest - 0.2) / 0.6) * 25;
      } else {
        targetFrame = 40 + ((latest - 0.8) / 0.2) * 14;
      }
      
      const frameIndex = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.floor(targetFrame))
      );
      
      setCurrentFrame(frameIndex);
      renderFrame(frameIndex);
    });

    const handleResize = () => {
      resizeCanvas();
      renderFrame(currentFrame);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, images, smoothProgress, currentFrame]);

  // Framer Motion transforms linked to smoothProgress (visible range increased by 50%+)
  const opacities = [
    useTransform(smoothProgress, [0, 0.15, 0.22, 0.28], [1, 1, 0, 0]),
    useTransform(smoothProgress, [0.22, 0.28, 0.48, 0.55], [0, 1, 1, 0]),
    useTransform(smoothProgress, [0.52, 0.58, 0.78, 0.85], [0, 1, 1, 0]),
    useTransform(smoothProgress, [0.82, 0.88, 0.98, 1.0], [0, 1, 1, 1]),
  ];

  const yTranslations = [
    useTransform(smoothProgress, [0, 0.22], [0, -50]),
    useTransform(smoothProgress, [0.22, 0.28, 0.48, 0.55], [50, 0, 0, -50]),
    useTransform(smoothProgress, [0.52, 0.58, 0.78, 0.85], [50, 0, 0, -50]),
    useTransform(smoothProgress, [0.82, 0.88, 1.0], [50, 0, 0]),
  ];

  const circleScale = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [0.8, 1.2, 1.5, 1]);
  const circleOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.15, 0.3, 0.2, 0.1]);

  return (
    <div className="relative bg-[#020c1b] w-full" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
      {/* Loading Overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#020c1b] z-50 flex flex-col items-center justify-center"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-2 border-[#075383]/20" />
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute w-24 h-24 rounded-full border-t-2 border-r-2 border-[#fbba37]"
              />
              
              <span className="absolute text-xl font-semibold tracking-tighter text-[#fbba37] text-glow-gold">
                {loadingProgress}%
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-center"
            >
              <h2 className="text-[#fbba37] text-lg font-bold uppercase tracking-[0.2em] mb-1">
                GeoBIM Soluciones
              </h2>
              <p className="text-white/40 text-xs uppercase tracking-widest">
                Cargando Proyecto México-Pachuca...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Scrollytelling Container */}
      <div ref={containerRef} className="relative w-full h-[400vh]">
        
        {/* Fixed Viewport elements */}
        <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none z-0">
          
          {/* Subtle high-tech circular grid lines in the background */}
          <motion.div
            style={{ scale: circleScale, opacity: circleOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full border border-dashed border-[#075383]/30" />
            <div className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full border border-[#fbba37]/15" />
            <div className="absolute w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] rounded-full border border-dashed border-[#075383]/10" />
          </motion.div>

          {/* HTML5 Canvas with intensified gold-blue wireframe/hologram filter */}
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover block scale-95 md:scale-90 opacity-85 transition-all duration-300 pointer-events-auto"
            style={{
              filter: "grayscale(100%) sepia(100%) hue-rotate(185deg) saturate(320%) brightness(0.95) contrast(1.6) drop-shadow(0 0 35px rgba(7, 83, 131, 0.45)) drop-shadow(0 0 15px rgba(251, 186, 55, 0.15))",
              maskImage: "radial-gradient(circle, black 35%, rgba(0, 0, 0, 0.45) 70%, transparent 95%)",
              WebkitMaskImage: "radial-gradient(circle, black 35%, rgba(0, 0, 0, 0.45) 70%, transparent 95%)",
              imageRendering: "auto",
            }}
          />

          {/* Holographic Radial Vignette */}
          <div className="hologram-vignette" />

          {/* Subtle Ambient Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_97%,rgba(7,83,131,0.04)_98%)] bg-[size:100%_20px]" />
        </div>

        {/* Scroll Progress indicator (Left side vertical bar) */}
        {isLoaded && (
          <div className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-6">
            <span className="text-[10px] uppercase tracking-[0.3em] rotate-270 origin-center text-[#fbba37] text-glow-gold mb-8 whitespace-nowrap font-bold">
              GEMELO DIGITAL
            </span>
            <div className="h-40 w-[2px] bg-white/10 relative rounded-full overflow-hidden">
              <motion.div
                style={{ scaleY: smoothProgress, transformOrigin: "top" }}
                className="absolute inset-x-0 top-0 bottom-0 bg-[#fbba37]"
              />
            </div>
            <span className="text-xs font-bold text-[#fbba37] text-glow-gold">
              0{currentFrame < 10 ? `0${currentFrame}` : currentFrame}
            </span>
          </div>
        )}

        {/* Dynamic Story Overlays */}
        {isLoaded && (
          <div className="relative w-full h-full z-10 pointer-events-none">
            
            {/* Section 1: Introduction (0% - 15%) */}
            <motion.div
              style={{ opacity: opacities[0], y: yTranslations[0] }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
              <h1 className="text-4xl md:text-7xl font-extrabold text-[#fbba37] tracking-tighter uppercase text-glow-gold leading-tight max-w-4xl mb-8">
                Proyecto Modelado México-Pachuca
              </h1>
              <p className="text-[#fbba37]/90 max-w-3xl text-sm md:text-xl tracking-wider uppercase font-medium leading-[1.7] text-glow-gold">
                Digitalización tridimensional y análisis estructural para la modernización vial.
              </p>
              
              <div className="absolute bottom-16 flex flex-col items-center gap-2 animate-bounce">
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#fbba37] text-glow-gold font-bold">Desplázate para iniciar el recorrido digital</span>
                <ChevronDown className="w-5 h-5 text-[#fbba37]" />
              </div>
            </motion.div>

            {/* Section 2: Lidar Escaneo (22% - 45%) */}
            <motion.div
              style={{ opacity: opacities[1], y: yTranslations[1] }}
              className="absolute inset-0 flex items-center justify-start px-8 md:px-24"
            >
              <div className="max-w-md md:max-w-xl text-left pointer-events-auto p-10 rounded-2xl glass-panel relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#075383]" />
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-[#075383]/20 text-[#fbba37]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#fbba37]/80">
                    Modelado Vial
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-4xl font-extrabold text-[#fbba37] uppercase tracking-tight leading-tight mb-6 text-glow-gold">
                  Precisión Milimétrica mediante Escaneo Lidar
                </h3>
                <p className="text-white text-sm md:text-base leading-[1.7] font-medium">
                  Captura de datos de alta resolución que garantiza una nube de puntos exacta para el diagnóstico estructural del puente.
                </p>
              </div>
            </motion.div>

            {/* Section 3: Simulación Avanzada (52% - 75%) */}
            <motion.div
              style={{ opacity: opacities[2], y: yTranslations[2] }}
              className="absolute inset-0 flex items-center justify-end px-8 md:px-24"
            >
              <div className="max-w-md md:max-w-xl text-left pointer-events-auto p-10 rounded-2xl glass-panel relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1.5 h-full bg-[#fbba37]" />
                
                <div className="flex items-center gap-3 mb-6 justify-end md:justify-start">
                  <div className="p-2 rounded-lg bg-[#fbba37]/15 text-[#fbba37]">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#fbba37]/80">
                    Cálculo Estructural
                  </span>
                </div>

                <h3 className="text-2xl md:text-4xl font-extrabold text-[#fbba37] uppercase tracking-tight leading-tight mb-6 text-right md:text-left text-glow-gold">
                  Simulación Estructural Avanzada
                </h3>
                <p className="text-white text-sm md:text-base leading-[1.7] font-medium text-right md:text-left">
                  Modelado de elementos finitos para el análisis de esfuerzos dinámicos, asegurando la durabilidad y seguridad del puente.
                </p>
              </div>
            </motion.div>

            {/* Section 4: Gemelo Digital and CTA (82% - 100%) */}
            <motion.div
              style={{ opacity: opacities[3], y: yTranslations[3] }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
              <h3 className="text-3xl md:text-6xl font-extrabold text-[#fbba37] uppercase tracking-tighter leading-tight mb-8 text-glow-gold">
                Integración BIM y Gemelo Digital
              </h3>
              <p className="max-w-2xl text-white text-sm md:text-lg mb-12 leading-[1.7] font-medium">
                Centralización de información en un modelo inteligente para la gestión de activos y mantenimiento predictivo.
              </p>
              
              <button className="pointer-events-auto px-8 py-4 bg-[#fbba37] text-black font-extrabold uppercase text-xs tracking-[0.3em] rounded-full hover:bg-[#075383] hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(251,186,55,0.45)] hover:shadow-[0_0_30px_rgba(7,83,131,0.6)]">
                Digitaliza tu proyecto ahora
              </button>
            </motion.div>

          </div>
        )}
      </div>
    </div>
  );
}
