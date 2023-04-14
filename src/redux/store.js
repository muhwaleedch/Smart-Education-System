import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import {persistStore} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';
import {useDispatch as useReduxDispatch, useSelector as useReduxSelector,} from 'react-redux';

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export const persistor = persistStore(store);
export const useSelector = useReduxSelector;
export const useDispatch = () => useReduxDispatch();

export default store;
