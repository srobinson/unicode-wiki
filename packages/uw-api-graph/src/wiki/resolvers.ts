// tslint:disable:no-any
import {WikiPage} from "@uw/domain"
import {dataSource} from "./datasource"

export const resolvers = {
  Query: {
    async wikiPage(
      _: any,
      {ucp, page, isMobile}: any,
      {dataSources}: {dataSources: dataSource},
    ): Promise<WikiPage> {
      return await dataSources.wikiAPI.getPage(ucp, page, isMobile)
    },
  },
}
