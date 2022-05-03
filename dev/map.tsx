import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Map } from './Map/Map'

console.log(
	'%c Cell Geolocation Helpers ',
	'background-color: #00a9ce; color: #ffffff; padding: 0.25rem;',
	'Source code:',
	'https://github.com/NordicSemiconductor/cell-geolocation-helpers-js',
)

const container = document.getElementById('map') as HTMLElement
const root = createRoot(container)
root.render(<Map />)
