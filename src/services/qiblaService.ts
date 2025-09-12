import { Geolocation } from '@capacitor/geolocation';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface QiblaData {
  direction: number;
  distance: number;
  accuracy: 'high' | 'medium' | 'low';
}

class QiblaService {
  private readonly MECCA_COORDS = {
    latitude: 21.4225,
    longitude: 39.8262,
  };

  async getCurrentPosition(): Promise<Coordinates> {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });

      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting current position:', error);
      throw new Error('Unable to get current location');
    }
  }

  calculateQiblaDirection(userCoords: Coordinates): QiblaData {
    const { latitude: userLat, longitude: userLng } = userCoords;
    const { latitude: meccaLat, longitude: meccaLng } = this.MECCA_COORDS;

    // Convert degrees to radians
    const lat1 = this.toRadians(userLat);
    const lat2 = this.toRadians(meccaLat);
    const deltaLng = this.toRadians(meccaLng - userLng);

    // Calculate bearing (direction to Mecca)
    const y = Math.sin(deltaLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);
    
    let bearing = Math.atan2(y, x);
    bearing = this.toDegrees(bearing);
    bearing = (bearing + 360) % 360; // Normalize to 0-360

    // Calculate distance
    const distance = this.calculateDistance(userCoords, this.MECCA_COORDS);

    // Determine accuracy based on distance (closer = more accurate compass needed)
    let accuracy: 'high' | 'medium' | 'low' = 'medium';
    if (distance < 1000) accuracy = 'high';
    else if (distance > 5000) accuracy = 'low';

    return {
      direction: bearing,
      distance,
      accuracy,
    };
  }

  private calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
    const R = 6371; // Earth's radius in kilometers
    const lat1 = this.toRadians(coord1.latitude);
    const lat2 = this.toRadians(coord2.latitude);
    const deltaLat = this.toRadians(coord2.latitude - coord1.latitude);
    const deltaLng = this.toRadians(coord2.longitude - coord1.longitude);

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private toDegrees(radians: number): number {
    return radians * (180 / Math.PI);
  }

  formatDistance(distance: number): string {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    } else if (distance < 1000) {
      return `${Math.round(distance)}km`;
    } else {
      return `${Math.round(distance / 1000)}k km`;
    }
  }
}

export const qiblaService = new QiblaService();