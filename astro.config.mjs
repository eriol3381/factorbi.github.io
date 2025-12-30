// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Factor BI - Documentation',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			customCss: ['/src/assets/css/custom.css'],
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
		}),
	],
});
