import React from 'react'
import ReactDOM from 'react-dom'
import { Map } from './Map/Map'

console.log(
	'%c Bifravst Cell Geolocation Helpers ',
	'background-color: #00a9ce; color: #ffffff; padding: 0.25rem;',
	'Source code:',
	'https://github.com/bifravst/cell-geolocation-helpers',
)

ReactDOM.render(<Map />, document.querySelector('#map'))
