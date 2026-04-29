import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px'
    },
    extend: {
      fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)'
      },
      colors: {
        brand: {
          navy: 'var(--brand-navy)',
          'blue-deep': 'var(--brand-blue-deep)',
          blue: 'var(--brand-blue)',
          cyan: 'var(--brand-cyan)',
          steel: 'var(--brand-steel)'
        },
        neutral: {
          0: 'var(--neutral-0)',
          50: 'var(--neutral-50)',
          100: 'var(--neutral-100)',
          200: 'var(--neutral-200)',
          300: 'var(--neutral-300)',
          400: 'var(--neutral-400)',
          500: 'var(--neutral-500)',
          600: 'var(--neutral-600)',
          700: 'var(--neutral-700)',
          800: 'var(--neutral-800)',
          900: 'var(--neutral-900)',
          950: 'var(--neutral-950)'
        }
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        brand: 'var(--glow-brand)',
        cta: 'var(--glow-cta)'
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)'
      },
      maxWidth: {
        content: 'var(--max-w-content)',
        wide: 'var(--max-w-wide)',
        ultra: 'var(--max-w-ultra)'
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        'in-out-custom': 'var(--ease-in-out)'
      }
    }
  },
  plugins: []
};
export default config;
