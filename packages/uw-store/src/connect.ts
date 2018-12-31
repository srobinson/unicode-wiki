import {Store, applyMiddleware, createStore} from "redux"
import {connectRouter, routerMiddleware} from "connected-react-router"
import {composeWithDevTools} from "redux-devtools-extension"
import {History} from "history"
import {ApplicationState, coreMiddleware, rootReducer} from "./imports"

export const configureStore = (
  history: History,
  initialState: ApplicationState,
): Store<ApplicationState> => {
  const composeEnhancers = composeWithDevTools({})

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), ...coreMiddleware)),
  )

  if (process.env.NODE_ENV === "development") {
    // @ts-ignore
    if (module.hot) {
      // @ts-ignore
      module.hot.accept("./imports", () => {
        store.replaceReducer(rootReducer)
      })
    }
  }

  return store
}
