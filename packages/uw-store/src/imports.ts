import {combineReducers, Reducer} from "redux"
import {routerReducer, RouterState} from "react-router-redux"
import * as core from "./middleware/core"
import {blocksReducer, scriptsReducer, symbolsReducer} from "./features/categories"
import {codepointReducer} from "./features/codepoints"
import {layoutReducer} from "./features/layout"
import {loaderReducer} from "./features/loader"
import {notificationReducer} from "./features/notification"
import {suggestReducer} from "./features/suggest"
import {wikiPageReducer} from "./features/wiki-page"
import {wikiSearchReducer} from "./features/wiki-search"

import {
  BlockState,
  CodepointState,
  LayoutState,
  LoadingState,
  NotificationState,
  ScriptState,
  SuggestState,
  SymbolState,
  WikiPageState,
  WikiSearchState,
} from "@uw/domain"

export interface ApplicationState {
  blocks: BlockState
  codepoints: CodepointState
  layout: LayoutState
  loader: LoadingState
  notifications: NotificationState
  router: RouterState
  scripts: ScriptState
  suggest: SuggestState
  symbols: SymbolState
  wikiPage: WikiPageState
  wikiSearch: WikiSearchState
}

// remove __esModule: true definition from array
export const coreMiddleware = Object.values(core).splice(1)

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  blocks: blocksReducer,
  codepoints: codepointReducer,
  layout: layoutReducer,
  loader: loaderReducer,
  notifications: notificationReducer,
  router: routerReducer,
  scripts: scriptsReducer,
  suggest: suggestReducer,
  symbols: symbolsReducer,
  wikiPage: wikiPageReducer,
  wikiSearch: wikiSearchReducer,
})
