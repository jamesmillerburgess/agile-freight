import React from 'react';

import MonetaryFieldGroup from '../fields/MonetaryFieldGroup.jsx';
import StakeholderField from '../fields/StakeholderField.jsx';

const EditCharge = ({ charge, dispatchers, external, internal }) =>
  <div className="header-row" key={charge.id}>
    <div className="revenue-side">
      <button
        className="cargo-row-icon"
        onClick={() => dispatchers.removeCharge(charge.id)}
      >
        <span className="fa fa-fw fa-minus-square" />
      </button>
      <input
        className="charge-name"
        value={charge.name}
        onChange={e => dispatchers.changeChargeName(charge.id, e.target.value)}
      />
      <StakeholderField
        className="charge-name"
        value={charge.customer}
        onChange={e => dispatchers.changeChargeCustomer(charge, e)}
        fetchCustomers={external}
        fetchBranches={internal}
      />
      <MonetaryFieldGroup
        numericValue={charge.revenue}
        currencyValue={charge.revenueCurrency}
        onChangeNumeric={e =>
          dispatchers.changeChargeRevenue(charge.id, e.target.value)}
        onChangeCurrency={e =>
          dispatchers.changeChargeRevenueCurrency(charge.id, e.value)}
      />
    </div>
    <div className="cost-side">
      <StakeholderField
        className="charge-name"
        value={charge.supplier}
        onChange={e => dispatchers.changeChargeSupplier(charge, e)}
        fetchSuppliers={external}
        fetchBranches={internal}
      />
      <MonetaryFieldGroup
        numericValue={charge.cost}
        currencyValue={charge.costCurrency}
        onChangeNumeric={e =>
          dispatchers.changeChargeCost(charge.id, e.target.value)}
        onChangeCurrency={e =>
          dispatchers.changeChargeCostCurrency(charge.id, e.value)}
      />
    </div>
  </div>;

const EditShipmentAccounting = ({ shipment, dispatchers }) =>
  <div className="panel container form-section">
    <div className="invoicing-buttons">
      <div className="invoice-button-group">
        <div className="title">Sales Invoices</div>
        <button className="button-primary">
          <span className="fa fa-fw fa-check-circle" />
          Pyrotek Engineering Materials Ltd
        </button>
        <button className="button-disabled">
          <span className="fa fa-fw fa-ban" />ABC Widgets
        </button>
      </div>
      <div className="invoice-button-group">
        <div className="title">Purchase Invoices</div>
        <button className="button-primary">
          <span className="fa fa-fw fa-ellipsis-h" />
          British Airways
        </button>
        <button className="button-primary">
          <span className="fa fa-fw fa-ellipsis-h" />ABC Truckers
        </button>
      </div>
    </div>
    <div className="charges-editor">
      <div className="header-row">
        <div className="revenue-side">
          <button
            className="cargo-row-icon"
            onClick={dispatchers.addExternalCharge}
          >
            <span className="fa fa-fw fa-plus-square" />
          </button>
          <div className="title charge-name">External Charges</div>
          <div className="title">Revenue</div>
        </div>
        <div className="cost-side">
          <div className="title">Cost</div>
        </div>
      </div>
      {shipment.externalCharges.map(charge =>
        <EditCharge
          charge={charge}
          dispatchers={dispatchers}
          key={charge.id}
          external
        />,
      )}
    </div>
    <div className="charges-editor">
      <div className="header-row">
        <div className="revenue-side">
          <button
            className="cargo-row-icon"
            onClick={dispatchers.addInternalCharge}
          >
            <span className="fa fa-fw fa-plus-square" />
          </button>
          <div className="title charge-name">Internal Charges</div>
          <div className="title">Bill To</div>
        </div>
        <div className="cost-side">
          <div className="title">Bill From</div>
        </div>
      </div>
      {shipment.internalCharges.map(charge =>
        <EditCharge
          charge={charge}
          dispatchers={dispatchers}
          key={charge.id}
          internal
        />,
      )}
    </div>
  </div>;

export default EditShipmentAccounting;
