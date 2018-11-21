import {Reducer} from "redux"
import {NotificationState, REMOVE_NOTIFICATION, SET_NOTIFICATION} from "./types"

const initialState: NotificationState = []

const reducer: Reducer<NotificationState> = (state = initialState, action) => {
  switch (true) {
    case action.type.includes(SET_NOTIFICATION):
      return [...state, action.payload]

    case action.type.includes(REMOVE_NOTIFICATION):
      return state.filter(notification => notification.id !== action.payload)

    default:
      return state
  }
}

export {reducer as notificationReducer}
