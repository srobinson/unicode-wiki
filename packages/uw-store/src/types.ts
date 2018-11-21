import {Action, AnyAction, combineReducers, Dispatch, Reducer} from "redux"
import {routerReducer, RouterState} from "react-router-redux"

import {actionSplitterMiddleware} from "./middleware/core/action-splitter"
import {fetchMiddleware} from "./middleware/core/fetch"
import {loggerMiddleware} from "./middleware/core/logger"
import {normalizeMiddleware} from "./middleware/core/normalize"
import {notificationMiddleware} from "./middleware/features/notification"
import {throttleMiddleware} from "./middleware/core/throttle"
import {
  blocksMiddleware,
  scriptsMiddleware,
  symbolsMiddleware,
} from "./middleware/features/categories"

import {wikiPageMiddleware, wikiSearchMiddleware} from "./middleware/features/wiki"

import {codepointsMiddleware} from "./middleware/features/codepoints"
import {
  blocksReducer,
  BlockState,
  scriptsReducer,
  ScriptState,
  symbolsReducer,
  SymbolState,
} from "./features/categories"
import {codepointReducer, CodepointState} from "./features/codepoints"
import {layoutReducer, LayoutState} from "./features/layout"
import {loaderReducer, Loadingstate} from "./features/loader"
import {notificationReducer, NotificationState} from "./features/notification"
import {wikiPageReducer, WikiPageState} from "./features/wiki-page"
import {wikiSearchReducer, WikiSearchState} from "./features/wiki-search"
// import {undoable} from "./reducerEnhancers/undoable";
// import {stateFreezer} from "./reducer-enhancers/state-freeze";

export interface ApplicationState {
  blocks: BlockState
  codepoints: CodepointState
  layout: LayoutState
  loader: Loadingstate
  notifications: NotificationState
  router: RouterState
  scripts: ScriptState
  symbols: SymbolState
  wikiPage: WikiPageState
  wikiSearch: WikiSearchState
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  blocks: blocksReducer,
  codepoints: codepointReducer,
  layout: layoutReducer,
  loader: loaderReducer,
  notifications: notificationReducer,
  router: routerReducer,
  scripts: scriptsReducer,
  symbols: symbolsReducer,
  wikiPage: wikiPageReducer,
  wikiSearch: wikiSearchReducer,
})

export const featureMiddleware = [
  codepointsMiddleware,
  blocksMiddleware,
  scriptsMiddleware,
  symbolsMiddleware,
  wikiPageMiddleware,
  wikiSearchMiddleware,
]

export const coreMiddleware = [
  actionSplitterMiddleware,
  fetchMiddleware,
  normalizeMiddleware,
  notificationMiddleware,
  loggerMiddleware,
  throttleMiddleware,
]
