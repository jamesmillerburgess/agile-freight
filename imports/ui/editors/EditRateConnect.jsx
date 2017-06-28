import { connect } from 'react-redux';
import { Mongo } from 'meteor/mongo';

import EditRate from './EditRate.jsx';
import * as actions from '../../state/actions/rateActionCreators';

import { Rates } from '../../api/rates/rateCollection';

const mapStateToProps = ({ rate }) => ({ rate });

const mapDispatchToProps = (dispatch, ownProps) => {
  if (ownProps.editMode) {
    const rate = Rates.findOne(ownProps.match.params.rateId);
    dispatch(actions.loadRate(rate));
  } else {
    dispatch(actions.loadRate({
      type: 'sell',
      chargeCode: '',
      level: '',
      route: '',
      basis: '',
      unitPrice: 0,
      currency: '',
    }));
  }
  return {
    dispatchers: {
      loadRate: rate => dispatch(actions.loadRate(rate)),
      onChangeRateType: type => dispatch(actions.setRateType(type)),
      onChangeRateChargeCode: chargeCode =>
        dispatch(actions.setRateChargeCode(chargeCode)),
      onChangeRateLevel: level => dispatch(actions.setRateLevel(level)),
      onChangeRateRoute: route => dispatch(actions.setRateRoute(route)),
      onChangeIsSplitByCargoType: () => dispatch(actions.toggleRateIsSplitByCargoType()),
      onChangeAnyBasis: basis =>
        dispatch(actions.setRateBasis(basis, 'any')),
      onChangeLooseBasis: basis =>
        dispatch(actions.setRateBasis(basis, 'loose')),
      onChangeContainerizedBasis: basis =>
        dispatch(actions.setRateBasis(basis, 'containerized')),
      onChangeAnyMinimumAmount: minimumAmount =>
        dispatch(actions.setRateMinimumAmount(minimumAmount, 'any')),
      onChangeLooseMinimumAmount: minimumAmount =>
        dispatch(actions.setRateMinimumAmount(minimumAmount, 'loose')),
      onChangeContainerizedMinimumAmount: minimumAmount =>
        dispatch(actions.setRateMinimumAmount(minimumAmount, 'containerized')),
      onAddAnyRateRange: () =>
        dispatch(actions.addRateRange(new Mongo.ObjectID()._str, {}, 'any')),
      onAddLooseRateRange: () =>
        dispatch(actions.addRateRange(new Mongo.ObjectID()._str, {}, 'loose')),
      onAddContainerizedRateRange: () =>
        dispatch(actions.addRateRange(
          new Mongo.ObjectID()._str,
          {},
          'containerized',
        )),
      onChangeRateRangeUnitPrice: (id, unitPrice) =>
        dispatch(actions.setRateRangeUnitPrice(id, unitPrice)),
      onChangeRateRangeMaximumUnits: (id, maximumUnits) =>
        dispatch(actions.setRateRangeMaximumUnits(id, maximumUnits)),
      onRemoveRateRange: id => dispatch(actions.removeRateRange(id)),
      onChangeRateCurrency: currency =>
        dispatch(actions.setRateCurrency(currency)),
    },
  };
};

const EditRateConnect = connect(mapStateToProps, mapDispatchToProps)(EditRate);

export default EditRateConnect;
