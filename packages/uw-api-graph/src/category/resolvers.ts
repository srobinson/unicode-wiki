// tslint:disable:no-any
import {CategoryDocument} from "@uw/domain"
import {dataSource} from "./datasource"

export const resolvers = {
  Query: {
    async categories(
      _: any,
      {}: any,
      {dataSources}: {dataSources: dataSource},
    ): Promise<CategoryDocument[]> {
      return await dataSources.categoryAPI.getAll()
    },

    async categoryByType(
      _: any,
      {type}: any,
      {dataSources}: {dataSources: dataSource},
    ): Promise<CategoryDocument[]> {
      return await dataSources.categoryAPI.getByType(type)
    },
  },
}
