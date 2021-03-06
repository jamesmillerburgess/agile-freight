import { connect } from 'react-redux';
import { Mongo } from 'meteor/mongo';
import { createSelector } from 'reselect';

import * as actions from '../../state/actions/quoteActions';
import EditShipment from './EditShipment.jsx';
import Shipment from '../shipmentUtils';

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

const getCharges = state => state.shipment.charges || [];
const getExternalCharges = createSelector(getCharges, charges =>
  charges.filter(charge => charge.type === 'External').reverse(),
);
const getInternalCharges = createSelector(getCharges, charges =>
  charges.filter(charge => charge.type === 'Internal').reverse(),
);

const mapStateToProps = (state, ownProps) => {
  const { shipment } = state;
  if (!shipment.cargo) {
    shipment.cargo = {};
  }
  shipment.cargo.chargeableWeight = getChargeableWeight(state);
  return {
    shipment: {
      ...shipment,
      externalCharges: getExternalCharges(state),
      internalCharges: getInternalCharges(state),
    },
    activeTab: getActiveTab(ownProps.location),
    toOperations: getToOperations(ownProps.match),
    toAccounting: getToAccounting(ownProps.match),
    shipmentOperationsPath,
    shipmentAccountingPath,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatchers: {
    loadShipment: shipment => dispatch(actions.loadShipment(shipment)),
    archive: shipment =>
      Shipment.archive(shipment._id, archivedShipment =>
        actions.loadShipment(archivedShipment),
      ),
    save: shipment => Shipment.save(ownProps.match.shipmentId, shipment),
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
        actions.addCharge({
          id: new Mongo.ObjectID()._str,
          type: 'External',
          name: '',
          customer: '',
          revenue: '',
          revenueCurrency: '',
          supplier: '',
          cost: '',
          costCurrency: '',
        }),
      ),
    addInternalCharge: () =>
      dispatch(
        actions.addCharge({
          id: new Mongo.ObjectID()._str,
          type: 'Internal',
          name: '',
          customer: '',
          revenue: '',
          revenueCurrency: '',
          supplier: '',
          cost: '',
          costCurrency: '',
        }),
      ),
    addCharge: charge => dispatch(actions.addCharge(charge)),
    removeCharge: id => dispatch(actions.removeCharge(id)),
    changeChargeName: (id, name) => dispatch(actions.setChargeName(id, name)),
    changeChargeCustomer: (charge, customer) => {
      if (!charge.revenueCurrency) {
        dispatch(
          actions.setChargeRevenueCurrency(charge.id, customer.currency),
        );
      }
      dispatch(actions.setChargeCustomer(charge.id, customer));
    },
    changeChargeRevenue: (charge, revenue) => {
      dispatch(actions.setChargeRevenue(charge.id, revenue));
      if (charge.type === 'Internal') {
        dispatch(actions.setChargeCost(charge.id, revenue));
      }
    },
    changeChargeRevenueCurrency: (charge, revenueCurrency) => {
      dispatch(actions.setChargeRevenueCurrency(charge.id, revenueCurrency));
      if (charge.type === 'Internal') {
        dispatch(actions.setChargeCostCurrency(charge.id, revenueCurrency));
      }
    },
    changeChargeSupplier: (charge, supplier) => {
      if (!charge.costCurrency && supplier) {
        dispatch(actions.setChargeCostCurrency(charge.id, supplier.currency));
      }
      dispatch(actions.setChargeSupplier(charge.id, supplier));
    },
    changeChargeCost: (charge, cost) => dispatch(actions.setChargeCost(charge.id, cost)),
    changeChargeCostCurrency: (charge, costCurrency) =>
      dispatch(actions.setChargeCostCurrency(charge.id, costCurrency)),
  },
});

const EditShipmentConnect = connect(mapStateToProps, mapDispatchToProps)(
  EditShipment,
);

export default EditShipmentConnect;
