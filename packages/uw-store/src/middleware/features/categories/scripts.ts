import {Middleware} from "redux"
import {API_ERROR, API_SUCCESS, apiRequest} from "../../api"
import {SCRIPTS, FETCH_SCRIPTS, setScripts} from "../../../features/categories"
import {setLoader} from "../../../features/loader"
import {setNotification} from "../../../features/notification"

// tslint:disable-next-line:no-any
export const scriptsMiddleware: Middleware = () => (next: any) => action => {
  next(action)

  switch (action.type) {
    case FETCH_SCRIPTS:
      next([apiRequest(action.meta), setLoader({state: true, feature: SCRIPTS})])
      break

    case `${SCRIPTS}/${API_SUCCESS}`:
      next([setScripts({data: action.payload}), setLoader({state: false, feature: SCRIPTS})])
      break

    case `${SCRIPTS}/${API_ERROR}`:
      next([
        setNotification({message: action.payload, feature: SCRIPTS}),
        setLoader({state: false, feature: SCRIPTS}),
      ])
      break
  }
}
