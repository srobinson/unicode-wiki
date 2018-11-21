import {Middleware} from "redux"
import {API_ERROR, API_SUCCESS, apiRequest} from "../../api"
import {SYMBOLS, FETCH_SYMBOLS, setSymbols} from "../../../features/categories"
import {setLoader} from "../../../features/loader"
import {setNotification} from "../../../features/notification"

// tslint:disable-next-line:no-any
export const symbolsMiddleware: Middleware = () => (next: any) => action => {
  next(action)

  switch (action.type) {
    case FETCH_SYMBOLS:
      next([apiRequest(action.meta), setLoader({state: true, feature: SYMBOLS})])
      break

    case `${SYMBOLS}/${API_SUCCESS}`:
      next([setSymbols({data: action.payload}), setLoader({state: false, feature: SYMBOLS})])
      break

    case `${SYMBOLS}/${API_ERROR}`:
      next([
        setNotification({message: action.payload, feature: SYMBOLS}),
        setLoader({state: false, feature: SYMBOLS}),
      ])
      break
  }
}
