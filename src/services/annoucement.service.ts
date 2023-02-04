import axios from "../constants/axios";
import { Announcement } from "../typings/announcement";
import { formatDate } from "../utils/lib";

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

  public async createAnnouncement(data: FormData) {
    try {
      const response = await axios.postForm("/announcements/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

  public async getAnnouncementById(id: number) {
    try {
      const response = await axios.get(`/announcements/${id}`);
      return response;
    } catch (e) {
      throw e;
    }
  }

  public async getAllAnnouncements(
    page: number,
    filters: Announcement.AnnouncementFilters
  ) {
    const {
      search,
      commune,
      createAtStart,
      createdAtEnd,
      type,
      wilaya,
      end_price,
      start_price,
    } = filters;
    try {
      const response = await axios.get("/announcements/all", {
        params: {
          page,
          q: search,
          type,
          wilaya,
          commune,
          start_date: createAtStart ? formatDate(createAtStart) : undefined,
          end_date: createdAtEnd ? formatDate(createdAtEnd) : undefined,
          start_price,
          end_price,
        },
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

  public async scrapAnnouncement() {
    try {
      const response = await axios.get("admin/get-online");
      return response;
    } catch (e) {
      throw e;
    }
  }

  public async createAnnouncementFromScrap(
    data: Announcement.AnnouncementScrap
  ) {
    try {
      const response = await axios.post(
        "/announcements/create-from-scrapp",
        data
      );
      return response;
    } catch (e) {
      throw e;
    }
  }
}

export default AnnouncementService;
