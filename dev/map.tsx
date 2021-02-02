import React from 'react'
import ReactDOM from 'react-dom'
import { Map } from './Map/Map'

console.log(
	'%c Cell Geolocation Helpers ',
	'background-color: #00a9ce; color: #ffffff; padding: 0.25rem;',
	'Source code:',
	'https://github.com/NordicSemiconductor/cell-geolocation-helpers-js',
)

ReactDOM.render(<Map />, document.querySelector('#map'))
