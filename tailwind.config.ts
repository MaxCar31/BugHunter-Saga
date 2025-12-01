import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    // Colores de módulos
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'border-blue-700',
    'border-green-700',
    'border-purple-700',
    'text-blue-500',
    'text-green-500',
    'text-purple-500',
    // Colores de estado
    'bg-yellow-400',
    'border-yellow-500',
    'bg-[#e5e5e5]',
    'border-[#b7b7b7]',
    // Colores de texto
    'text-white',
    'text-yellow-400',
    'text-gray-700',
  ],
  theme: {
    extend: {
      width: {
        '84': '21rem', // 336px - entre w-80 (320px) y w-96 (384px)
      },
    },
  },
  plugins: [],
} satisfies Config;
