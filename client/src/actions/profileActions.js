import axios from 'axios';

import {
  GET_PROFILE,
   GET_ERRORS,
   CLEAR_CURRENT_PROFILE
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
 
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const clearCurrentProfile = () => {
    return {
      type: CLEAR_CURRENT_PROFILE
    };
  };
