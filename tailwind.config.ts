import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'colmeia-blue': 'hsl(var(--colmeia-blue))',
                'colmeia-yellow': 'hsl(var(--colmeia-yellow))',
            },
        },
    },
    plugins: [],
}
export default config