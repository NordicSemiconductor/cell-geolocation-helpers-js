import distance from "../_snowpack/pkg/@turf/distance.js";
const calculateDistance = (from, to) => distance([from.lat, from.lng], [to.lat, to.lng], {units: "meters"});
const byNumericValue = (a, b) => a - b;
const sum = (total, v) => total + v;
export const cellFromGeolocations = ({
  minCellDiameterInMeters,
  percentile
}) => (locations) => {
  if (!locations.length)
    return void 0;
  if (locations.length === 1)
    return {
      lat: locations[0].lat,
      lng: locations[0].lng,
      accuracy: minCellDiameterInMeters
    };
  const lats = locations.map(({lat}) => lat + 90).sort(byNumericValue);
  const lngs = locations.map(({lng}) => lng + 180).sort(byNumericValue);
  const entriesToConsider = Math.round(locations.length * percentile);
  const start = Math.floor((locations.length - entriesToConsider) / 2);
  const center = {
    lat: lats.slice(start, start + entriesToConsider).reduce(sum, 0) / entriesToConsider - 90,
    lng: lngs.slice(start, start + entriesToConsider).reduce(sum, 0) / entriesToConsider - 180
  };
  const distances = locations.map((d) => calculateDistance(center, d)).sort(byNumericValue);
  const significantLargestEntry = Math.floor(locations.length * percentile);
  const accuracy = Math.max(minCellDiameterInMeters, distances[significantLargestEntry]);
  return {
    ...center,
    accuracy
  };
};
