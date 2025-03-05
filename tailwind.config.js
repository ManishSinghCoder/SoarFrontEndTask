/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-text-color': '#343C6A',
        'secondary-text-color': '#718EBF',
        'default-text-color': '#232323',
        'primary-bg-color': '#F5F6FA',
        'secondary-bg-color': '#FFFFFF',
        'primary-border-color': '#DFEAF2',
      },
      backgroundImage: {
        'card-gradient':
          'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%)',
      },
      boxShadow: {
        'custom-card': '4px 4px 18px -2px rgba(231, 228, 232, 0.8)',
        'custom-black-card': '4px 4px 18px -2px rgba(231, 228, 232, 0.8)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
