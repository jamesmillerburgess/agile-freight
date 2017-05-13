import { combineReducers } from 'redux';

import { cargo } from './cargoReducers';
import { movement } from './movementReducers';
import { otherServices } from './otherServicesReducers';
import { charges } from './chargesReducers';

export const newQuote = combineReducers({ cargo, movement, otherServices, charges });
