import { connect } from 'react-redux';

import * as newQuoteActions from '../../state/actions/newQuoteActions';
import EditQuoteHeader from './EditQuoteHeader.jsx';

const mapStateToProps = state => ({ ...state.newQuote, quote: state.newQuote });
const mapDispatchToProps = dispatch => ({
  dispatchers: {
    onLoad: quote => dispatch(newQuoteActions.loadQuote(quote)),

    onChangeCargoType: cargoType => dispatch(newQuoteActions.setCargoType(cargoType)),
    onChangeRatedQuote: () => dispatch(newQuoteActions.toggleRatedQuote()),
    onAddPackageLine: () => dispatch(newQuoteActions.addPackageLine()),
    onRemovePackageLine: index => dispatch(newQuoteActions.removePackageLine(index)),
    onChangePackageType: (index, packageType) =>
      dispatch(newQuoteActions.setPackageLinePackageType(index, packageType)),
    onChangeNumPackages: (index, numPackages) =>
      dispatch(newQuoteActions.setPackageLineNumPackages(index, numPackages)),

    onChangeLength: (index, length) =>
      dispatch(newQuoteActions.setPackageLineLength(index, length)),
    onChangeWidth: (index, width) => dispatch(newQuoteActions.setPackageLineWidth(index, width)),
    onChangeHeight: (index, height) =>
      dispatch(newQuoteActions.setPackageLineHeight(index, height)),
    onChangePackageLineUnitVolumeUOM: (index, unitVolumeUOM) =>
      dispatch(newQuoteActions.setPackageLineUnitVolumeUOM(index, unitVolumeUOM)),
    onChangeWeight: (index, weight) =>
      dispatch(newQuoteActions.setPackageLineWeight(index, weight)),
    onChangePackageLineWeightUOM: (index, weightUOM) =>
      dispatch(newQuoteActions.setPackageLineWeightUOM(index, weightUOM)),

    onAddContainerLine: () => dispatch(newQuoteActions.addContainerLine()),
    onRemoveContainerLine: index => dispatch(newQuoteActions.removeContainerLine(index)),
    onChangeContainerLineNumContainers: (index, numContainers) =>
      dispatch(newQuoteActions.setContainerLineNumContainers(index, numContainers)),
    onChangeContainerLineContainerType: (index, containerType) =>
      dispatch(newQuoteActions.setContainerLineContainerType(index, containerType)),
    onClickContainerLineTemperatureControlled: index =>
      dispatch(newQuoteActions.toggleContainerLineTemperatureControlled(index)),

    onClickHazardous: () => dispatch(newQuoteActions.toggleHazardous()),
    onClickTemperatureControlled: () => dispatch(newQuoteActions.toggleTemperatureControlled()),

    // MOVEMENT
    onChangePickupLocationType: locationType =>
      dispatch(newQuoteActions.setPickupLocationType(locationType)),
    onChangePickupCountry: country => dispatch(newQuoteActions.setPickupCountry(country)),
    onChangePickupLocation: location => dispatch(newQuoteActions.setPickupLocation(location)),
    onChangeDeliveryLocationType: locationType =>
      dispatch(newQuoteActions.setDeliveryLocationType(locationType)),
    onChangeDeliveryCountry: country => dispatch(newQuoteActions.setDeliveryCountry(country)),
    onChangeDeliveryLocation: location => dispatch(newQuoteActions.setDeliveryLocation(location)),

    // OTHER SERVICES
    onClickInsurance: () => dispatch(newQuoteActions.toggleInsurance()),
    onClickCustomsClearance: () => dispatch(newQuoteActions.toggleCustomsClearance()),
  },
});

const EditQuoteHeaderConnect = connect(mapStateToProps, mapDispatchToProps)(EditQuoteHeader);

export default EditQuoteHeaderConnect;
