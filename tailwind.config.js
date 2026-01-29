/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        saffron: {
          DEFAULT: '#FF6B00',
          light: '#FF8C42',
          dark: '#CC5500',
        },
        deepred: {
          DEFAULT: '#B80000',
          light: '#DC2626',
          dark: '#7C0000',
        },
        gold: {
          DEFAULT: '#FFD700',
          light: '#FFE55C',
          dark: '#B8860B',
        },
        divine: {
          blue: '#1A1A2E',
          cream: '#FFF8E7',
          orange: '#FF6B00',
        },
      },
      fontFamily: {
        sanskrit: ['Tiro Devanagari Sanskrit', 'Noto Sans Devanagari', 'serif'],
        cinzel: ['Cinzel', 'Playfair Display', 'serif'],
        devanagari: ['Noto Sans Devanagari', 'serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        glow: '0 0 40px rgba(255, 107, 0, 0.4)',
        'glow-gold': '0 0 40px rgba(255, 215, 0, 0.4)',
        'glow-red': '0 0 40px rgba(184, 0, 0, 0.4)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "particle-float": {
          "0%, 100%": { transform: "translateY(0) translateX(0)", opacity: "0.6" },
          "25%": { transform: "translateY(-30px) translateX(10px)", opacity: "1" },
          "50%": { transform: "translateY(-20px) translateX(-10px)", opacity: "0.8" },
          "75%": { transform: "translateY(-40px) translateX(5px)", opacity: "0.9" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "flame-flicker": {
          "0%, 100%": { transform: "scaleY(1) skewX(0deg)", opacity: "0.9" },
          "25%": { transform: "scaleY(1.1) skewX(2deg)", opacity: "1" },
          "50%": { transform: "scaleY(0.95) skewX(-1deg)", opacity: "0.85" },
          "75%": { transform: "scaleY(1.05) skewX(-2deg)", opacity: "0.95" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float": "float 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "scale-in": "scale-in 0.6s ease-out forwards",
        "particle-float": "particle-float 8s ease-in-out infinite",
        "rotate-slow": "rotate-slow 60s linear infinite",
        "flame-flicker": "flame-flicker 0.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
