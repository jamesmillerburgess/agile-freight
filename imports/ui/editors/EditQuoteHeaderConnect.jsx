import { connect } from 'react-redux';

import * as quoteActions from '../../state/actions/quoteActions';
import EditQuoteHeader from './EditQuoteHeader.jsx';

const mapStateToProps = state => ({ quote: state.quote });
const mapDispatchToProps = dispatch => ({
  dispatchers: {
    onLoad: quote => dispatch(quoteActions.loadQuote(quote)),

    onChangeCargoType:
      cargoType => dispatch(quoteActions.setCargoType(cargoType)),
    onChangeRatedQuote: () => dispatch(quoteActions.toggleRatedQuote()),
    onAddPackageLine: () => dispatch(quoteActions.addPackageLine()),
    onRemovePackageLine:
      index => dispatch(quoteActions.removePackageLine(index)),
    onChangePackageType: (index, packageType) =>
      dispatch(quoteActions.setPackageLinePackageType(index, packageType)),
    onChangeNumPackages: (index, numPackages) =>
      dispatch(quoteActions.setPackageLineNumPackages(index, numPackages)),

    onChangeLength: (index, length) =>
      dispatch(quoteActions.setPackageLineLength(index, length)),
    onChangeWidth: (index, width) => dispatch(quoteActions.setPackageLineWidth(
      index,
      width,
    )),
    onChangeHeight: (index, height) =>
      dispatch(quoteActions.setPackageLineHeight(index, height)),
    onChangePackageLineUnitVolumeUOM: (index, unitVolumeUOM) =>
      dispatch(quoteActions.setPackageLineUnitVolumeUOM(index, unitVolumeUOM)),
    onChangeWeight: (index, weight) =>
      dispatch(quoteActions.setPackageLineWeight(index, weight)),
    onChangePackageLineWeightUOM: (index, weightUOM) =>
      dispatch(quoteActions.setPackageLineWeightUOM(index, weightUOM)),

    onAddContainerLine: () => dispatch(quoteActions.addContainerLine()),
    onRemoveContainerLine: index => dispatch(quoteActions.removeContainerLine(
      index)),
    onChangeContainerLineNumContainers: (index, numContainers) =>
      dispatch(quoteActions.setContainerLineNumContainers(
        index,
        numContainers,
      )),
    onChangeContainerLineContainerType: (index, containerType) =>
      dispatch(quoteActions.setContainerLineContainerType(
        index,
        containerType,
      )),
    onClickContainerLineTemperatureControlled: index =>
      dispatch(quoteActions.toggleContainerLineTemperatureControlled(index)),

    onClickHazardous: () => dispatch(quoteActions.toggleHazardous()),
    onClickTemperatureControlled: () => dispatch(quoteActions.toggleTemperatureControlled()),

    // MOVEMENT
    onChangeMovementMode: mode =>
      dispatch(quoteActions.setMovementMode(mode)),
    onChangeMovementCommercialParty: commercialParty =>
      dispatch(quoteActions.setMovementCommercialParty(commercialParty)),
    onChangeMovementTermsOfSale: termsOfSale =>
      dispatch(quoteActions.setMovementTermsOfSale(termsOfSale)),
    onChangePickupLocationType: locationType =>
      dispatch(quoteActions.setPickupLocationType(locationType)),
    onChangePickupLocationName: locationName =>
      dispatch(quoteActions.setPickupLocationName(locationName)),
    onChangePickupCountry: country => dispatch(quoteActions.setPickupCountry(
      country)),
    onChangePickupLocation: location => dispatch(quoteActions.setPickupLocation(
      location)),
    onChangeDeliveryLocationType: locationType =>
      dispatch(quoteActions.setDeliveryLocationType(locationType)),
    onChangeDeliveryLocationName: locationName =>
      dispatch(quoteActions.setDeliveryLocationName(locationName)),
    onChangeDeliveryCountry:
      country => dispatch(quoteActions.setDeliveryCountry(country)),
    onChangeDeliveryLocation:
      location => dispatch(quoteActions.setDeliveryLocation(location)),

    // OTHER SERVICES
    onClickInsurance: () => dispatch(quoteActions.toggleInsurance()),
    onClickCustomsClearance: () => dispatch(quoteActions.toggleCustomsClearance()),
  },
});

const EditQuoteHeaderConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  EditQuoteHeader);

export default EditQuoteHeaderConnect;
