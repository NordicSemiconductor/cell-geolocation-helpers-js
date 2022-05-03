import React, { useState } from 'react'
import styled from 'styled-components'
import { cellFromGeolocations } from '../../src/cellFromGeolocations'
import { BaseMap } from './BaseMap'

const Button = styled.button`
	position: absolute;
	top: 10px;
	right: 10px;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
	border-radius: 4px;
	border: 0;
	padding: 0.5rem;
	font-family: sans-serif;
	background-color: #fff;
	z-index: 1000;
	margin: 5px;
`

const calculateCell = cellFromGeolocations({
	minCellDiameterInMeters: 5000,
	percentile: 0.9,
})

export const Map = () => {
	const [locations, setLocations] = useState<{ lat: number; lng: number }[]>([])
	const cell = calculateCell(locations)
	/*
	

	useEffect(() => {
		const map = L.map('map').setView([63.4210966, 10.4378928], 13)
		// add the OpenStreetMap tiles
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution:
				'&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
		}).addTo(map)
		if (cell !== undefined)
			L.circle([cell.lat, cell.lng], { radius: cell?.accuracy / 2 }).addTo(map)
		locations.forEach((location, i) => {
			L.marker([location.lat, location.lng], {
				icon: L.icon({
					iconUrl:
						'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
					iconSize: [25, 41],
					iconAnchor: [12.5, 41],
				}),
			}).addTo(map)
		})

		map.on('click', (event: { latlng: L.LatLng }) => {
			setLocations((loc) => [...loc, event.latlng])
		})
		return () => {
			map.off()
			map.remove()
		}
	}, [cell, locations])

	*/

	return (
		<>
			<BaseMap>
				{(map) => {
					return null
				}}
			</BaseMap>
			<Button type="button" onClick={() => setLocations([])}>
				reset
			</Button>
		</>
	)
}
