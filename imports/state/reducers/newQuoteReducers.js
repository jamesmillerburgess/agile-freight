import { combineReducers } from 'redux';

import { cargo } from './cargoReducers';
import { movement } from './movementReducers';
import { otherServices } from './otherServicesReducers';

export const newQuote = combineReducers({ cargo, movement, otherServices });
