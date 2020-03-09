import { Option, none, some } from 'fp-ts/lib/Option'
import { earthTunnelDistance } from './tunnelDistance'

const byNumericValue = (a: number, b: number) => a - b
const sum = (total: number, v: number) => total + v

export type Point = { lat: number; lng: number }
export type CellGeoLocation = Point & { accuracy: number }

export const cellFromGeolocations = ({
	minCellDiameterInMeters,
	percentile,
}: {
	minCellDiameterInMeters: number
	percentile: number
}) => (locations: Point[]): Option<CellGeoLocation> => {
	if (!locations.length) return none
	if (locations.length === 1)
		return some({
			lat: locations[0].lat,
			lng: locations[0].lng,
			accuracy: minCellDiameterInMeters,
		})

	// Location is average of P=.9 of all positions
	const lats = locations.map(({ lat }) => lat + 90).sort(byNumericValue)
	const lngs = locations.map(({ lng }) => lng + 180).sort(byNumericValue)
	const entriesToConsider = Math.round(locations.length * percentile)
	const start = Math.floor((locations.length - entriesToConsider) / 2)
	const center = {
		lat:
			lats.slice(start, start + entriesToConsider).reduce(sum, 0) /
				entriesToConsider -
			90,
		lng:
			lngs.slice(start, start + entriesToConsider).reduce(sum, 0) /
				entriesToConsider -
			180,
	}

	// Calculate largest distance, but filter out extremes P=.9
	const distances = locations
		.map(d => earthTunnelDistance(center, d))
		.sort(byNumericValue)
	const significantLargestEntry = Math.floor(locations.length * percentile)

	const accuracy = Math.max(
		minCellDiameterInMeters,
		distances[significantLargestEntry] * 2,
	)

	return some({
		...center,
		accuracy,
	})
}
