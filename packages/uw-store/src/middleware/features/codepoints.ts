import {Middleware} from "redux"
import {API_ERROR, API_SUCCESS, apiRequest} from "../api"
import {CODEPOINTS, FETCH_CODEPOINTS, setCodepoints} from "../../features/codepoints"
import {setLoader} from "../../features/loader"
import {setNotification} from "../../features/notification"

// tslint:disable-next-line:no-any
export const codepointsMiddleware: Middleware = () => (next: any) => action => {
  next(action)

  switch (action.type) {
    case FETCH_CODEPOINTS:
      next([apiRequest(action.meta), setLoader({state: true, feature: CODEPOINTS})])
      break

    case `${CODEPOINTS}/${API_SUCCESS}`:
      next([
        setCodepoints({data: action.payload, purge: action.meta.purge}),
        setLoader({state: false, feature: CODEPOINTS}),
      ])
      break

    case `${CODEPOINTS}/${API_ERROR}`:
      next([
        setNotification({message: action.payload, feature: CODEPOINTS}),
        setLoader({state: false, feature: CODEPOINTS}),
      ])
      break
  }
}
