/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        bloodred: '#EA1F27',
        fg: 'var(--fg)',
        bg: 'var(--bg)',
        win: 'var(--win-bg)',
        faint: 'var(--faint-border)'
      },
      fontFamily: {
        zombie: ['edoregular', 'sans-serif'],
      },
      boxShadow: {
        bevel: 'inset 3px 3px 2px rgba(255, 255, 255, .7), inset -3px -3px 2px rgba(0, 0, 0, .25)'
      }
    },
  },
  plugins: [],
}
