/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        textColor: '#f2e9e4',
        textColorLight: '#fff',
        textColorLighter: '#b76935',
        textColorDark: '#191624',
        bgColor: '#212f45',
        bgColorSecond: '#3e1f47',
        bgColorLight: '#4a4e69',
        bgColorLighter: '#24b5c2',
        bgColorDark: '#212335',
        bgColorDarker: '#211b2a',
        bgPlayerColor: '#212335',
        bgPlayerColorLight: '#ad38ad',
        bgPlayerColorDark: '#4d194d',

      },
      animation: {
        slideup: 'slideup 1s ease-in-out',
        slidedown: 'slidedown 1s ease-in-out',
        slideleft: 'slideleft 1s ease-in-out',
        slideright: 'slideright 1s ease-in-out',
        wave: 'wave 1.2s linear infinite',
        slowfade: 'slowfade 2.2s ease-in-out',
        move1: 'move1 0.5s ease-in-out infinite',
        move2: 'move2 0.4s ease-in-out infinite',
        move3: 'move3 0.3s ease-in-out infinite',
        move4: 'move3 0.7s ease-in-out infinite',
        move5: 'move3 0.9s ease-in-out infinite',
      },
      keyframes: {
        slowfade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideup: {
          from: { opacity: 0, transform: 'translateY(25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slidedown: {
          from: { opacity: 0, transform: 'translateY(-25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slideleft: {
          from: { opacity: 0, transform: 'translateX(-20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideright: {
          from: { opacity: 0, transform: 'translateX(20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        wave: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
        move1: {
          '50%': {top: '10px', height: '10px'},
        },
        move2: {
          '50%': {top: '5px', height: '15px'},
        },
        move3: {
          '50%': {top: '7px', height: '20px'},
        },
        move4: {
          '50%': {top: '2px', height: '15px'},
        },
        move5: {
          '50%': {top: '8px', height: '10px'},
        },
      },
    },
  },
  plugins: [],
}


