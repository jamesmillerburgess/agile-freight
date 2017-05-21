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
      wrapper.contains(<span className="status">EXPIRES 01 JAN 2017</span>).should.equal(true);
    });

    it('renders the cargo header', () => {
      wrapper.contains(<span className="title">CARGO</span>).should.equal(true);
    });

    it('renders a message if no cargo is present', () => {
      wrapper.setProps({ quote: { cargo: {} } });
      wrapper.contains(<span>NO CARGO ENTERED</span>).should.equal(true);
    });

    it('renders a message if the cargo type is \'Loose\' but there are no package lines', () => {
      wrapper.setProps({ quote: { cargo: { cargoType: 'Loose' } } });
      wrapper.contains(<span>NO CARGO ENTERED</span>).should.equal(true);

      wrapper.setProps({ quote: { cargo: { cargoType: 'Loose', packageLines: [] } } });
      wrapper.contains(<span>NO CARGO ENTERED</span>).should.equal(true);
    });

    it('renders a message if the cargo type is \'Containerized\' but there are no container lines', () => {
      wrapper.setProps({ quote: { cargo: { cargoType: 'Containerized' } } });
      wrapper.contains(<span>NO CARGO ENTERED</span>).should.equal(true);

      wrapper.setProps({ quote: { cargo: { cargoType: 'Containerized', containerLines: [] } } });
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

    it('renders the total packages if cargo type is \'Loose\'', () => {
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
            totalPackages: 1,
            totalVolume: 2,
            volumeUOM: 'cbm',
            totalWeight: 3,
            weightUOM: 'kg',
          },
        },
      });
      wrapper.contains((
        <div className="cargo-totals">
          <span className="label">TOTAL</span>
          <span className="cargo-totals-values numeric-label">1 pkgs,&nbsp;2 cbm,&nbsp;3 kg</span>
        </div>
      )).should.equal(true);
    });

    it('renders cargo attributes if the cargo type is \'Loose\'', () => {
      wrapper.setProps({
        quote: {
          cargo: {
            cargoType: 'Loose',
            packageLines: [{}],
            hazardous: true,
            temperatureControlled: true,
          },
        },
      });
      wrapper.contains((
        <div className="cargo-attributes">
          <span className="label">HAZARDOUS, TEMPERATURE CONTROLLED</span>
        </div>
      )).should.equal(true);

      wrapper.setProps({
        quote: {
          cargo: {
            cargoType: 'Loose',
            packageLines: [{}],
            hazardous: false,
            temperatureControlled: false,
          },
        },
      });
      wrapper.contains((
        <div className="cargo-attributes">
          <span className="label">NON-HAZARDOUS, NON-TEMPERATURE CONTROLLED</span>
        </div>
      )).should.equal(true);
    });

    it('renders container lines if cargo type is \'Containerized\'', () => {
      wrapper.setProps({
        quote: {
          cargo: {
            cargoType: 'Containerized',
            containerLines: [{
              numContainers: 1,
              containerType: '20\'',
              temperatureControlled: true,
            }],
          },
        },
      });
      wrapper.contains((
        <div className="cargo-row">
          <span>1 20&apos; Temperature Controlled</span>
        </div>
      )).should.equal(true);
    });

    it('renders the total packages if cargo type is \'Containerized\'', () => {
      wrapper.setProps({
        quote: {
          cargo: {
            cargoType: 'Containerized',
            containerLines: [{
              numContainers: 1,
              containerType: '20\'',
              temperatureControlled: true,
            }],
            totalContainers: 1,
            totalTEU: 2,
          },
        },
      });
      wrapper.contains((
        <div className="cargo-totals">
          <span className="label">TOTAL</span>
          <span className="cargo-totals-values numeric-label">1 container,&nbsp;2 TEU</span>
        </div>
      )).should.equal(true);
    });

    it('renders cargo attributes if the cargo type is \'Containerized\'', () => {
      wrapper.setProps({
        quote: {
          cargo: {
            cargoType: 'Containerized',
            containerLines: [{}],
            hazardous: true,
          },
        },
      });
      wrapper.contains((
        <div className="cargo-attributes">
          <span className="label">HAZARDOUS</span>
        </div>
      )).should.equal(true);

      wrapper.setProps({
        quote: {
          cargo: {
            cargoType: 'Containerized',
            containerLines: [{}],
            hazardous: false,
          },
        },
      });
      wrapper.contains((
        <div className="cargo-attributes">
          <span className="label">NON-HAZARDOUS</span>
        </div>
      )).should.equal(true);
    });
  });
}
