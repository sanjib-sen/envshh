import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

import logoBlack from './src/assets/logo_black.png';
import logoWhite from './src/assets/logo_white.png';

const siteDescription = 'envshh is a cli tool to manage your .env files';

// https://astro.build/config
export default defineConfig({
  site: 'https://envshh.js.org',
  integrations: [
    starlight({
      favicon: '/favicon.ico',
      title: 'envshh',
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'keyword',
            content:
              'envshh, env, dotenv, cli, tool, .env, .envs, git, github, environment, variables',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'description',
            content: siteDescription,
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:image',
            content: logoWhite,
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:description',
            content: siteDescription,
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:description',
            content: siteDescription,
          },
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/sanjib-sen/envshh/edit/main/docs',
      },
      logo: {
        alt: 'envshh is secure',
        dark: logoWhite,
        light: logoBlack,
      },
      social: {
        discord: 'https://discord.gg/y3j7aJZurh',
        github: 'https://github.com/sanjib-sen/envshh',
      },
      sidebar: [
        { label: 'Homepage', link: '/' },
        {
          label: 'Start Here',
          items: [
            { label: 'Introduction', link: '/start-here' },
            { label: 'Quick Usage', link: '/start-here/quick-usage' },
            { label: 'Security', link: '/start-here/security' },
          ],
        },
        {
          label: 'Core Concepts',
          items: [
            { label: 'Core Concepts', link: '/core-concepts' },
            { label: 'project', link: '/core-concepts/project' },
            { label: 'branch', link: '/core-concepts/branch' },
            { label: 'env-path', link: '/core-concepts/env-path' },
            { label: 'offline', link: '/core-concepts/offline' },
            { label: 'instance', link: '/core-concepts/instance' },
            { label: 'help', link: '/core-concepts/help' },
            { label: 'verbose', link: '/core-concepts/verbose' },
          ],
        },
        {
          label: 'Commands',
          items: [
            { label: 'commands', link: '/commands' },
            { label: 'push', link: '/commands/push' },
            { label: 'pull', link: '/commands/pull' },
            { label: 'generate', link: '/commands/generate' },
            { label: 'pipe', link: '/commands/pipe' },
            { label: 'clone', link: '/commands/clone' },
            { label: 'remove', link: '/commands/remove' },
            { label: 'instance', link: '/commands/instance' },
            { label: 'db', link: '/commands/db' },
            { label: 'utils', link: '/commands/utils' },
          ],
        },
        { label: 'Configuration', link: '/configuration' },
      ],
    }),
  ],
});
