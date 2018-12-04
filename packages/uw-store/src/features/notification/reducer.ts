import {Reducer} from "redux"
import {NotificationState} from "@uw/domain"
import {CLEAR_NOTIFICATIONS, REMOVE_NOTIFICATION, SET_NOTIFICATION} from "./constants"

const initialState: NotificationState = []

export const notificationReducer: Reducer<NotificationState> = (state = initialState, action) => {
  switch (true) {
    case action.type.indexOf(SET_NOTIFICATION) > -1:
      return [...state, action.payload]

    case action.type.indexOf(REMOVE_NOTIFICATION) > -1:
      return state.filter(notification => notification.id !== action.payload)

    case action.type === CLEAR_NOTIFICATIONS:
      return initialState

    default:
      return state
  }
}
