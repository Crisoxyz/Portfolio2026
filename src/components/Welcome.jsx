import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function PortfolioHome() {
  const [isHovered, setIsHovered] = useState(false);

  // --- FIX IMMAGINI PER GITHUB PAGES ---
  // Questo serve a far funzionare le immagini sia in locale che online
  const base = import.meta.env.BASE_URL; 

  // --- Rilevamento Mobile ---
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Controllo iniziale
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- PARALLASSE ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 40, damping: 25 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  // --- CURSORE ---
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorSpringConfig = { stiffness: 500, damping: 28 };
  const cursorXSpring = useSpring(cursorX, cursorSpringConfig);
  const cursorYSpring = useSpring(cursorY, cursorSpringConfig);

  // Movimenti
  const moonMoveX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const moonMoveY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);
  const flowerMoveX = useTransform(mouseX, [-0.5, 0.5], [-40, 40]);
  const flowerMoveY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  function handleMouseMove(event) {
    if (isMobile) return; // Stop calcoli su mobile
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    x.set((clientX / innerWidth) - 0.5);
    y.set((clientY / innerHeight) - 0.5);
    cursorX.set(clientX);
    cursorY.set(clientY);
  }

  // Animazione Entrata
  const textReveal = {
    hidden: { opacity: 0, y: 100, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.5, ease: "easeOut" } }
  };

  // CONFIGURAZIONE PESO LETTERE TITOLO
  const titleLetters = [
    { char: "C", weight: "font-thin" },
    { char: "R", weight: "font-thin" },
    { char: "I", weight: "font-thin" },
    { char: "S", weight: "font-normal" },
    { char: "T", weight: "font-medium" },
    { char: "I", weight: "font-bold" },
    { char: "A", weight: "font-extrabold" },
    { char: "N", weight: "font-black" },
  ];

  return (
    <div 
      className="relative w-full h-screen bg-black text-white overflow-hidden selection:bg-white selection:text-black font-sans"
      onMouseMove={handleMouseMove}
    >
      
      {/* 1. LAYER BASE: NOISE */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.05]"
        // FIX: Usiamo la variabile base per il percorso corretto
        style={{ backgroundImage: `url("${base}noise.png")`, backgroundSize: '100%' }}
      ></div>

      {/* 2. LAYER FIORI (z-20) */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 z-20 flex justify-center items-end pointer-events-none"
        style={{ x: isMobile ? 0 : flowerMoveX, y: isMobile ? 0 : flowerMoveY }}
      >
        <motion.img 
          initial={{ y: "100%", opacity: 0, rotate: 90 }} 
          animate={{ y: "47%", opacity: 1, rotate: 90 }} 
          transition={{ duration: 1.5, delay: 0.5 }}
          // FIX: Percorso con base url
          src={`${base}flowers.jpg`}
          alt="Flowers"
          className="w-[45vh] md:w-[30vh] max-w-none h-auto object-cover origin-center mix-blend-screen"
        />
      </motion.div>

      {/* 3. LAYER LUNA (z-10) */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        style={{ x: isMobile ? 0 : moonMoveX, y: isMobile ? 0 : moonMoveY }}
      >
        <motion.img 
          initial={{ x: "5%", y: "4%", scale: 0.8, opacity: 0 }}
          animate={{ x: "5%", y: "4%", scale: 1, opacity: 1 }}
          transition={{ duration: 2 }}
          // FIX: Percorso con base url
          src={`${base}moon.png`}
          alt="Moon"
          className="w-[100vw] md:w-[60vw] h-auto object-contain mix-blend-color-dodge brightness-110 contrast-125"
        />
      </motion.div>

      {/* --- 4. LAYER TESTI E MENU --- */}
      
      <header className="absolute top-0 left-0 right-0 w-full pt-4 pb-6 px-6 md:p-10 z-30 flex flex-col md:flex-row justify-between items-center md:items-baseline pointer-events-none mix-blend-difference gap-0">
        
        {/* TITOLO CRISTIAN */}
        <motion.div 
          variants={textReveal} initial="hidden" animate="visible"
          className="flex items-baseline tracking-tighter leading-[0.8]"
          style={{ fontSize: isMobile ? '18vw' : '11vw', fontFamily: "'MyCustomFont', sans-serif" }}
        >
          {titleLetters.map((item, i) => (
            <span key={i} className={item.weight}>
              {item.char}
            </span>
          ))}
        </motion.div>

        {/* 26'folio */}
        <motion.h1 
          variants={textReveal} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
          className="font-thin tracking-tighter leading-[0.8] text-center md:text-right"
          style={{ fontSize: isMobile ? '10vw' : '11vw', fontFamily: "'MyCustomFont', sans-serif" }}
        >
          26’folio
        </motion.h1>
      </header>

      {/* NAVIGAZIONE */}
      <nav className={`absolute left-0 right-0 z-30 flex flex-col md:flex-row items-center justify-end md:justify-between px-10 md:px-40 pointer-events-none mix-blend-difference gap-8 md:gap-0 ${isMobile ? 'top-[25%]' : 'inset-0'}`}>
        
        {/* Gruppo Sinistra */}
        <div className="flex gap-12 md:gap-80 pointer-events-auto transform md:translate-y-12">
          <FlipLink href="https://www.behance.net/cristiantorre" setHovered={setIsHovered}>WORKS</FlipLink>
          <FlipLink href="https://www.artstation.com/criso_xyz" setHovered={setIsHovered}>ART</FlipLink>
        </div>

        {/* Gruppo Destra */}
        <div className="flex gap-12 md:gap-80 pointer-events-auto transform md:translate-y-12">
          <FlipLink href="https://www.linkedin.com/in/cristian-torre-5b0711357/" setHovered={setIsHovered}>CONTACT</FlipLink>
          <FlipLink href="https://www.linkedin.com/in/cristian-torre-5b0711357/" setHovered={setIsHovered}>INFO</FlipLink>
        </div>

      </nav>

      {/* 5. CURSORE */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{ x: cursorXSpring, y: cursorYSpring, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isHovered ? 2.5 : 1, backgroundColor: isHovered ? "white" : "transparent" }}
      />

    </div>
  );
}

// --- COMPONENTE FLIP LINK ---
const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href, setHovered }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
      target="_blank" // Aggiunto per aprire i link esterni in nuova scheda (consigliato per social)
      rel="noopener noreferrer"
      className="relative block overflow-hidden whitespace-nowrap text-sm font-bold uppercase tracking-[0.2em] text-white"
      style={{ lineHeight: 0.9 }} 
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
            transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i }}
            className="inline-block"
            key={i}
          >
            {l === " " ? "\u00A0" : l} 
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
            transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i }}
            className="inline-block text-white" 
            key={i}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};
