/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                blue: {
                    base: "#2C4681",
                    dark: "#2C4091"
                },
                gray: {
                    100: "#F9F9FB",
                    200: "#E4E6EC",
                    300: "#DCDFFD",
                    400: "#74798B",
                    500: "#4D505C",
                    600: "#1F2025"
                },
                white: "#FFFFFF",
                danger: "#B12C4D"
            },
            fontFamily: {
                sans: ["'Open Sans'", "sans-serif"]
            },
            fontSize: {
                xl: ['24px', { lineHeight: '32px' }],
                lg: ['18px', { lineHeight: '24px' }],
                md: ['14px', { lineHeight: '18px' }],
                sm: ['12px', { lineHeight: '16px' }],
                xs: ['10px', { lineHeight: '14px' }]
            },
            fontWeight: {
                regular: "400",
                semibold: "600",
                bold: "700"
            },
            textTransform: {
                uppercase: 'uppercase'
            }
        }
    },
    plugins: [],

}
