import { connect } from 'react-redux';
import { Mongo } from 'meteor/mongo';
import { createSelector } from 'reselect';

import * as actions from '../../state/actions/quoteActions';
import EditShipment from './EditShipment.jsx';

import routerUtils from '../../utils/routerUtils';
import { getChargeableWeight } from '../quoteUtils';

const {
  buildShipmentLink,
  shipmentAccountingPath,
  shipmentOperationsPath,
} = routerUtils;

const getPathname = location => location.pathname;
const getActiveTab = createSelector(
  getPathname,
  pathname =>
    pathname.indexOf('operations') !== -1 ? 'OPERATIONS' : 'ACCOUNTING',
);

const getCustomerId = match => match.params.customerId;
const getShipmentId = match => match.params.shipmentId;
const getToOperations = createSelector(
  [getCustomerId, getShipmentId],
  (customerId, shipmentId) => ({
    pathname: buildShipmentLink(customerId, shipmentId, 'operations'),
    state: { prevParams: { customerId, shipmentId } },
  }),
);
const getToAccounting = createSelector(
  [getCustomerId, getShipmentId],
  (customerId, shipmentId) => ({
    pathname: buildShipmentLink(customerId, shipmentId, 'accounting'),
    state: { prevParams: { customerId, shipmentId } },
  }),
);

