import {RESTDataSource} from "apollo-datasource-rest"
import {CodepointDocument, PaginatedCodepointResult} from "@uw/domain"
import "../config"

const BASE_URL = process.env.REACT_APP_API_BASE_URL

export class CodepointAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = BASE_URL
  }

  public async getByUCP(ucp: string): Promise<CodepointDocument> {
    const res = await this.get(`codepoint/${ucp}`)
    return res
  }

  public async getAll(): Promise<PaginatedCodepointResult> {
    const res = await this.get("codepoints")
    return res
  }

  public async getByCategoryKey(
    category: string,
    key: string,
    page: number = 1,
  ): Promise<PaginatedCodepointResult> {
    const res = await this.get(`${category}/${key}/codepoints?page=${page}`)
    return res
  }

  public async search(q: string): Promise<PaginatedCodepointResult> {
    const res = await this.get(`search?q=${q}`)
    return res
  }
}

export interface dataSource {
  codepointAPI: CodepointAPI
}
