import {RESTDataSource} from "apollo-datasource-rest"
import {CategoryDocument} from "@uw/domain"

export class CategoryAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = "https://api.unicode.wiki/api/"
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
