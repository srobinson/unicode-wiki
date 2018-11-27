// import {Action, AnyAction, Dispatch, Store, applyMiddleware, createStore} from "redux"
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

  if (process.env.NODE_ENV !== "production") {
    // tslint:disable-next-line:no-any
    let m = module as any
    if (m.hot) {
      m.hot.accept("./types", () => {
        store.replaceReducer(rootReducer)
      })
    }
  }

  return store
}

// export interface ConnectedReduxProps<A extends Action = AnyAction> {
//   dispatch: Dispatch<A>
// }
