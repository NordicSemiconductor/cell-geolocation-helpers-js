const fs = require('fs')
const path = require('path')

const cfg = {
	entry: {
		map: './dev/map.tsx',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
					},
				],
			},
		],
	},
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		'react-leaflet': 'ReactLeaflet',
	},
}

module.exports = [
	{
		...cfg,
		mode: 'production',
		name: 'production',
	},
	{
		...cfg,
		name: 'development',
		mode: 'development',
		devtool: 'source-map',
		devServer: {
			contentBase: './dist',
			before: (app, server, compiler) => {
				app.get('/', (req, res) => {
					const html = fs.readFileSync(
						path.join(process.cwd(), 'dev', 'index.html'),
						'utf-8',
					)
					res.set('Content-Type', 'text/html')
					res.send(html)
				})
			},
		},
		module: {
			rules: [
				...cfg.module.rules,
				{
					enforce: 'pre',
					test: /\.js$/,
					loader: 'source-map-loader',
				},
			],
		},
	},
]
