import React, { useState } from 'react'
import { Map as LeafletMap, LeafletMouseEvent } from 'leaflet'
import {
	MapContainer,
	TileLayer,
	Marker,
	Circle,
	useMapEvents,
} from 'react-leaflet'
import styled from 'styled-components'
import { cellFromGeolocations } from '../../src/cellFromGeolocations'
import { isSome } from 'fp-ts/lib/Option'
import Leaflet from 'leaflet'
import marker from 'leaflet/dist/images/marker-icon.png'

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

const EventHandler = ({
	onClick,
}: {
	onClick: (args: { event: LeafletMouseEvent; map: LeafletMap }) => void
}) => {
	const map = useMapEvents({
		click: (event) => onClick({ event, map }),
	})
	return null
}

export const Map = () => {
	const [locations, setLocations] = useState<{ lat: number; lng: number }[]>([])
	const cell = calculateCell(locations)

	return (
		<>
			<MapContainer center={[63.4210966, 10.4378928]} zoom={13}>
				<EventHandler
					onClick={({ event }) => {
						setLocations((loc) => [...loc, event.latlng])
					}}
				/>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{locations.map((location, i) => (
					<Marker
						key={i}
						position={location}
						icon={Leaflet.icon({
							iconUrl: marker,
							iconSize: [25, 41],
							iconAnchor: [12.5, 41],
						})}
					/>
				))}
				{isSome(cell) && (
					<Circle center={cell.value} radius={cell.value.accuracy / 2} />
				)}
			</MapContainer>
			<Button onClick={() => setLocations([])}>reset</Button>
		</>
	)
}
