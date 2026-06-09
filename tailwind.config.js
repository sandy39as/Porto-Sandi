/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			mono: {
				bg: "#050505",
				surface: "#0A0A0A",
				card: "#111111",
				soft: "#171717",
				border: "#262626",
				text: "#F5F5F5",
				muted: "#A3A3A3",
				dim: "#737373",
			},
			backdropBlur: {
				sm: '4px',
			  },
			
			
		  },
		},
	plugins: [],
}
