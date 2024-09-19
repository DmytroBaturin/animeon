import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        wallpaper: 'url(../shared/assets/wallpaper/wallpaper.png)',
        'gradient-secondary':
          'linear-gradient(180deg, hsla(var(--gradient-from)), hsla(var(--gradient-to), 0))',

        'gradient-primary':
          'linear-gradient(180deg, hsla(var(--gradient-from)), hsla(var(--gradient-to)))',
      },
      colors: {
        background: 'hsla(var(--background))',
        foreground: 'hsla(var(--foreground))',
        card: {
          DEFAULT: 'hsla(var(--card))',
          foreground: 'hsla(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsla(var(--popover))',
          foreground: 'hsla(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsla(var(--primary))',
          foreground: 'hsla(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsla(var(--secondary))',
          foreground: 'hsla(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsla(var(--muted))',
          foreground: 'hsla(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsla(var(--accent))',
          foreground: 'hsla(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsla(var(--destructive))',
          foreground: 'hsla(var(--destructive-foreground))',
        },
        border: 'hsla(var(--border))',
        input: 'hsla(var(--input))',
        ring: 'hsla(var(--ring))',
        chart: {
          '1': 'hsla(var(--chart-1))',
          '2': 'hsla(var(--chart-2))',
          '3': 'hsla(var(--chart-3))',
          '4': 'hsla(var(--chart-4))',
          '5': 'hsla(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
