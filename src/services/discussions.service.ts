import { AxiosResponse } from "axios";
import axios from "../constants/axios";
import { Discussions } from "../typings/discussions";

class DiscussionsService {
  private static instance: DiscussionsService;

  public static getInstance(): DiscussionsService {
    if (!this.instance) {
      this.instance = new DiscussionsService();
    }
    return this.instance;
  }

  private async getSendDiscussions() {
    try {
      const response: AxiosResponse<Discussions.DiscussionResume[], any> =
        await axios.get("/discussions/sent");
      return response;
    } catch (e) {
      throw e;
    }
  }

  private async getReceivedDiscussions() {
    try {
      const response: AxiosResponse<Discussions.DiscussionResume[], any> =
        await axios.get("/discussions/received");
      return response;
    } catch (e) {
      throw e;
    }
  }

  public async getReceivedDiscussionById(id: number) {
    try {
      const response: AxiosResponse<Discussions.Discussion, any> =
        await axios.get(`/discussions/received/${id}`);
      return response;
    } catch (e) {
      throw e;
    }
  }

  private async getSentDiscussionById(id: number) {
    try {
      const response: AxiosResponse<Discussions.Discussion, any> =
        await axios.get(`/discussions/sent/${id}`);
      return response;
    } catch (e) {
      throw e;
    }
  }

  public async getDiscussions() {
    try {
      const sentResponse = await this.getSendDiscussions();
      const receivedResponse = await this.getReceivedDiscussions();

      return Promise.all(
        sentResponse.data
          .map(({ id }) => {
            return this.getSentDiscussionById(id);
          })
          .concat(
            receivedResponse.data.map(({ id }) => {
              return this.getReceivedDiscussionById(id);
            })
          )
      ) as Promise<AxiosResponse<Discussions.Discussion, any>[]>;
    } catch (e) {
      throw e;
    }
  }
}

export default DiscussionsService;
