import {Middleware} from "redux"
import {API_ERROR, API_SUCCESS, apiRequest} from "../../api"
import {WIKI_PAGE, FETCH_WIKI_PAGE, setWikiPage} from "../../../features/wiki-page"
import {setLoader} from "../../../features/loader"
import {setNotification} from "../../../features/notification"

// tslint:disable-next-line:no-any
export const wikiPageMiddleware: Middleware = () => (next: any) => action => {
  next(action)

  switch (action.type) {
    case FETCH_WIKI_PAGE:
      next([apiRequest(action.meta), setLoader({state: true, feature: WIKI_PAGE})])
      break

    case `${WIKI_PAGE}/${API_SUCCESS}`:
      next([setWikiPage({data: action.payload}), setLoader({state: false, feature: WIKI_PAGE})])
      break

    case `${WIKI_PAGE}/${API_ERROR}`:
      next([
        setNotification({message: action.payload, feature: WIKI_PAGE}),
        setLoader({state: false, feature: WIKI_PAGE}),
      ])
      break
  }
}
