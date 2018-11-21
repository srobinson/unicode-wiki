import {Middleware} from "redux"
import {API_ERROR, API_SUCCESS, apiRequest} from "../../api"
import {BLOCKS, FETCH_BLOCKS, setBlocks} from "../../../features/categories"
import {setLoader} from "../../../features/loader"
import {setNotification} from "../../../features/notification"

// tslint:disable-next-line:no-any
export const blocksMiddleware: Middleware = () => (next: any) => action => {
  next(action)

  switch (action.type) {
    case FETCH_BLOCKS:
      next([apiRequest(action.meta), setLoader({state: true, feature: BLOCKS})])
      break

    case `${BLOCKS}/${API_SUCCESS}`:
      next([setBlocks({data: action.payload}), setLoader({state: false, feature: BLOCKS})])
      break

    case `${BLOCKS}/${API_ERROR}`:
      next([
        setNotification({message: action.payload, feature: BLOCKS}),
        setLoader({state: false, feature: BLOCKS}),
      ])
      break
  }
}
