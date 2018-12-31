import {RESTDataSource} from "apollo-datasource-rest"
import {CategoryDocument} from "@uw/domain"
import "../config"

const BASE_URL = process.env.REACT_APP_API_BASE_URL

export class CategoryAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = BASE_URL
  }

  public async getAll(): Promise<CategoryDocument[]> {
    const res = await this.get("categories")
    return res
  }

  public async getByType(type: string): Promise<CategoryDocument[]> {
    const res = await this.get(type)
    return res
  }
}

export interface dataSource {
  categoryAPI: CategoryAPI
}
