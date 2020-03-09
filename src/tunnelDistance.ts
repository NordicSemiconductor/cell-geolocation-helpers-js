import { Point } from './cellFromGeolocations'
import { toRadians } from './toRadians'

/**
 * Returns the distance in meters between two coordinates using the "Tunnel Distance" algorithm
 *
 * @see http://www.movable-type.co.uk/scripts/latlong.html
 */
export const tunnelDistance = ({ radius }: { radius: number }) => (
	from: Point,
	to: Point,
) => {
	const φ1 = toRadians(from.lng)
	const φ2 = toRadians(to.lng)
	const λ1 = toRadians(from.lat)
	const λ2 = toRadians(to.lat)

	const Δλ = λ2 - λ1
	const Δφ = φ2 - φ1

	const a =
		Math.pow(Math.sin(Δλ / 2), 2) +
		Math.cos(λ1) * Math.cos(λ2) * Math.pow(Math.sin(Δφ / 2), 2)
	const c = 2 * Math.asin(Math.sqrt(a))

	return c * radius * 1000
}

export const earthTunnelDistance = tunnelDistance({ radius: 6371 })
