/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import Quote from './Quote.jsx';

// Stub the method that is used in the component

if (Meteor.isClient) {
  chai.should();
  describe('Quote Component', () => {

    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Quote />);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('renders a component', () => {
      wrapper.exists().should.equal(true);
    });

    it('renders a panel in the outermost div', () => {
      wrapper.hasClass('panel').should.equal(true);
    });

    it('renders a quote inside the panel', () => {
      wrapper.childAt(0).hasClass('quote').should.equal(true);
    });

    it('renders the header \'AGILITY FREIGHT QUOTATION\'', () => {
      wrapper.contains((
        <span className="header">
          AGILITY FREIGHT QUOTATION
        </span>
      )).should.equal(true);
    });

    it('renders the status if it is not in \'Submitted\' status', () => {
      wrapper.setProps({ quote: { status: 'Draft' } });
      wrapper.contains(<span className="status">DRAFT</span>).should.equal(true);
    });

    it('renders the expiry if it is in \'Submitted\' status', () => {
      wrapper.setProps({ quote: { status: 'Submitted', expiryDate: new Date('January 1, 2017') } });
      console.log(wrapper.html());
      wrapper.contains(<span className="status">EXPIRES 01 JAN 2017</span>).should.equal(true);
    });

    it('renders the cargo header', () => {
      wrapper.contains(<span className="title">CARGO</span>).should.equal(true);
    });

    it('renders a message if no cargo is present', () => {
      wrapper.setProps({ quote: { cargo: {} } });
      wrapper.contains(<span>NO CARGO ENTERED</span>).should.equal(true);
    });

    it('renders package lines if cargo type is \'Loose\'', () => {
      wrapper.setProps({
        quote: {
          cargo: {
            cargoType: 'Loose',
            packageLines: [{
              numPackages: 1,
              packageType: 'Pallet',
              length: 2,
              width: 3,
              height: 4,
              unitVolumeUOM: 'cm',
              weight: 5,
              weightUOM: 'kg',
              volume: 6,
              volumeUOM: 'cbm',
              totalWeight: 7,
            }],
          },
        },
      });
      wrapper.contains((
        <div className="cargo-row">
          <span>1 Pallet</span>
          <span className="numeric-label">2x3x4 cm</span>
          <span className="numeric-label">5 kg / pkg</span>
          <span className="numeric-label">1 pkgs,&nbsp;6 cbm,&nbsp;7 kg</span>
        </div>
      )).should.equal(true);
    });
  });
}
