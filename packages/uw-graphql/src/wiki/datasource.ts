import {RESTDataSource} from "apollo-datasource-rest"
import {WikiPage} from "@uw/domain"

export class WikiAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = "https://api.unicode.wiki/api/"
  }

  public async getPage(ucp: string, isMobile?: boolean): Promise<WikiPage> {
    let url = `wiki/page?cp=${ucp}`
    if (isMobile) {
      url += "&isMobile"
    }
    const res = await this.get(url)
    return res
  }
}

export interface dataSource {
  wikiAPI: WikiAPI
}
