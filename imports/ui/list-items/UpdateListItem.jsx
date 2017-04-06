import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class UpdateListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  userName() {
    const user = Meteor.users.findOne(this.props.update.source);
    if (user.profile && user.profile.name) {
      return user.profile.name;
    }
    return 'unknown';
  }

  render() {
    const { update } = this.props;
    return (
      <div className="latest-update-list-item">
        <div className="list-item-profile-pic">
          <a className="user-id" href="">
            <img
              className="profile-pic"
              src="/lib/jburgess%20profile%20pic.png"
            />
          </a>
        </div>
        <div className="list-item-content">
          <a className="user-id" href="">{this.userName()}</a>{update.message}
          {update.type === 'Note' ?
            <div className="quote">
              {update.note}
            </div> :
            null
          }
        </div>
      </div>
    );
  }
}

UpdateListItem.propTypes = {
  update: React.PropTypes.object.isRequired,
};
