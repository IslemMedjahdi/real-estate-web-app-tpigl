import axios from "../constants/axios";

class AnnouncementService {
  private static instance: AnnouncementService;
  public static getInstance(): AnnouncementService {
    if (!this.instance) {
      this.instance = new AnnouncementService();
    }
    return this.instance;
  }

  constructor() {
    console.log("AnnouncementService constructor");
  }

  public async getMyAnnouncements() {
    try {
      const response = await axios.get("/announcements/");
      return response;
    } catch (e) {
      throw e;
    }
  }

  public async deleteAnnouncement(id: number) {
    try {
      const response = await axios.delete(`/announcements/${id}/delete`);
      return response;
    } catch (e) {
      throw e;
    }
  }

  // here put all announcements requests
}

export default AnnouncementService;
