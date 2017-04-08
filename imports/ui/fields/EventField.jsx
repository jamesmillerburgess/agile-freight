import React from 'react';
import moment from 'moment';

import { UIGlobals } from '../ui-globals';

export default class EventField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
    this.getValue = this.getValue.bind(this);
    this.handleFieldButtonClick = this.handleFieldButtonClick.bind(this);
    this.handleClickUpdateEvent = this.handleClickUpdateEvent.bind(this);
    this.eventStatusClasses = this.eventStatusClasses.bind(this);
    this.overdueClass = this.overdueClass.bind(this);
  }

  componentDidMount() {
    $(this.node).find('.datetimepicker').datetimepicker({
      inline: true,                   // No collapsing
      format: UIGlobals.dateFormat,   // Standard date format
      useCurrent: false,              // Don't default in today's date and time
    });
    $('.dropdown-menu .set-expected').click((event) => {
      event.stopPropagation();
      $(event.target).parents('.dropdown-menu').find('.set-expected').addClass('active');
      $(event.target).parents('.dropdown-menu').find('.set-actual').removeClass('active');
    });
    $('.dropdown-menu .set-actual').click((event) => {
      event.stopPropagation();
      $(event.target).parents('.dropdown-menu').find('.set-actual').addClass('active');
      $(event.target).parents('.dropdown-menu').find('.set-expected').removeClass('active');
    });
  }

  getValue() {
    if (this.props.event.status === 'Not Planned') {
      return <span>Not Planned</span>;
    }
    return moment(this.props.event.date).format(UIGlobals.dateFormat);
  }

  handleFieldButtonClick() {
    $('.dropdown-filter').select();
  }

  eventStatusClasses() {
    if (this.props.event.status === 'Not Planned') {
      return 'fa-question';
    }
    if (this.props.event.status === 'Expected') {
      return 'fa-clock-o';
    }
    if (this.props.event.status === 'Actual') {
      return 'fa-check';
    }
    return '';
  }

  overdueClass() {
    if (
      this.props.event.status === 'Expected' &&
      moment().isAfter(this.props.event.date)
    ) {
      return 'overdue';
    }
    return '';
  }

  handleClickUpdateEvent(event) {
    const menu = $(event.target).parents('.dropdown-menu');
    const update = {};

    // Set the id
    update.id = this.props.event.id;

    // Set the type
    update.type = this.props.event.type;

    // Get the date and error check
    update.date = new Date(menu.find('.datetimepicker').data('DateTimePicker').date());

    // Get the status and error check
    update.status = '';
    if (menu.find('.set-expected').hasClass('active')) {
      update.status = 'Expected';
    }
    if (menu.find('.set-actual').hasClass('active')) {
      update.status = 'Actual';
    }

    // Get the remarks
    update.remarks = menu.find('.event-update-remarks')[0].value;

    // Update
    this.props.valueUpdateCallback(update);
  }

  render() {
    return (
      <div
        ref={node => this.node = node}
        className="dropdown"
      >

        {/* Field Button */}
        <div
          className="value-container dropdown-button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={this.handleFieldButtonClick}
        >
          <button className={`value ${this.overdueClass()}`}>
            <span>
              <i
                className={`fa fa-fw ${this.eventStatusClasses()}`}
              />
              {this.getValue()}
            </span>
          </button>
        </div>

        {/* Field Menu */}
        <div
          className="dropdown-menu event"
          aria-labelledby="dropdownMenuButton"
        >
          <div href="#" className="dropdown-form">
            <input
              className="datetimepicker"
              type="text"
              defaultValue={this.getValue()}
            />
            <button className="focis-button set-expected">
              <i className="fa fa-fw fa-clock-o"/>
            </button>
            <button className="focis-button set-actual">
              <i className="fa fa-fw fa-check"/>
            </button>
            <input
              className="focis-input event-update-remarks"
              placeholder="Remarks"
            />
            <button
              className="focis-button update-event"
              onClick={this.handleClickUpdateEvent}
            >
              Update
            </button>
          </div>
        </div>

      </div>
    );
  }
}

EventField.propTypes = {
  event: React.PropTypes.object.isRequired,
  valueUpdateCallback: React.PropTypes.func.isRequired,
};
