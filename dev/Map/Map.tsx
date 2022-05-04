import L from 'leaflet'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { cellFromGeolocations } from '../../src/cellFromGeolocations'

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

const marker = L.icon({
	iconUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
	iconSize: [25, 41],
	iconAnchor: [12.5, 41],
})

export const Map = () => {
	const [locations, setLocations] = useState<{ lat: number; lng: number }[]>([])
	const cell = calculateCell(locations)
	const mapDiv = useRef<HTMLDivElement>(null)
	const mapRef = useRef<L.Map>()
	const cellLayerRef = useRef<L.LayerGroup>()
	const markerLayerRef = useRef<L.LayerGroup>()

	// Init map
	useEffect(() => {
		if (mapDiv.current === null) return
		mapRef.current = L.map(mapDiv.current).setView([63.4210966, 10.4378928], 13)
		// add the OpenStreetMap tiles
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution:
				'&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
		}).addTo(mapRef.current)

		mapRef.current.on('click', (event: { latlng: L.LatLng }) => {
			setLocations((loc) => [...loc, event.latlng])
		})

		// Init layers
		cellLayerRef.current = L.layerGroup().addTo(mapRef.current)
		markerLayerRef.current = L.layerGroup().addTo(mapRef.current)

		return () => {
			mapRef.current?.off()
			mapRef.current?.remove()
		}
	}, [mapDiv])

	// Draw cell layer
	useEffect(() => {
		cellLayerRef.current?.clearLayers()
		if (cell === undefined || cellLayerRef.current === undefined) return
		L.circle([cell.lat, cell.lng], { radius: cell?.accuracy / 2 }).addTo(
			cellLayerRef.current,
		)
	}, [cell])

	// Draw markers
	useEffect(() => {
		markerLayerRef.current?.clearLayers()
		if (markerLayerRef.current === undefined) return
		for (const location of locations) {
			L.marker([location.lat, location.lng], {
				icon: marker,
			}).addTo(markerLayerRef.current)
		}
	}, [locations])

	return (
		<>
			<div ref={mapDiv} style={{ width: '100%', height: '100%' }} />
			<Button type="button" onClick={() => setLocations([])}>
				reset
			</Button>
		</>
	)
}
