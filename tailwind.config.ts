import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fadeIn' : 'fadeInKeyframe 1.5s ease-in-out both',
        'fadeInForSearch' : 'fadeInForSearchKeyframe 1.5s ease-in-out both'
      },
      keyframes: {
        fadeInKeyframe: {
          '0%' :{ opacity: '0' },
          '100%' :{ opacity: '1' }
        },
        fadeInForSearchKeyframe: {
          '0%' :{ opacity: '0' },
          '100%' :{ opacity: '0.5' }
        },
        bottomUpSlideKeyframe: {
          '0%' : {translateY: '-97vh'},
          '100%': {translateY: '0'}
        }
      }
    },
  },
  plugins: [

  ],
}
export default config
