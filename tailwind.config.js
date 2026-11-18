/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#070F1F',
          900: '#101D35', // Midnight Navy
          800: '#182A4A',
          700: '#243C66',
        },
        royal: {
          50: '#EAF3FF',  // Soft Sky Blue
          100: '#D6E7FF',
          200: '#B0D0FF',
          400: '#5C8DF8',
          500: '#356DF3', // Royal Blue
          600: '#2458DB',
          700: '#1C46B5',
        },
        mint: {
          50: '#EEFBF5',
          100: '#D5F6E8',
          300: '#9DE8C8', // Mint Green
          400: '#67D8AC',
          500: '#2CC28E',
          600: '#1A9B70',
        },
        warmwhite: '#F9FBFF', // Warm White
        charcoal: '#202B3C',  // Charcoal
        slatecopy: '#526075',
        mutedcopy: '#748297',
        hairline: '#E3EAF4',
      },
      fontFamily: {
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'nav': '0 12px 36px -8px rgba(16, 29, 53, 0.14), 0 2px 6px rgba(16, 29, 53, 0.05)',
        'soft': '0 6px 24px -6px rgba(16, 29, 53, 0.07), 0 1px 3px rgba(16, 29, 53, 0.04)',
        'elevated': '0 20px 48px -12px rgba(16, 29, 53, 0.12), 0 4px 12px rgba(16, 29, 53, 0.05)',
        'product': '0 32px 80px -16px rgba(16, 29, 53, 0.20), 0 6px 20px -4px rgba(16, 29, 53, 0.08)',
        'cta': '0 12px 30px -6px rgba(53, 109, 243, 0.45)',
        'cta-hover': '0 18px 38px -6px rgba(53, 109, 243, 0.58)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        shimmer: 'shimmer 6s ease infinite',
      },
    },
  },
  plugins: [],
}
