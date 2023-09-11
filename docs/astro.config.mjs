import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://sanjib-sen.github.io/envshh/',
	integrations: [
		starlight({
			favicon: '/public/favicon.ico',
			title: "envshh",
			logo:{
				dark: '/src/assets/logo_white.png',
				light: '/src/assets/logo_black.png',
			},
			social: {
				github: 'https://github.com/sanjib-sen/envshh',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', link: '/guides/example/' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
