// tslint:disable:no-any
import {PaginatedCodepointResult} from "@uw/domain"
import {dataSource} from "./datasource"

export const resolvers = {
  Query: {
    async codepoints(
      _: any,
      {},
      {dataSources}: {dataSources: dataSource},
    ): Promise<PaginatedCodepointResult> {
      return await dataSources.codepointAPI.getAll()
    },

    async codepointByUCP(_: any, {ucp}: any, {dataSources}: {dataSources: dataSource}) {
      return await dataSources.codepointAPI.getByUCP(ucp)
    },

    async codepointsByCategoryId(
      _: any,
      {category, id, page = 1}: any,
      {dataSources}: {dataSources: dataSource},
    ): Promise<PaginatedCodepointResult> {
      return await dataSources.codepointAPI.getByCategoryId(category, id, page)
    },

    async suggest(
      _: any,
      {prefix}: any,
      {dataSources}: {dataSources: dataSource},
    ): Promise<String[]> {
      return await dataSources.codepointAPI.suggest(prefix)
    },

    async search(
      _: any,
      {q}: any,
      {dataSources}: {dataSources: dataSource},
    ): Promise<PaginatedCodepointResult> {
      return await dataSources.codepointAPI.search(q)
    },
  },
}
