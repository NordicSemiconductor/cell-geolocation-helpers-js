import { earthTunnelDistance } from './tunnelDistance'

describe('tunnelDistance', () => {
	it.each([
		[
			{
				lat: 63.421011452408585,
				lng: 10.437140464782717,
			},
			{
				lat: 59.91958370128146,
				lng: 10.686779022216799,
			},
			389562.98991027416,
		],
	])('calculates the distance from %s to %s to be %d', (from, to, distance) =>
		expect(earthTunnelDistance(from, to)).toEqual(distance),
	)
})
