// tslint:disable:no-any
import {dataSource} from "./datasource"

export const resolvers = {
  Query: {
    async suggest(
      _: any,
      {prefix}: any,
      {dataSources}: {dataSources: dataSource},
    ): Promise<String[]> {
      return await dataSources.searchAPI.suggest(prefix)
    },
  },
}
