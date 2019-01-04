import {RESTDataSource} from "apollo-datasource-rest"
import {WikiPage} from "@uw/domain"
import "../config"

const BASE_URL = process.env.REACT_APP_WIKI_SERVICE_URL

export class WikiAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = BASE_URL
  }

  public async getPage(ucp: string, page: string, isMobile?: boolean): Promise<WikiPage> {
    let url = `wiki/page?cp=${ucp}&page=${page}`
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
