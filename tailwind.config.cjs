/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'premium-dark': '#050505',
                'premium-card': '#0A0A0A',
                'premium-orange': '#FF4D00',
                'premium-silver': '#86868B',
                'apple-gray': '#F5F5F7',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
                hand: ['Nothing You Could Do', 'cursive'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            }
        },
    },
    plugins: [],
}
