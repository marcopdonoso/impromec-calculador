import type { Config } from 'tailwindcss'
const typographyPlugin = require('./src/styles/typography')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    transparent: 'transparent',
    current: 'currentColor',
    colors: {
      red: '#DA0027',
      red_alt: '#FEEBEB',
      yellow: '#FABC00',
      yellow_alt: '#FEF3C7',
      green: {
        success: '#22AD5C',
        success_alt: '#DAF8E6',
      },
      gray: {
        button_primary: '#3F3F3F',
        text: '#1F2A37',
        text_alt: '#4B5563',
        placeholder_icon: '#6B7280',
        text_inactive: '#637381',
        placeholder: '#9CA3AF',
        input: '#DFE4EA',
        background: '#F2F2F2',
        background_alt: '#FAFAFA',
        white: '#FFFFFF',
        dark: '#111928',
      },
      shadow: 'rgba(160, 175, 195, 0.4)',
    },
    extend: {
      backgroundImage: {
        'auth_background-desktop': "url('/svg/auth_background-desktop.svg')",
        'app_background-mobile': "url('/svg/app_background-mobile.svg')",
        'app_background-desktop': "url('/svg/app_background-desktop.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [typographyPlugin],
}
export default config
