/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#3490dc',
				secondary: '#ffed4a',
				danger: '#e3342f',
			},
			spacing: {
				sm: '8px',
				md: '12px',
				lg: '450px',
				xl: '800px',
			},
		},
	},
	plugins: [],
};
