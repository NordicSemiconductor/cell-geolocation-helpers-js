import { toRadians } from './toRadians'

describe('toRadians', () => {
	it.each([
		[0, 0],
		[180, Math.PI],
		[-180, -Math.PI],
		[360, 2 * Math.PI],
	])('should convert %d degrees to %d radians', (deg, rad) =>
		expect(toRadians(deg)).toEqual(rad),
	)
})
