import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

class CustomerCargoInner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loading, customer } = this.props;
    return (
      <div className="customer-quotes">
        Cargo
      </div>
    );
  }
}

CustomerCargoInner.propTypes = {
  loading: PropTypes.bool,
  customer: PropTypes.object,
};

const CustomerCargo = createContainer((props) => {
  const branch = Meteor.subscribe('branch.active');
  const loading = !branch.ready();
  const { customer } = props;
  return {
    loading,
    customer,
  };
}, CustomerCargoInner);

export default CustomerCargo;
