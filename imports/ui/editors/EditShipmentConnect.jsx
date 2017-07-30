import { connect } from 'react-redux';

import * as actions from '../../state/actions/quoteActions';
import EditShipment from './EditShipment.jsx';

import { Shipments } from '../../api/shipments/shipmentsCollection';
import { getChargeableWeight } from '../quoteUtils';

const mapStateToProps = (state) => {
  const { shipment } = state;
  shipment.cargo.chargeableWeight = getChargeableWeight(state);
  return { shipment };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const shipment = Shipments.findOne(ownProps.match.params.shipmentId);
  dispatch(actions.loadShipment(shipment));
  return {
    dispatchers: {
      onChangeShipper: shipper =>
        dispatch(actions.setShipper(shipper)),
      onChangeConsignee: consignee =>
        dispatch(actions.setConsignee(consignee)),
      onChangeNotifyParty: notifyParty =>
        dispatch(actions.setNotifyParty(notifyParty)),
      onChangeShipperAddress: shipperAddress =>
        dispatch(actions.setShipperAddress(shipperAddress)),
      onChangeConsigneeAddress: consigneeAddress =>
        dispatch(actions.setConsigneeAddress(consigneeAddress)),
      onChangeNotifyPartyAddress: notifyPartyAddress =>
        dispatch(actions.setNotifyPartyAddress(notifyPartyAddress)),
      onChangePreCarriageBy: preCarriageBy =>
        dispatch(actions.setPreCarriageBy(preCarriageBy)),
      onChangeVessel: vessel =>
        dispatch(actions.setVessel(vessel)),
      onChangeCustomerReference: customerReference =>
        dispatch(actions.setCustomerReference(customerReference)),
      onChangeBLType: blType =>
        dispatch(actions.setBLType(blType)),

      onChangeCargoType: cargoType => dispatch(actions.setCargoType(cargoType)),
      onChangeRatedQuote: () => dispatch(actions.toggleRatedQuote()),
      onChangeCargoDescription:
        description => dispatch(actions.setCargoDescription(description)),
      onAddPackageLine: () => dispatch(actions.addPackageLine()),
      onRemovePackageLine: index => dispatch(actions.removePackageLine(index)),
      onChangePackageType: (index, packageType) =>
        dispatch(actions.setPackageLinePackageType(index, packageType)),
      onChangeNumPackages: (index, numPackages) =>
        dispatch(actions.setPackageLineNumPackages(index, numPackages)),

      onChangeLength: (index, length) =>
        dispatch(actions.setPackageLineLength(index, length)),
      onChangeWidth: (index, width) => dispatch(actions.setPackageLineWidth(
        index,
        width,
      )),
      onChangeHeight: (index, height) =>
        dispatch(actions.setPackageLineHeight(index, height)),
      onChangePackageLineUnitVolumeUOM: (index, unitVolumeUOM) =>
        dispatch(actions.setPackageLineUnitVolumeUOM(index, unitVolumeUOM)),
      onChangeWeight: (index, weight) =>
        dispatch(actions.setPackageLineWeight(index, weight)),
      onChangePackageLineWeightUOM: (index, weightUOM) =>
        dispatch(actions.setPackageLineWeightUOM(index, weightUOM)),

      onAddContainerLine: () => dispatch(actions.addContainerLine()),
      onRemoveContainerLine: index => dispatch(actions.removeContainerLine(
        index)),
      onChangeContainerLineNumContainers: (index, numContainers) =>
        dispatch(actions.setContainerLineNumContainers(
          index,
          numContainers,
        )),
      onChangeContainerLineContainerType: (index, containerType) =>
        dispatch(actions.setContainerLineContainerType(
          index,
          containerType,
        )),
      onClickContainerLineTemperatureControlled: index =>
        dispatch(actions.toggleContainerLineTemperatureControlled(index)),
      onChangeDensityRatio: densityRatio =>
        dispatch(actions.setDensityRatio(densityRatio)),
      onClickHazardous: () => dispatch(actions.toggleHazardous()),
      onClickTemperatureControlled: () => dispatch(actions.toggleTemperatureControlled()),

      // MOVEMENT
      onChangeMovementMode: mode =>
        dispatch(actions.setMovementMode(mode)),
      onChangeMovementCommercialParty: commercialParty =>
        dispatch(actions.setMovementCommercialParty(commercialParty)),
      onChangeMovementTermsOfSale: termsOfSale =>
        dispatch(actions.setMovementTermsOfSale(termsOfSale)),
      onChangeCarrier: carrier => dispatch(actions.setCarrier(carrier)),
      onChangeReceipt: receipt => dispatch(actions.setReceipt(receipt)),
      onChangeDeparture: departure => dispatch(actions.setDeparture(departure)),
      onChangeArrival: arrival => dispatch(actions.setArrival(arrival)),
      onChangeDelivery: delivery => dispatch(actions.setDelivery(delivery)),
      onChangeReceiptDate: receiptDate => dispatch(actions.setReceiptDate(
        receiptDate)),
      onChangeDepartureDate: departureDate => dispatch(actions.setDepartureDate(
        departureDate)),
      onChangeArrivalDate: arrivalDate => dispatch(actions.setArrivalDate(
        arrivalDate)),
      onChangeDeliveryDate: deliveryDate => dispatch(actions.setDeliveryDate(
        deliveryDate)),

      // OTHER SERVICES
      onClickExportCustomsClearance: () => dispatch(actions.toggleExportCustomsClearance()),
      onClickImportCustomsClearance: () => dispatch(actions.toggleImportCustomsClearance()),
      onClickInsurance: () => dispatch(actions.toggleInsurance()),
    },
  };
};

const EditShipmentConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  EditShipment);

export default EditShipmentConnect;
