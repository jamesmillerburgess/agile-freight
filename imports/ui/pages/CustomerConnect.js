import { connect } from 'react-redux';

import Customer from './Customer.jsx';
import * as actionCreators from '../../state/actions/filterActions';

const mapStateToProps = ({ filters }) => ({ filters });

const mapDispatchToProps = dispatch => ({
  dispatchers: {
    toggleActive: () => dispatch(actionCreators.toggleFilter('showActive')),
    toggleInactive: () => dispatch(actionCreators.toggleFilter('showInactive')),
    toggleAir: () => dispatch(actionCreators.toggleFilter('showAir')),
    toggleSea: () => dispatch(actionCreators.toggleFilter('showSea')),
    toggleRoad: () => dispatch(actionCreators.toggleFilter('showRoad')),
    toggleBrokerage: () => dispatch(actionCreators.toggleFilter('showBrokerage')),
  },
});

const CustomerConnect = connect(mapStateToProps, mapDispatchToProps)(Customer);

export default CustomerConnect;
