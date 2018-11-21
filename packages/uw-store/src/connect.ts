// tslint:disable:no-any
import {connectRouter, routerMiddleware} from "connected-react-router"
import {History} from "history"
import {Store, createStore, applyMiddleware} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import {ApplicationState, coreMiddleware, featureMiddleware, rootReducer} from "./types"

export const configureStore = (
  history: History,
  initialState: ApplicationState,
): Store<ApplicationState> => {
  const composeEnhancers = composeWithDevTools({})

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), ...featureMiddleware, ...coreMiddleware),
    ),
  )

  if (process.env.NODE_ENV !== "production") {
    if ((module as any).hot) {
      (module as any).hot.accept("./types", () => {
        store.replaceReducer(rootReducer)
      })
    }
  }

  return store
}
