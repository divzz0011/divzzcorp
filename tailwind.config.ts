import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Latar belakang utama (Bersih & Profesional)
        background: {
          light: "#F9FAFB", // Putih bersih soft
          dark: "#12141C",  // Arang gelap/Charcoal (Nyaman di mata)
        },
        // Warna Aksen Khas Gen Z (Murni Pastel Tenang, NO NEON)
        pastel: {
          lavender: "#DCD6F7", // Ungu pastel lembut
          mint: "#E3F6F5",     // Hijau mint sangat soft
          rose: "#F4EEED",     // Merah muda kusam estetik
          slate: "#4A4E69",    // Abu-abu keunguan untuk teks sekunder
        },
      },
    },
  },
  plugins: [],
};
export default config;