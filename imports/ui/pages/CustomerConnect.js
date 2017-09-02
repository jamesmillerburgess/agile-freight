import { connect } from 'react-redux';

import Customer from './Customer.jsx';
import { toggleFilter } from '../../state/actions/filterActions';
import { loadShipment } from '../../state/actions/quoteActions';

import { Shipments } from '../../api/shipments/shipmentsCollection';

const mapStateToProps = ({ filters }) => ({ filters });

const mapDispatchToProps = dispatch => ({
  dispatchers: {
    loadShipment: shipmentId => {
      const shipment = Shipments.findOne(shipmentId);
      dispatch(loadShipment(shipment));
    },
    toggleActive: () => dispatch(toggleFilter('showActive')),
    toggleInactive: () => dispatch(toggleFilter('showInactive')),
    toggleAir: () => dispatch(toggleFilter('showAir')),
    toggleSea: () => dispatch(toggleFilter('showSea')),
    toggleRoad: () => dispatch(toggleFilter('showRoad')),
    toggleBrokerage: () => dispatch(toggleFilter('showBrokerage')),
  },
});

const CustomerConnect = connect(mapStateToProps, mapDispatchToProps)(Customer);

export default CustomerConnect;
