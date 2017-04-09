import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class CustomerAccountingInner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loading, customer } = this.props;
    return (
      <div className="customer-quotes">
        Accounting
      </div>
    );
  }
}

CustomerAccountingInner.propTypes = {
  loading: React.PropTypes.bool,
  customer: React.PropTypes.object,
};

const CustomerAccounting = createContainer((props) => {
  const branch = Meteor.subscribe('branch.active');
  const loading = !branch.ready();
  const { customer } = props;
  return {
    loading,
    customer,
  };
}, CustomerAccountingInner);

export default CustomerAccounting;
