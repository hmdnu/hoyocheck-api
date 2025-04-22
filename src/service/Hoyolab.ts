import HttpRequest from "./HttpRequest";

export default class Hoyolab {
  private httpRequest = new HttpRequest();

  async check(token: string, uid: string) {
    return await this.httpRequest.fetch(token, uid);
  }
}
