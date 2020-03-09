import { isNone, isSome, Some } from 'fp-ts/lib/Option'
import { cellFromGeolocations, CellGeoLocation } from './cellFromGeolocations'

const c = cellFromGeolocations({
	minCellDiameterInMeters: 5000,
	percentile: 0.9,
})
describe('cellFromGeolocations', () => {
	it('returns none if no geo locations are given', () =>
		expect(isNone(c([]))).toBeTruthy())

	it('returns the cell location with the typical cell size as accuracy, if only one geo location is given', () => {
		const l = c([
			{
				lat: 45,
				lng: 90,
			},
		]) as Some<CellGeoLocation>
		expect(isSome(l)).toBeTruthy()
		expect(l.value.lat).toEqual(45)
		expect(l.value.lng).toEqual(90)
		expect(l.value.accuracy).toEqual(5000)
	})

	it('returns the location based on averages if more than one geo location', () => {
		const l = c([
			{
				lat: 17,
				lng: 90,
			},
			{
				lat: 42,
				lng: 135,
			},
		]) as Some<CellGeoLocation>
		expect(isSome(l)).toBeTruthy()
		expect(l.value.lat).toEqual((17 + 42) / 2)
		expect(l.value.lng).toEqual((90 + 135) / 2)
	})

	describe('it calculates the cell size based the reported cell geolocations', () => {
		test('the default minimum cell size can be configured', () => {
			const l = cellFromGeolocations({
				minCellDiameterInMeters: 5000,
				percentile: 0.9,
			})([
				{
					lat: 17,
					lng: 90,
				},
				{
					lat: 17,
					lng: 90.00001,
				},
			]) as Some<CellGeoLocation>
			expect(l.value.accuracy).toEqual(5000)
		})
		test('diameter will be expanded to include the given geo locations', () => {
			const l = cellFromGeolocations({
				minCellDiameterInMeters: 5000,
				percentile: 0.9,
			})([
				{
					lat: 17,
					lng: 90,
				},
				{
					lat: 17,
					lng: 91,
				},
			]) as Some<CellGeoLocation>
			expect(l.value.accuracy).toEqual(106336.20834628474)
		})
	})

	it.only('considers only a configurable percentile of geo locations', () => {
		const c50 = cellFromGeolocations({
			minCellDiameterInMeters: 5000,
			percentile: 0.5,
		})
		const l = c50([
			{
				lat: 17,
				lng: 90,
			},
			{
				lat: 42,
				lng: 135,
			},
			{
				lat: 95,
				lng: 218,
			},
		]) as Some<CellGeoLocation>
		expect(isSome(l)).toBeTruthy()
		expect(l.value.lat).toEqual((17 + 42) / 2)
		expect(l.value.lng).toEqual((90 + 135) / 2)
	})
})
