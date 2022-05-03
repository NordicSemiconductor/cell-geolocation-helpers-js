import distance from '@turf/distance'

const calculateDistance = (from: Point, to: Point): number =>
	distance([from.lat, from.lng], [to.lat, to.lng], { units: 'meters' })

const byNumericValue = (a: number, b: number) => a - b
const sum = (total: number, v: number) => total + v

export type Point = { lat: number; lng: number }
export type CellGeoLocation = Point & { accuracy: number }

/**
 * Calculates a cell geo location based on a list of geo locations:
 *
 * - the center is the average of all given locations (within a configurable percentile)
 * - the diameter returned is a circle that includes all given locations (within a configurable percentile), but at least `minCellDiameterInMeters`.
 */
export const cellFromGeolocations =
	({
		minCellDiameterInMeters,
		percentile,
	}: {
		minCellDiameterInMeters: number
		percentile: number
	}) =>
	(locations: Point[]): CellGeoLocation | undefined => {
		if (!locations.length) return undefined
		if (locations.length === 1)
			return {
				lat: locations[0].lat,
				lng: locations[0].lng,
				accuracy: minCellDiameterInMeters,
			}

		// Location is average of the given percentile of all positions
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

		// Calculate largest distance, but filter out the given percentile
		const distances = locations
			.map((d) => calculateDistance(center, d))
			.sort(byNumericValue)
		const significantLargestEntry = Math.floor(locations.length * percentile)

		const accuracy = Math.max(
			minCellDiameterInMeters,
			distances[significantLargestEntry],
		)

		return {
			...center,
			accuracy,
		}
	}
