// src
import * as ActionTypes from '../actions'

const initialState = {}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.CREATE_ANNOUNCEMENT_SUCCESS: {
      return { ...state, message: 'Announcement created Successfully' }
    }
    case ActionTypes.CREATE_ANNOUNCEMENT_FAILURE: {
      return { ...state, message: 'Announcement Creation Failed' }
    }
    case ActionTypes.LOAD_ANNOUNCEMENTS_SUCCESS: {
      const { data } = payload
      return { ...state, announcements: data, message: '' }
    }
    case ActionTypes.LOAD_ANNOUNCEMENTS_FAILURE: {
      return { ...state, message: 'Cannot find Announcements' }
    }
    default: {
      return state
    }
  }
}
