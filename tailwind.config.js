/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xsm: '410px',
        sm: '576px',
        md: '768px',
        lg: '1080px',
        xl: '1200px',
        xxl: '1600px',
        h_xsm: { raw: '(max-height: 400px)' }
      },
      fontSize: {
        xxs: '0.625rem',
        xs: '0.75rem',
        s: '0.875rem',
        base: '1rem',
        sm: '1.25rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        xxl: '3rem',
        xxxl: '4rem',
        largest: '5rem'
      },
      lineHeight: {
        pressed: '67%',
        tight: '100%',
        medium: '120%',
        spaced: '140%',
        xspaced: '180%',
        black: '900'
      },
      spacing: {
        quark: '4px',
        nano: '8px',
        xxxs: '16px',
        xxs: '24px',
        xs: '32px',
        sm: '40px',
        md: '48px',
        lg: '56px',
        xl: '64px',
        xxl: '80px',
        xxxl: '120px',
        huge: '160px',
        giant: '200px',
        '4.5': '4.5rem'
      },
      colors: {
        primary: {
          darkest: '',
          dark: '',
          medium: '',
          light: '',
          lightest: ''
        },
        secondary: {
          darkest: '',
          dark: '',
          medium: '',
          light: '',
          lightest: ''
        }
      },
      fontWeight: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900'
      }
    }
  },
  plugins: []
};
