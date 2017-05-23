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

    describe('Outer Structure', () => {
      it('renders a component', () => {
        wrapper.exists().should.equal(true);
      });

      it('renders a quote-container in the outermost div', () => {
        wrapper.hasClass('quote-container').should.equal(true);
      });

      it('renders a panel inside the quote-container', () => {
        wrapper.childAt(0).hasClass('panel').should.equal(true);
      });

      it('renders a quote inside the panel', () => {
        wrapper.childAt(0).childAt(0).hasClass('quote').should.equal(true);
      });
    });

    describe('Header and Status', () => {
      it('renders the header \'AGILITY FREIGHT QUOTATION\'', () => {
        wrapper.contains((
          <span className="header">
          AGILITY FREIGHT QUOTATION
        </span>
        )).should.equal(true);
      });

      it('renders the status if it is not in \'Submitted\' status', () => {
        wrapper.setProps({ quote: { status: 'Draft' } });
        wrapper.contains(<span className="title">DRAFT</span>).should.equal(true);
      });

      it('renders the expiry if it is in \'Submitted\' status', () => {
        wrapper.setProps({
          quote: {
            status: 'Submitted',
            expiryDate: new Date('January 1, 2017'),
          },
        });
        wrapper.contains(<span className="title">EXPIRES 01 JAN 2017</span>).should.equal(true);
      });
    });

    describe('Cargo Section', () => {
      it('renders the cargo title', () => {
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

    describe('Routing Section', () => {
      it('renders the routing title', () => {
        wrapper.contains(<span className="title">ROUTING</span>).should.equal(true);
      });

      it('renders a message if there is not a complete route', () => {
        wrapper.setProps({ quote: { movement: {} } });
        wrapper.contains(<span>NO ROUTING ENTERED</span>).should.equal(true);
      });

      it('renders the route if there is one available', () => {
        wrapper.setProps({
          quote: {
            movement: {
              pickup: { locationName: 'Here' },
              delivery: { locationName: 'There' },
            },
          },
        });
        wrapper.contains(<span>Here – There</span>).should.equal(true);
      });

      it('renders \'DOOR TO DOOR\' when neither location is a port', () => {
        wrapper.setProps({
          quote: {
            movement: {
              pickup: { locationName: 'Here', isPort: false },
              delivery: { locationName: 'There', isPort: false },
            },
          },
        });
        wrapper.contains(<span>DOOR TO DOOR</span>).should.equal(true);
      });

      it('renders \'PORT TO DOOR\' when only the pickup location is a port', () => {
        wrapper.setProps({
          quote: {
            movement: {
              pickup: { locationName: 'Here', isPort: true },
              delivery: { locationName: 'There', isPort: false },
            },
          },
        });
        wrapper.contains(<span>PORT TO DOOR</span>).should.equal(true);
      });

      it('renders \'DOOR TO PORT\' when only the delivery location is a port', () => {
        wrapper.setProps({
          quote: {
            movement: {
              pickup: { locationName: 'Here', isPort: false },
              delivery: { locationName: 'There', isPort: true },
            },
          },
        });
        wrapper.contains(<span>DOOR TO PORT</span>).should.equal(true);
      });

      it('renders \'PORT TO PORT\' when both locations are a port', () => {
        wrapper.setProps({
          quote: {
            movement: {
              pickup: { locationName: 'Here', isPort: true },
              delivery: { locationName: 'There', isPort: true },
            },
          },
        });
        wrapper.contains(<span>PORT TO PORT</span>).should.equal(true);
      });
    });

    describe('Other Services Section', () => {
      it('renders the other services title', () => {
        wrapper.contains(<span className="title">OTHER SERVICES</span>).should.equal(true);
      });

      it('renders \'INSURANCE\' if insurance is true', () => {
        wrapper.setProps({
          quote: {
            otherServices: {
              insurance: true,
            },
          },
        });
        wrapper.contains(<span>INSURANCE</span>).should.equal(true);
      });

      it('renders \'NO INSURANCE\' if insurance is false', () => {
        wrapper.setProps({
          quote: {
            otherServices: {
              insurance: false,
            },
          },
        });
        wrapper.contains(<span>NO INSURANCE</span>).should.equal(true);
      });

      it('renders \'CUSTOMS CLEARANCE\' if customs clearance is true', () => {
        wrapper.setProps({
          quote: {
            otherServices: {
              customsClearance: true,
            },
          },
        });
        wrapper.contains(<span>CUSTOMS CLEARANCE</span>).should.equal(true);
      });

      it('renders \'NO CUSTOMS CLEARANCE\' if customs clearance is false', () => {
        wrapper.setProps({
          quote: {
            otherServices: {
              customsClearance: false,
            },
          },
        });
        wrapper.contains(<span>NO CUSTOMS CLEARANCE</span>).should.equal(true);
      });
    });

    describe('Charges Section', () => {
      it('renders the \'NO CHARGES ENTERED\' titls if there are no charges', () => {
        wrapper.setProps({ quote: { charges: { chargeLines: [] } } });
        wrapper.contains(<span className="title">NO CHARGES ENTERED</span>).should.equal(true);
      });

      it('renders the \'NO ORIGIN CHARGES\' title if there are charges but none are origin', () => {
        wrapper.setProps({ quote: { charges: { chargeLines: [{}] } } });
        wrapper.contains(<span className="title">NO ORIGIN CHARGES</span>).should.equal(true);
      });

      it('renders the \'ORIGIN CHARGES\' title if there is an origin charge', () => {
        wrapper.setProps({ quote: { charges: { chargeLines: [{ group: 'Origin' }] } } });
        wrapper.contains(<span className="title">ORIGIN CHARGES</span>).should.equal(true);
      });

      it('renders origin charge lines and subtotal if there are origin charges', () => {
        wrapper.setProps({
          quote: {
            charges: {
              currency: 'USD',
              chargeLines: [{
                group: 'Origin',
                name: 'Charge Name',
                rate: 'Per Container',
                units: 1,
                unitPrice: 2,
                localTotal: 3,
                total: 4,
                localCurrency: 'CHF',
              }],
              totalOriginCharges: 5,
            },
          },
        });
        wrapper.contains((
          <div className="charge-group">
            <span className="title">
              ORIGIN CHARGES
            </span>
            <div className="charge-row">
              <span>Charge Name</span>
              <span>Per Container</span>
              <span className="units">{1}</span>
              <span className="amount">2.00 CHF</span>
              <span className="amount">3.00 CHF</span>
              <span className="amount">4.00 USD</span>
            </div>
            <div className="subtotal-row">
              <span>SUBTOTAL</span>
              <span className="value">5.00 USD</span>
            </div>
          </div>
        )).should.equal(true);
      });

      it('renders the \'NO INTERNATIONAL CHARGES\' title if there are charges but none are international', () => {
        wrapper.setProps({ quote: { charges: { chargeLines: [{}] } } });
        wrapper.contains(
          <span className="title">NO INTERNATIONAL CHARGES</span>).should.equal(true);
      });

      it('renders the \'INTERNATIONAL CHARGES\' charges title', () => {
        wrapper.setProps({ quote: { charges: { chargeLines: [{ group: 'International' }] } } });
        wrapper.contains(<span className="title">INTERNATIONAL CHARGES</span>).should.equal(true);
      });

      it('renders international charge lines and subtotal if there are international charges', () => {
        wrapper.setProps({
          quote: {
            charges: {
              currency: 'USD',
              chargeLines: [{
                group: 'International',
                name: 'Charge Name',
                rate: 'Per Container',
                units: 1,
                unitPrice: 2,
                localTotal: 3,
                total: 4,
                localCurrency: 'CHF',
              }],
              totalInternationalCharges: 5,
            },
          },
        });
        wrapper.contains((
          <div className="charge-group">
            <span className="title">
              INTERNATIONAL CHARGES
            </span>
            <div className="charge-row">
              <span>Charge Name</span>
              <span>Per Container</span>
              <span className="units">{1}</span>
              <span className="amount">2.00 CHF</span>
              <span className="amount">3.00 CHF</span>
              <span className="amount">4.00 USD</span>
            </div>
            <div className="subtotal-row">
              <span>SUBTOTAL</span>
              <span className="value">5.00 USD</span>
            </div>
          </div>
        )).should.equal(true);
      });

      it('renders the \'NO DESTINATION CHARGES\' title if there are charges but none are destination', () => {
        wrapper.setProps({ quote: { charges: { chargeLines: [{}] } } });
        wrapper.contains(<span className="title">NO DESTINATION CHARGES</span>).should.equal(true);
      });

      it('renders the \'DESTINATION CHARGES\' charges title', () => {
        wrapper.setProps({ quote: { charges: { chargeLines: [{ group: 'Destination' }] } } });
        wrapper.contains(<span className="title">DESTINATION CHARGES</span>).should.equal(true);
      });

      it('renders destination charge lines and subtotal if there are destination charges', () => {
        wrapper.setProps({
          quote: {
            charges: {
              currency: 'USD',
              chargeLines: [{
                group: 'Destination',
                name: 'Charge Name',
                rate: 'Per Container',
                units: 1,
                unitPrice: 2,
                localTotal: 3,
                total: 4,
                localCurrency: 'CHF',
              }],
              totalDestinationCharges: 5,
            },
          },
        });
        wrapper.contains((
          <div className="charge-group">
            <span className="title">
              DESTINATION CHARGES
            </span>
            <div className="charge-row">
              <span>Charge Name</span>
              <span>Per Container</span>
              <span className="units">{1}</span>
              <span className="amount">2.00 CHF</span>
              <span className="amount">3.00 CHF</span>
              <span className="amount">4.00 USD</span>
            </div>
            <div className="subtotal-row">
              <span>SUBTOTAL</span>
              <span className="value">5.00 USD</span>
            </div>
          </div>
        )).should.equal(true);
      });

      it('does not render the \'TOTAL PRICE\' title if there are no charges', () => {
        wrapper.setProps({ quote: { charges: { chargeLines: [] } } });
        wrapper.contains(<span className="title">TOTAL PRICE</span>).should.equal(false);
      });

      it('renders the \'TOTAL PRICE\' title if there are charges', () => {
        wrapper.setProps({ quote: { charges: { chargeLines: [{}] } } });
        wrapper.contains(<span className="title">TOTAL PRICE</span>).should.equal(true);
      });

      it('renders the total price if there are charges', () => {
        wrapper.setProps({
          quote: {
            charges: {
              currency: 'USD',
              chargeLines: [{}],
              totalCharges: 1,
            },
          },
        });
        wrapper.contains((
          <div className="total-row">
            <span className="title">TOTAL PRICE</span>
            <span className="title value">1.00 USD</span>
          </div>
        )).should.equal(true);
      });

      it('does not render the \'NOTES\' title if there are no charges', () => {
        wrapper.setProps({ quote: { charges: { chargeLines: [] } } });
        wrapper.contains(<span className="title">NOTES</span>).should.equal(false);
      });

      it('renders the \'NOTES\' title if there are charges', () => {
        wrapper.setProps({ quote: { charges: { chargeLines: [{}] } } });
        wrapper.contains(<span className="title">NOTES</span>).should.equal(true);
      });

      it('does not render the notes of there are no charges', () => {
        wrapper.setProps({ quote: { charges: { chargeLines: [], notes: 'Notes' } } });
        wrapper.contains(<pre>Notes</pre>).should.equal(false);
      });

      it('renders the notes if there are charges', () => {
        wrapper.setProps({ quote: { charges: { chargeLines: [{}], notes: 'Notes' } } });
        wrapper.contains(<pre>Notes</pre>).should.equal(true);
      });
    });

    describe('Email Panel', () => {
      it('does not render a second panel if the status is \'Draft\' or \'Archived\'', () => {
        wrapper.setProps({ quote: { status: 'Draft' } });
        wrapper.children().length.should.equal(1);
        wrapper.setProps({ quote: { status: 'Archived' } });
        wrapper.children().length.should.equal(1);
      });

      it('does not render a second panel if there is no email sent date', () => {
        wrapper.setProps({ quote: { status: 'Submitted' } });
        wrapper.children().length.should.equal(1);
        wrapper.setProps({ quote: { status: 'Expired' } });
        wrapper.children().length.should.equal(1);
        wrapper.setProps({ quote: { status: 'Submitted', email: {} } });
        wrapper.children().length.should.equal(1);
        wrapper.setProps({ quote: { status: 'Expired' }, email: {} });
        wrapper.children().length.should.equal(1);
      });

      it('renders a second panel if the status is \'Submitted\' and there is an email sent date', () => {
        wrapper.setProps({
          quote: {
            status: 'Submitted',
            email: { sentDate: new Date('January 1, 2017') },
          },
        });
        wrapper.children().length.should.equal(2);
        wrapper.childAt(1).hasClass('panel').should.equal(true);
      });

      it('renders a second panel if the status is \'Expired\' and there is an email sent date', () => {
        wrapper.setProps({
          quote: {
            status: 'Expired',
            email: { sentDate: new Date('January 1, 2017') },
          },
        });
        wrapper.children().length.should.equal(2);
        wrapper.childAt(1).hasClass('panel').should.equal(true);
      });

      it('renders the email information in the second panel', () => {
        wrapper.setProps({
          quote: {
            status: 'Submitted',
            email: {
              to: 'a@a.com',
              cc: 'b@b.com',
              subject: 'Subject',
              message: 'Message',
              sentDate: new Date('January 1, 2017 12:00'),
            },
          },
        });
        wrapper.contains((
          <div className="email">
            <div className="title">EMAIL</div>
            <div className="email-field">
              <span className="label">SENT</span>
              <span className="value">01 JAN 2017 12:00</span>
            </div>
            <div className="email-field">
              <span className="label">TO</span>
              <span className="value">a@a.com</span>
            </div>
            <div className="email-field">
              <span className="label">CC</span>
              <span className="value">b@b.com</span>
            </div>
            <div className="email-field">
              <span className="label">SUBJECT</span>
              <span className="value">Subject</span>
            </div>
            <div className="email-field">
              <span className="label">MESSAGE</span>
              <pre className="value">Message</pre>
            </div>
          </div>
        )).should.equal(true);
      });
    });
  });
}
