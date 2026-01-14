import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary palette
        primary: {
          DEFAULT: '#EA7B7B',
          light: '#EA7B7B',
          dark: '#D25353',
        },
        accent: {
          DEFAULT: '#D25353',
          light: '#D25353',
          dark: '#9E3B3B',
        },
        deep: {
          DEFAULT: '#9E3B3B',
          red: '#9E3B3B',
        },
        soft: {
          DEFAULT: '#FFEAD3',
          bg: '#FFEAD3',
        },
        // Theme-specific
        light: {
          bg: '#FFEAD3',
          text: '#9E3B3B',
        },
        dark: {
          bg: '#1A0F0F',
          surface: '#2D1515',
          text: '#FFEAD3',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-in': 'slideIn 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'underline-expand': 'underlineExpand 0.3s ease-out forwards',
        'menu-slide': 'menuSlide 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(234, 123, 123, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(234, 123, 123, 0.6)' },
        },
        underlineExpand: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        menuSlide: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': 'url("/patterns/circuit.svg")',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(234, 123, 123, 0.4)',
        'glow-lg': '0 0 60px rgba(234, 123, 123, 0.5)',
        'card': '0 10px 40px rgba(158, 59, 59, 0.15)',
        'card-hover': '0 20px 60px rgba(158, 59, 59, 0.25)',
      },
      dropShadow: {
        'glow': '0 0 20px rgba(234, 123, 123, 0.6)',
        'glow-lg': '0 0 40px rgba(234, 123, 123, 0.8)',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
}

export default config
