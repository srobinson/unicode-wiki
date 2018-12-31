import {CategoryAPI} from "./category"
import {CodepointAPI} from "./codepoint"
import {WikiAPI} from "./wiki"

export const dataSources = () => ({
  categoryAPI: new CategoryAPI(),
  codepointAPI: new CodepointAPI(),
  wikiAPI: new WikiAPI(),
})

export interface dataSource {
  categoryAPI: CategoryAPI
  codepointAPI: CodepointAPI
  wikiAPI: WikiAPI
}
