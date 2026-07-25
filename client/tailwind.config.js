/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                violet: {
                    400: '#a78bfa',
                    500: '#8b5cf6',
                    600: '#7c3aed',
                    700: '#6d28d9',
                },
                pink: {
                    400: '#f472b6',
                    500: '#ec4899',
                    600: '#db2777',
                },
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'fade-in-up': 'fadeInUp 0.6s ease both',
                'fade-in': 'fadeIn 0.5s ease both',
                'float': 'float 3s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}