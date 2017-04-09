import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class CustomerConfigurationInner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loading, customer } = this.props;
    return (
      <div className="customer-quotes">
        Configuration
      </div>
    );
  }
}

CustomerConfigurationInner.propTypes = {
  loading: React.PropTypes.bool,
  customer: React.PropTypes.object,
};

const CustomerConfiguration = createContainer((props) => {
  const branch = Meteor.subscribe('branch.active');
  const loading = !branch.ready();
  const { customer } = props;
  return {
    loading,
    customer,
  };
}, CustomerConfigurationInner);

export default CustomerConfiguration;
