import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class CustomerQuotesInner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loading, customer } = this.props;
    return (
      <div className="customer-quotes">
        Quotes
      </div>
    );
  }
}

CustomerQuotesInner.propTypes = {
  loading: React.PropTypes.bool,
  customer: React.PropTypes.object,
};

const CustomerQuotes = createContainer((props) => {
  const branch = Meteor.subscribe('branch.active');
  const loading = !branch.ready();
  const { customer } = props;
  return {
    loading,
    customer,
  };
}, CustomerQuotesInner);

export default CustomerQuotes;
