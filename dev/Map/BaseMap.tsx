import L from 'leaflet'
import React, { useEffect, useRef, useState } from 'react'

export const BaseMap = ({
	children,
}: {
	children: (map: L.Map) => React.ReactElement
}) => {
	const mapRef = useRef(null)
	const [map, setMap] = useState<L.Map>()

	useEffect(() => {
		const map = L.map(mapRef.current).setView([63.4210966, 10.4378928], 13)
		// add the OpenStreetMap tiles
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution:
				'&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
		}).addTo(map)

		setMap(map)

		return () => {
			map.off()
			map.remove()
		}
	}, [mapRef])

	return (
		<>
			<div ref={mapRef} style={{ width: '100%', height: '100%' }} />
			{children(map)}
		</>
	)
}
