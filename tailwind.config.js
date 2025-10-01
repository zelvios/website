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
                    "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
                    "70%": { opacity: 1 },
                    "100%": {
                        transform: "rotate(215deg) translateX(-500px)",
                        opacity: 0,
                    },
                },
                marquee: {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(calc(-100% - var(--gap)))" },
                },
                "marquee-vertical": {
                    from: { transform: "translateY(0)" },
                    to: { transform: "translateY(calc(-100% - var(--gap)))" },
                },
                shimmer: {
                    "0%, 90%, 100%": {
                        "background-position": "calc(-100% - var(--shimmer-width)) 0",
                    },
                    "30%, 60%": {
                        "background-position": "calc(100% + var(--shimmer-width)) 0",
                    },
                },
            },
            animation: {
                meteor: "meteor 5s linear infinite",
                marquee: "marquee var(--duration) linear infinite",
                "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
                shimmer: "shimmer 8s infinite",
            },
        },
    },
    plugins: [],
};
