import React from 'react';

export default class UpdateListItem extends React.Component {
  constructor(props) {
    super(props);
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
          <a className="user-id" href="">{update.userName}</a>{update.message}
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
