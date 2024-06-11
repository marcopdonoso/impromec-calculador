import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      red: '#DA0027',
      red_alt: '#FEEBEB',
      yellow: '#FABC00',
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
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
