import {
    GET_PROFILE,
    CLEAR_CURRENT_PROFILE
  } from '../actions/types';
  
  const initialState = {
    profile: null,

  };
  
  export default function(state = initialState, action) {
    switch (action.type) {

      case GET_PROFILE:
        return {
          ...state,
          profile: action.payload,
          loading: false
        };
        case CLEAR_CURRENT_PROFILE:
        return {
          ...state,
          profile: null,
          loading: false
        };

      default:
        return state;
    }
  }