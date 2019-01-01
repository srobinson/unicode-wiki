import {CategoryAPI} from "./category"
import {CodepointAPI} from "./codepoint"
import {SearchAPI} from "./search"
import {WikiAPI} from "./wiki"

export const dataSources = () => ({
  categoryAPI: new CategoryAPI(),
  codepointAPI: new CodepointAPI(),
  searchAPI: new SearchAPI(),
  wikiAPI: new WikiAPI(),
})

export interface dataSource {
  categoryAPI: CategoryAPI
  codepointAPI: CodepointAPI
  searchAPI: SearchAPI
  wikiAPI: WikiAPI
}
