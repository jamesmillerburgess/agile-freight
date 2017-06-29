import { Match } from 'meteor/check';
import PropTypes from 'prop-types';

export const ratePropTypes = PropTypes.shape({
  type: PropTypes.string,
  chargeCode: PropTypes.string,
  level: PropTypes.string,
  route: PropTypes.string,
  isSplitByCargoType: PropTypes.bool,
  anyBasis: PropTypes.string,
  anyRanges: PropTypes.arrayOf(PropTypes.string),
  anyMinimumAmount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  isAnyPriceFixed: PropTypes.bool,
  looseBasis: PropTypes.string,
  looseRanges: PropTypes.arrayOf(PropTypes.string),
  looseMinimumAmount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  isLoosePriceFixed: PropTypes.bool,
  containerizedBasis: PropTypes.string,
  containerizedRanges: PropTypes.arrayOf(PropTypes.string),
  containerizedMinimumAmount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  isContainerizedPriceFixed: PropTypes.bool,
  ranges: PropTypes.objectOf(PropTypes.shape({
    maximumUnits: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    unitPrice: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  })),
  currency: PropTypes.string,
});

export const rateSchema = {
  _id: Match.Maybe(String),
  type: String,
  chargeCode: String,
  level: String,
  route: String,
  isSplitByCargoType: Boolean,
  anyBasis: String,
  anyRanges: [String],
  anyMinimumAmount: Number,
  isAnyPriceFixed: Boolean,
  looseBasis: String,
  looseRanges: [String],
  looseMinimumAmount: Number,
  isLoosePriceFixed: Boolean,
  containerizedBasis: String,
  containerizedRanges: [String],
  containerizedMinimumAmount: Number,
  isContainerizedPriceFixed: Boolean,
  ranges: Object,
  currency: String,
};

export const toNumber = (string) => {
  if (string === '') {
    return NaN;
  }
  return +string;
};

export const rateCastTypes = (rate) => {
  const result = Object.assign({}, rate);
  result.anyMinimumAmount = toNumber(result.anyMinimumAmount);
  result.looseMinimumAmount = toNumber(result.looseMinimumAmount);
  result.containerizedMinimumAmount = toNumber(result.containerizedMinimumAmount);
  Object.keys(result.ranges).forEach((key) => {
    result.ranges[key].unitPrice = toNumber(result.ranges[key].unitPrice);
    result.ranges[key].maximumUnits = toNumber(result.ranges[key].maximumUnits);
  });
  return result;
};

const Rate = {
  propTypes: ratePropTypes,
  schema: rateSchema,
  castTypes: rateCastTypes,
};

export default Rate;
