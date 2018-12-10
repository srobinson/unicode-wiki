import {Middleware} from "redux"
import {API_ERROR, API_SUCCESS, apiRequest} from "../api"
import {setLoader} from "../../features/loader"
import {setNotification} from "../../features/notification"

// tslint:disable-next-line:no-any
export const actionMiddleware: Middleware = () => (next: any) => action => {
  next(action)
  const feature = (action.meta && action.meta.feature) || "@@SKIP_UNKNOWN_MIDDLEWARE"

  switch (action.type) {
    case `${feature}/FETCH`:
      const skipLoading = action.meta.skipLoading
      next([apiRequest(action.meta), setLoader({state: skipLoading ? false : true, feature})])
      break

    case `${feature}/${API_SUCCESS}`:
      next([action.meta.success(action), setLoader({state: false, feature})])
      break

    case `${feature}/${API_ERROR}`:
      next([
        setNotification({message: action.payload, feature}),
        setLoader({state: false, feature: action.meta.feature}),
      ])
      break
  }
}
