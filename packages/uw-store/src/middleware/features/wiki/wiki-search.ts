import {Middleware} from "redux"
import {API_ERROR, API_SUCCESS, apiRequest} from "../../api"
import {WIKI_SEARCH, FETCH_WIKI_SEARCH, setWikiSearch} from "../../../features/wiki-search"
import {setLoader} from "../../../features/loader"
import {setNotification} from "../../../features/notification"

// tslint:disable-next-line:no-any
export const wikiSearchMiddleware: Middleware = () => (next: any) => action => {
  next(action)

  switch (action.type) {
    case FETCH_WIKI_SEARCH:
      next([apiRequest(action.meta), setLoader({state: true, feature: WIKI_SEARCH})])
      break

    case `${WIKI_SEARCH}/${API_SUCCESS}`:
      next([setWikiSearch({data: action.payload}), setLoader({state: false, feature: WIKI_SEARCH})])
      break

    case `${WIKI_SEARCH}/${API_ERROR}`:
      next([
        setNotification({message: action.payload, feature: WIKI_SEARCH}),
        setLoader({state: false, feature: WIKI_SEARCH}),
      ])
      break
  }
}
