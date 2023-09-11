import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://sanjib-sen.github.io',
	base: '/envshh',
	integrations: [
		starlight({
			favicon: '/favicon.ico',
			title: "envshh",
			editLink: {
				baseUrl: 'https://github.com/sanjib-sen/envshh/edit/main/docs',
			},
			logo:{
				dark: '/src/assets/logo_white.png',
				light: '/src/assets/logo_black.png',
			},
			social: {
				github: 'https://github.com/sanjib-sen/envshh',
			},
			sidebar: [
				{
					label: 'Start Here',
					autogenerate: { directory: 'start-here' },
				},
				{
					label: 'Core Concepts',
					autogenerate: { directory: 'core-concepts' },
				},
				{
					label: 'Commands',
					autogenerate: { directory: 'commands' },
				},
			],
		}),
	],
});
