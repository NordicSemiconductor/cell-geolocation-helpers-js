process.env.SNOWPACK_PUBLIC_VERSION = process.env.VERSION || Date.now()
process.env.SNOWPACK_PUBLIC_BASE_DIR =
	process.env.BASE_URL !== undefined
		? `${new URL(process.env.BASE_URL).pathname.replace(/\/$/, '')}/`
		: '/'

module.exports = {
	mount: {
		dev: '/',
		src: '/_dist_',
	},
	plugins: [
		'@snowpack/plugin-react-refresh',
		'@snowpack/plugin-typescript',
		'@snowpack/plugin-sass',
	],
	installOptions: {
		installTypes: true,
		env: {
			SNOWPACK_PUBLIC_VERSION: true,
			SNOWPACK_PUBLIC_BASE_DIR: true,
		},
	},
	buildOptions: {
		...(process.env.BASE_URL !== undefined && {
			baseUrl: process.env.BASE_URL,
		}),
	},
}
