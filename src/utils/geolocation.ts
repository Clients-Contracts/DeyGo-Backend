import axios from 'axios';

const EARTH_RADIUS = 6371; // Radius of Earth in kilometers

// Calculate distance between two coordinates using Haversine formula
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS * c;
};

// Get coordinates from an address using Google Maps Geocoding API
export const getCoordinates = async (address: string): Promise<{ lat: number; lon: number }> => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
    params: {
      address,
      key: apiKey,
    },
  });

  if (response.data.status !== 'OK') {
    throw new Error('Unable to get coordinates for the address.');
  }

  const location = response.data.results[0].geometry.location;
  return {
    lat: location.lat,
    lon: location.lng,
  };
};

// Validate latitude and longitude
export const isValidCoordinates = (lat: number, lon: number): boolean => {
  return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
};
