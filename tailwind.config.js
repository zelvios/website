export default {
    content: [
        "./src/**/*.{html,svelte,js,ts}",
    ],
    theme: {
        extend: {
            colors: {
                base: '#030014',
                text: '#cdd6f4',
                surface: '#626880',
                surface1: '#45475a',
                accent: '#cba6f7',
                accent2: '#701EFC',
            },
            fontFamily: {
                sans: ['JetBrains Mono', 'monospace'],
            },
            keyframes: {
                meteor: {
                    '0%': {
                        transform: 'translateY(0) translateX(0) rotate(215deg)',
                        opacity: '1',
                    },
                    '100%': {
                        transform: 'translateY(500px) translateX(500px) rotate(215deg)',
                        opacity: '0',
                    },
                }
            },
            animation: {
                meteor: 'meteor linear infinite',
            },
        },
    },
    plugins: [],
};
