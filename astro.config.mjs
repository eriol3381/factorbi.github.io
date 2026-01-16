// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { ion } from "starlight-ion-theme";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Factor BI - Documentation',
			logo: {
				src: '/src/assets/factorbi_logo.png',
			},
			favicon: '/favicon.ico',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/factorbi/factorbi.github.io' }],
			customCss: ['/src/assets/css/custom.css', '/src/assets/fonts/fontawesome-webfont.woff'],
			sidebar: [
				{
					label: 'Documentation',
					items: [
						{ label: 'Home', slug: 'home' },
						{ label: 'Link your AWS Account', slug: 'easyawssetup' },
						{ label: 'Factor BI Console', slug: 'console' },
						{ label: 'Download Program', slug: 'installation' },
						{ label: 'Firebird to MySQL Aurora', slug: 'firebird' },
						{ label: 'SQL Server to MySQL Aurora', slug: 'sqlserver' },
						{ label: 'dBase to MySQL Aurora', slug: 'dbase' },
						{ label: 'Visual FoxPro to MySQL Aurora', slug: 'visualfoxpro' },
						{ label: 'Sybase SQL Anywhere to MySQL Aurora', slug: 'sqlanywhere' },
						{ label: 'MySQL on-prem to AWS Aurora', slug: 'mysql' },
						{ label: 'Tables & Data to Sync', slug: 'customdatajson' },
						{ label: 'Loading and Transformation', slug: 'bipostapi' },
						{ label: 'Two-way Synchronization', slug: 'synctowindows' },
						{ label: 'Aspel', slug: 'aspel' },
						{ label: 'Microsip', slug: 'microsip' },
						{ label: 'Intelisis', slug: 'intelisis' },
						{ label: 'Soft Restaurant', slug: 'soft-restaurant' },
						{ label: 'POSitouch', slug: 'positouch' },
						{ label: 'Business Intelligence', slug: 'businessintelligence' },
						{ label: 'CSV to MySQL Aurora', slug: 'csvtomysql' },
						{ label: 'Advanced AWS Setup', slug: 'setupaws' },
						{ label: 'Troubleshooting', slug: 'troubleshooting' },
						{ label: 'About', slug: 'about' },
					]
				}
			],
			plugins: [ion({
				footer: {
					text: '© 2016 - 2019, Factor BI, S.A. de C.V. All rights reserved.',
					links: [
						{ text: 'info@factorbi.com', href: 'mailto:info@factorbi.com' },
						{ text: 'FactorBi page', href: 'https://www.factorbi.com', newTab: true },
					],
				},
				icons: undefined
			})],
		}),
	],
});
