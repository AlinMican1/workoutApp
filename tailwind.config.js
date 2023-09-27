/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'darkgray': '#202022',
        'darkgray-2': '#222222',
        'backgroundColor': '#161618',
        'specialPink':'#ff647c',
        'titleColor' : '#e6e6e6',
        'textColor' : '#989898',
        'boxDarkPink' : '#21181b',
        'boxOutDarkPink' : '#241b1e',
      },
    },
  
    fontFamily: {
      Poppins: [
        "Poppins",
      ]
    }

  },
  plugins: [],
}
