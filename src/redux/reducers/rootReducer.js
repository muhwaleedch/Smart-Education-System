import {combineReducers} from 'redux';
import newsReducer from './newsReducer';
import userReducer from './user';

const rootReducer = combineReducers({
  newsDetails: newsReducer,
  userInfo: userReducer,
});

export default rootReducer;