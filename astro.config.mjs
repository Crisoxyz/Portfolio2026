import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// Sostituisci con i tuoi dati reali!
export default defineConfig({
  // Metti qui l'URL completo che avrai
  site: 'https://crisoxyz.github.io', 
  // Metti qui il nome della tua repository (es. /portfolio-2026)
  base: '/Portfolio2026', 
  
  integrations: [react(), tailwind()],
});