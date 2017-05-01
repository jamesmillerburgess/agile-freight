import { combineReducers } from 'redux';
import 'react-select/dist/react-select.css';

import * as reducers from './reducers/reducers';

const app = combineReducers(reducers);

export default app;