const mapStateToProps = (state, ownProps) => {
  const { shipment } = state;
  if (!shipment.cargo) {
    shipment.cargo = {};
  }
  shipment.cargo.chargeableWeight = getChargeableWeight(state);
  return {
    shipment,
    activeTab: getActiveTab(ownProps.location),
    toOperations: getToOperations(ownProps.match),
    toAccounting: getToAccounting(ownProps.match),
    shipmentOperationsPath,
    shipmentAccountingPath,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchers: {
    loadShipment: shipment => dispatch(actions.loadShipment(shipment)),
    onChangeShipper: shipper => dispatch(actions.setShipper(shipper)),
    onChangeConsignee: consignee => dispatch(actions.setConsignee(consignee)),
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
    onChangeVessel: vessel => dispatch(actions.setVessel(vessel)),
    onChangeCustomerReference: customerReference =>
      dispatch(actions.setCustomerReference(customerReference)),
    onChangeBLType: blType => dispatch(actions.setBLType(blType)),

    onChangeCargoType: cargoType => dispatch(actions.setCargoType(cargoType)),
    onChangeRatedQuote: () => dispatch(actions.toggleRatedQuote()),
    onChangeCargoDescription: description =>
      dispatch(actions.setCargoDescription(description)),
    onAddPackageLine: () => dispatch(actions.addPackageLine()),
    onRemovePackageLine: index => dispatch(actions.removePackageLine(index)),
    onChangePackageType: (index, packageType) =>
      dispatch(actions.setPackageLinePackageType(index, packageType)),
    onChangeNumPackages: (index, numPackages) =>
      dispatch(actions.setPackageLineNumPackages(index, numPackages)),

    onChangeLength: (index, length) =>
      dispatch(actions.setPackageLineLength(index, length)),
    onChangeWidth: (index, width) =>
      dispatch(actions.setPackageLineWidth(index, width)),
    onChangeHeight: (index, height) =>
      dispatch(actions.setPackageLineHeight(index, height)),
    onChangePackageLineUnitVolumeUOM: (index, unitVolumeUOM) =>
      dispatch(actions.setPackageLineUnitVolumeUOM(index, unitVolumeUOM)),
    onChangeWeight: (index, weight) =>
      dispatch(actions.setPackageLineWeight(index, weight)),
    onChangePackageLineWeightUOM: (index, weightUOM) =>
      dispatch(actions.setPackageLineWeightUOM(index, weightUOM)),

    onAddContainerLine: () => dispatch(actions.addContainerLine()),
    onRemoveContainerLine: index =>
      dispatch(actions.removeContainerLine(index)),
    onChangeContainerLineNumContainers: (index, numContainers) =>
      dispatch(actions.setContainerLineNumContainers(index, numContainers)),
    onChangeContainerLineContainerType: (index, containerType) =>
      dispatch(actions.setContainerLineContainerType(index, containerType)),
    onClickContainerLineTemperatureControlled: index =>
      dispatch(actions.toggleContainerLineTemperatureControlled(index)),
    onChangeDensityRatio: densityRatio =>
      dispatch(actions.setDensityRatio(densityRatio)),
    onClickHazardous: () => dispatch(actions.toggleHazardous()),
    onClickTemperatureControlled: () =>
      dispatch(actions.toggleTemperatureControlled()),

    // MOVEMENT
    onChangeMovementMode: mode => dispatch(actions.setMovementMode(mode)),
    onChangeMovementCommercialParty: commercialParty =>
      dispatch(actions.setMovementCommercialParty(commercialParty)),
    onChangeMovementTermsOfSale: termsOfSale =>
      dispatch(actions.setMovementTermsOfSale(termsOfSale)),
    onChangeCarrier: carrier => dispatch(actions.setCarrier(carrier)),
    onChangeReceipt: receipt => dispatch(actions.setReceipt(receipt)),
    onChangeDeparture: departure => dispatch(actions.setDeparture(departure)),
    onChangeArrival: arrival => dispatch(actions.setArrival(arrival)),
    onChangeDelivery: delivery => dispatch(actions.setDelivery(delivery)),
    onChangeReceiptDate: receiptDate =>
      dispatch(actions.setReceiptDate(receiptDate)),
    onChangeDepartureDate: departureDate =>
      dispatch(actions.setDepartureDate(departureDate)),
    onChangeArrivalDate: arrivalDate =>
      dispatch(actions.setArrivalDate(arrivalDate)),
    onChangeDeliveryDate: deliveryDate =>
      dispatch(actions.setDeliveryDate(deliveryDate)),
    onChangeReceiptStatus: () => dispatch(actions.toggleReceiptStatus()),
    onChangeDepartureStatus: () => dispatch(actions.toggleDepartureStatus()),
    onChangeArrivalStatus: () => dispatch(actions.toggleArrivalStatus()),
    onChangeDeliveryStatus: () => dispatch(actions.toggleDeliveryStatus()),

    // OTHER SERVICES
    onClickExportCustomsClearance: () =>
      dispatch(actions.toggleExportCustomsClearance()),
    onClickImportCustomsClearance: () =>
      dispatch(actions.toggleImportCustomsClearance()),
    onClickInsurance: () => dispatch(actions.toggleInsurance()),

    // CHARGES
    addExternalCharge: () =>
      dispatch(
        actions.addCharge({ id: new Mongo.ObjectID()._str, type: 'External' }),
      ),
    addInternalCharge: () =>
      dispatch(
        actions.addCharge({ id: new Mongo.ObjectID()._str, type: 'Internal' }),
      ),
    addCharge: charge => dispatch(actions.addCharge(charge)),
    removeCharge: id => dispatch(actions.removeCharge(id)),
    changeChargeName: (id, name) => dispatch(actions.setChargeName(id, name)),
    changeChargeCustomer: (id, customer) =>
      dispatch(actions.setChargeCustomer(id, customer)),
    changeChargeRevenue: (id, revenue) =>
      dispatch(actions.setChargeRevenue(id, revenue)),
    changeChargeRevenueCurrency: (id, revenueCurrency) =>
      dispatch(actions.setChargeRevenueCurrency(id, revenueCurrency)),
    changeChargeSupplier: (id, supplier) =>
      dispatch(actions.setChargeSupplier(id, supplier)),
    changeChargeCost: (id, cost) => dispatch(actions.setChargeCost(id, cost)),
    changeChargeCostCurrency: (id, costCurrency) =>
      dispatch(actions.setChargeCostCurrency(id, costCurrency)),
  },
});

const EditShipmentConnect = connect(mapStateToProps, mapDispatchToProps)(
  EditShipment,
);

export default EditShipmentConnect;
