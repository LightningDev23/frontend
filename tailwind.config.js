/* eslint-disable import/no-anonymous-default-export */
import { nextui } from "@nextui-org/react";
import scrollbar from "tailwind-scrollbar";
import plugin from "tailwindcss/plugin.js"

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				white: "#CFDBFF",
				background: "#161922",
				primary: "#9aa9e0",
				secondary: "#8446c7",
				accent: "#101319",
				mention: "hsl(40, 86%, 57%, 0.1)",
				"mention-hover": "hsl(40, 86%, 57%, 0.06)",
				"msg-jumped": "hsl(270, 86%, 57%, 0.1)",
				"msg-hover": "rgba(0, 0, 0, 0.1)",
				"msg-system": "hsl(290, 86%, 57%, 0.1)",
				"msg-system-hover": "hsl(290, 86%, 57%, 0.06)",
				charcoal: {
					50: "#f9f9f9",
					100: "#f3f3f3",
					200: "#e0e0e0",
					300: "#cecece",
					400: "#a9a9a9",
					500: "#282F3E",
					600: "#202531",
					700: "#181C25",
					800: "#101218",
					900: "#08090C",
				},
			},
			fontSize: {
				"2xs": ".625rem",
				"3xs": ".5rem",
				"4xs": ".375rem",
				"5xs": ".25rem",
			},
		},
		fontFamily: {
			roboto: ["Roboto", "sans-serif"],
		},
	},
	darkMode: "class",
	plugins: [
		nextui({
			defaultTheme: "dark",
			themes: {
				dark: {
					colors: {
						background: "#161922",
						primary: "#9aa9e0",
						secondary: "#624185",
					},
				},
			},
		}),
		scrollbar(),
		plugin(({ addUtilities }) => {
			addUtilities({
				".horizontal-scroll-container": {
					"@apply overflow-x-auto whitespace-nowrap flex items-center": {}
				},
				".horizontal-scroll-item": {
					"@apply inline-block": {}
				},
				".item-drag": {
					"-webkit-user-drag": "none"
				},
				".no-overflow-anchoring": {
					overflowAnchor: "none",
				  },
			})
		})
	],
};
