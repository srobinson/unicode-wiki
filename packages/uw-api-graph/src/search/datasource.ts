import {RESTDataSource} from "apollo-datasource-rest"
import "../config"

const BASE_URL = process.env.REACT_APP_SEARCH_SERVICE_URL

export class SearchAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = BASE_URL
  }

  public async suggest(prefix: string): Promise<String[]> {
    const res = await this.get(`codepoints/suggest/${prefix}`)
    return res
  }
}

export interface dataSource {
  searchAPI: SearchAPI
}
