// @flow weak

import { routerReducer }    from 'react-router-redux';
import { combineReducers }  from 'redux';
import { combineForms } from "react-redux-form";
import views                from './views';
import userAuth             from './userAuth';
import leaderboardData             from './leaderboardData';
import { initialFormState } from "./formInitialValues";


export const reducers = {
  views,
  leaderboardData,
  userAuth
};

export default combineReducers({
  ...reducers,
  formData: combineForms(initialFormState, "formData"),
  routing: routerReducer
});
