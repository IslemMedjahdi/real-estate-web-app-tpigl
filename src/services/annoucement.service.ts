//import axios from "../constants/axios";

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

  // here put all announcements requests
}

export default AnnouncementService;
