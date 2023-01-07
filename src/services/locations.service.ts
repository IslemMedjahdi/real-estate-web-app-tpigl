import axios from "../constants/axios";

class LocationService {
  private static instance: LocationService;

  public static getInstance(): LocationService {
    if (!this.instance) {
      this.instance = new LocationService();
    }
    return this.instance;
  }

  public async getCommunes(wilaya: string) {
    try {
      const response = await axios.get(`/locations/get-communes/${wilaya}`);
      return response;
    } catch (e) {
      throw e;
    }
  }
}

export default LocationService;
