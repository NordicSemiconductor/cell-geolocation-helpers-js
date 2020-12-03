process.env.SNOWPACK_PUBLIC_VERSION = process.env.VERSION || Date.now()

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
		},
	},
	buildOptions: {
		...(process.env.BASE_URL !== undefined && {
			baseUrl: process.env.BASE_URL,
		}),
	},
}
