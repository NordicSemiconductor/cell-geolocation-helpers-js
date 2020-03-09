import React, { createRef, useState } from 'react'
import { Map as LeafletMap, TileLayer, Marker, Circle } from 'react-leaflet'
import styled from 'styled-components'
import { cellFromGeolocations } from '../../src/cellFromGeolocations'
import { isSome } from 'fp-ts/lib/Option'

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
	const mapRef = createRef<LeafletMap>()
	const [locations, setLocations] = useState<{ lat: number; lng: number }[]>([])
	const cell = calculateCell(locations)

	return (
		<>
			<LeafletMap
				center={[63.4210966, 10.4378928]}
				zoom={13}
				ref={mapRef}
				onclick={e => {
					setLocations(loc => [...loc, e.latlng])
				}}
			>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{locations.map((location, i) => (
					<Marker
						key={i}
						position={location}
						onclick={() => {
							setLocations(loc => [...loc.slice(0, i), ...loc.slice(i + 1)])
						}}
					/>
				))}
				{isSome(cell) && (
					<Circle center={cell.value} radius={cell.value.accuracy / 2} />
				)}
			</LeafletMap>
			<Button onClick={() => setLocations([])}>reset</Button>
		</>
	)
}
