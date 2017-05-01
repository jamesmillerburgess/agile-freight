import React from 'react';
import Select from 'react-select';

import { integerFormat, weightFormat } from '../../formatters/numberFormatters';

const NewQuote = (props) => {
  const { cargo, movement, otherServices } = props;

  const PackageLines = (
    <div className="edit-group with-tabs">
      <div className="edit-group-body">
        <div className="package-row-header">
          <div className="package-type">
            <div className="label">
              Package Type
            </div>
          </div>
          <div className="num-packages">
            <div className="label">
              # Pkgs
            </div>
          </div>
          <div className="dimensions">
            <div className="label">
              Dimensions / Pkg
            </div>
          </div>
          <div className="weight">
            <div className="label">
              Weight / Pkg
            </div>
          </div>
        </div>
        {cargo.packageLines.map((packageLine, index) => (
          <div key={index} className="package-row">
            <div className="package-type">
              <Select
                value={packageLine.packageType}
                options={[
                  { value: 'Packages', label: 'Packages' },
                  { value: 'Boxes', label: 'Boxes' },
                  { value: 'Pallets', label: 'Pallets' },
                ]}
                clearable={false}
                onChange={selectedValue => props.onChangePackageType(index, selectedValue.value)}
                disabled={cargo.ratedQuote}
              />
            </div>
            <div className="num-packages">
              <input
                className="input-numeric"
                type="number"
                placeholder=""
                value={packageLine.numPackages}
                onChange={e => props.onChangeNumPackages(index, e.target.value === '' ? '' : +e.target.value)}
                disabled={cargo.ratedQuote}
              />
            </div>
            <div className="dimensions">
              <div className="input-group">
                <input
                  className="input-group-first"
                  type="number"
                  placeholder="L"
                  value={packageLine.length}
                  onChange={e => props.onChangeLength(index, e.target.value === '' ? '' : +e.target.value)}
                  disabled={cargo.ratedQuote}
                />
                <input
                  className="input-group-middle"
                  type="number"
                  placeholder="W"
                  value={packageLine.width}
                  onChange={e => props.onChangeWidth(index, e.target.value === '' ? '' : +e.target.value)}
                  disabled={cargo.ratedQuote}
                />
                <input
                  className="input-group-middle"
                  type="number"
                  placeholder="H"
                  value={packageLine.height}
                  onChange={e => props.onChangeHeight(index, e.target.value === '' ? '' : +e.target.value)}
                  disabled={cargo.ratedQuote}
                />
                <Select
                  className="input-group-last addon"
                  value={packageLine.unitVolumeUOM}
                  options={[
                    { value: 'cm', label: 'cm' },
                    { value: 'in', label: 'in' },
                  ]}
                  clearable={false}
                  onChange={selectedValue =>
                    props.onChangePackageLineUnitVolumeUOM(index, selectedValue.value)}
                  arrowRenderer={() => false}
                  searchable={false}
                  disabled={cargo.ratedQuote}
                />
              </div>
            </div>
            <div className="weight">
              <div className="input-group">
                <input
                  className="input-group-first"
                  type="number"
                  placeholder="Weight"
                  value={packageLine.weight}
                  onChange={e => props.onChangeWeight(index, e.target.value === '' ? '' : +e.target.value)}
                  disabled={cargo.ratedQuote}
                />
                <Select
                  className="input-group-last addon"
                  value={packageLine.weightUOM}
                  options={[
                    { value: 'kg', label: 'kg' },
                    { value: 'lb', label: 'lb' },
                  ]}
                  clearable={false}
                  onChange={selectedValue =>
                    props.onChangePackageLineWeightUOM(index, selectedValue.value)}
                  arrowRenderer={() => false}
                  searchable={false}
                  disabled={cargo.ratedQuote}
                />
              </div>
            </div>
            <div className="totals">
              <span className="value">
                {integerFormat(packageLine.numPackages || 0)}
              </span>
              &nbsp;pkgs,&nbsp;
              <span className="value">
                {weightFormat(packageLine.volume)}
              </span>
              &nbsp;{packageLine.volumeUOM},&nbsp;
              <span className="value">
                {weightFormat(packageLine.totalWeight)}
              </span>
              &nbsp;{packageLine.weightUOM}
            </div>
            <button
              className="cargo-row-icon"
              onClick={() =>
                (index === 0 ? props.onAddPackageLine() : props.onRemovePackageLine(index))}
              disabled={cargo.ratedQuote}
            >
              <span className={`fa fa-fw ${index === 0 ? 'fa-plus-circle' : 'fa-minus-circle'}`} />
            </button>
          </div>
        ))}
      </div>
      <div className="edit-group-footer">
        <div className="field checkbox-hazardous">
          <button className="checkbox" onClick={() => props.onChangeRatedQuote()}>
            <span className={`fa fa-fw ${cargo.ratedQuote ? 'fa-check' : ' '}`} />
          </button>
          <div className="checkbox-label">Rated Quote</div>
        </div>
        <div className="field checkbox-hazardous">
          <button className="checkbox" onClick={() => props.onClickHazardous()}>
            <span className={`fa fa-fw ${cargo.hazardous ? 'fa-check' : ' '}`} />
          </button>
          <div className="checkbox-label">Hazardous</div>
        </div>
        <div className="field checkbox-temperature-controlled">
          <button className="checkbox" onClick={() => props.onClickTemperatureControlled()}>
            <span className={`fa fa-fw ${cargo.temperatureControlled ? 'fa-check' : ' '}`} />
          </button>
          <div className="checkbox-label">Temperature Controlled</div>
        </div>
        <div className="edit-group-totals">
          <span className="total-shipment-label">
            Total Shipment:
          </span>&nbsp;
          <span className="total-shipment-value">
            {integerFormat(cargo.totalPackages)}
          </span> pkgs,&nbsp;
          <span className="total-shipment-value">
            {weightFormat(cargo.totalVolume)}
          </span> {cargo.volumeUOM},&nbsp;
          <span className="total-shipment-value">
            {weightFormat(cargo.totalWeight)}
          </span> {cargo.weightUOM}
        </div>
      </div>
    </div>
  );

  const Containers = (
    <div className="edit-group with-tabs">
      <div className="edit-group-body">
        <div className="container-header">
          <div className="num-containers label">
            Quantity
          </div>
          <div className="container-type label">
            Container Type
          </div>
        </div>
        {
          cargo.containerLines.map((containerLine, index) => (
            <div key={index} className="container-row">
              <div className="num-containers">
                <input
                  value={containerLine.numContainers}
                  onChange={e => props.onChangeContainerLineNumContainers(index, +e.target.value)}
                  disabled={cargo.ratedQuote}
                />
              </div>
              <div className="container-type">
                <button
                  className={`radio-button ${containerLine.containerType === '20\'' ? 'active' : ''}`}
                  onClick={() => props.onChangeContainerLineContainerType(index, '20\'')}
                  disabled={cargo.ratedQuote}
                >
                  20&apos;
                </button>
                <button
                  className={`radio-button ${containerLine.containerType === '40\'' ? 'active' : ''}`}
                  onClick={() => props.onChangeContainerLineContainerType(index, '40\'')}
                  disabled={cargo.ratedQuote}
                >
                  40&apos;
                </button>
                <button
                  className={`radio-button ${containerLine.containerType === '40\'HC' ? 'active' : ''}`}
                  onClick={() => props.onChangeContainerLineContainerType(index, '40\'HC')}
                  disabled={cargo.ratedQuote}
                >
                  40&apos;HC
                </button>
                <button
                  className={`radio-button ${containerLine.containerType === '45\'HC' ? 'active' : ''}`}
                  onClick={() => props.onChangeContainerLineContainerType(index, '45\'HC')}
                  disabled={cargo.ratedQuote}
                >
                  45&apos;HC
                </button>
              </div>
              <div className="field checkbox-temperature-controlled">
                <button
                  className="checkbox"
                  onClick={() => props.onClickContainerLineTemperatureControlled(index)}
                  disabled={cargo.ratedQuote}
                >
                  <span
                    className={`fa fa-fw ${containerLine.temperatureControlled ? 'fa-check' : ' '}`}
                  />
                </button>
                <div className="checkbox-label">Temperature Controlled</div>
              </div>
              <button
                className="cargo-row-icon"
                onClick={() =>
                  (index === 0 ? props.onAddContainerLine() : props.onRemoveContainerLine(index))}
                disabled={cargo.ratedQuote}
              >
                <span
                  className={`fa fa-fw ${index === 0 ? 'fa-plus-circle' : 'fa-minus-circle'}`} />
              </button>
            </div>
          ))
        }
      </div>
      <div className="edit-group-footer">
        <div className="field checkbox-hazardous">
          <button className="checkbox" onClick={() => props.onChangeRatedQuote()}>
            <span className={`fa fa-fw ${cargo.ratedQuote ? 'fa-check' : ' '}`} />
          </button>
          <div className="checkbox-label">Rated Quote</div>
        </div>
        <div className="field checkbox-hazardous">
          <button className="checkbox" onClick={() => props.onClickHazardous()}>
            <span className={`fa fa-fw ${cargo.hazardous ? 'fa-check' : ' '}`} />
          </button>
          <div className="checkbox-label">Hazardous</div>
        </div>
        <div className="edit-group-totals">
          <span className="total-shipment-label">Total Shipment:</span>&nbsp;
          <span className="total-shipment-value">{integerFormat(cargo.totalContainers)}</span>
          containers,&nbsp;
          <span className="total-shipment-value">{integerFormat(cargo.totalTEU)}</span> TEU,&nbsp;
        </div>
      </div>
    </div>
  );

  return (
    <div className="new-quote">
      <div className="tab-bar">
        <div
          className={`tab ${cargo.cargoType === 'loose' ? 'active' : 'inactive'}`}
          onClick={() => props.onChangeCargoType('loose')}
        >
          Loose Cargo
        </div>
        <div
          className={`tab ${cargo.cargoType === 'containerized' ? 'active' : 'inactive'}`}
          onClick={() => props.onChangeCargoType('containerized')}
        >
          Containers
        </div>
      </div>
      {cargo.cargoType === 'loose' ? PackageLines : ''}
      {cargo.cargoType === 'containerized' ? Containers : ''}
      <div className="edit-group">
        <div className="edit-group-body">
          <div className="pickup-delivery-wrapper">
            <div className="pickup">
              <div className="edit-group-title">
                Pickup From
              </div>
              <div className="field select-country">
                <div className="label">
                  Location Type
                </div>
                <Select
                  value={movement.pickup.locationType}
                  options={[
                    { value: 'Port/Airport', label: 'Port/Airport' },
                    { value: 'Address', label: 'Address' },
                  ]}
                  clearable={false}
                  onChange={selectedValue => props.onChangePickupLocationType(selectedValue.value)}
                />
              </div>
              <div className="empty-field" />
              <div className="field select-country">
                <div className="label">
                  Country
                </div>
                <Select
                  value={movement.pickup.country}
                  options={[
                    { value: 'United States', label: 'United States' },
                    { value: 'China', label: 'China' },
                    { value: 'India', label: 'India' },
                  ]}
                  clearable={false}
                  onChange={selectedValue => props.onChangePickupCountry(selectedValue.value)}
                />
              </div>
              <div className="field select-country">
                <div className="label">
                  City / Port Code
                </div>
                <Select
                  value={movement.pickup.portCode}
                  options={[
                    { value: 'CNSHA Shanghai', label: 'CNSHA Shanghai' },
                    {
                      value: 'MIA Miami (Miami International Airport)',
                      label: 'MIA Miami (Miami International Airport)',
                    },
                    {
                      value: 'SFO San Francisco (San Francisco International Airport)',
                      label: 'SFO San Francisco (San Francisco International Airport)',
                    },
                  ]}
                  clearable={false}
                  onChange={selectedValue => props.onChangePickupPortCode(selectedValue.value)}
                />
              </div>
            </div>
            <div className="delivery">
              <div className="edit-group-title">
                Delivery To
              </div>
              <div className="field select-country">
                <div className="label">
                  Location Type
                </div>
                <Select
                  value={movement.delivery.locationType}
                  options={[
                    { value: 'Port/Airport', label: 'Port/Airport' },
                    { value: 'Address', label: 'Address' },
                  ]}
                  clearable={false}
                  onChange={selectedValue =>
                    props.onChangeDeliveryLocationType(selectedValue.value)}
                />
              </div>
              <div className="empty-field" />
              <div className="field select-country">
                <div className="label">
                  Country
                </div>
                <Select
                  value={movement.delivery.country}
                  options={[
                    { value: 'United States', label: 'United States' },
                    { value: 'China', label: 'China' },
                    { value: 'India', label: 'India' },
                  ]}
                  clearable={false}
                  onChange={selectedValue => props.onChangeDeliveryCountry(selectedValue.value)}
                />
              </div>
              <div className="field select-country">
                <div className="label">
                  Postal Code
                </div>
                <Select
                  value={movement.delivery.postalCode}
                  options={[
                    { value: 'Sarasota, FL 34232', label: 'Sarasota, FL 34232' },
                    { value: 'Orlando, FL 32819', label: 'Orlando, FL 32819' },
                    { value: 'San Francisco, CA', label: 'San Francisco, CA' },
                  ]}
                  clearable={false}
                  onChange={selectedValue => props.onChangeDeliveryPostalCode(selectedValue.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="edit-group other-services">
        <div className="edit-group-body">
          <div className="pickup-delivery-wrapper">
            <div className="pickup">
              <div className="edit-group-title">Other Services</div>
              <div className="field">
                <button className="checkbox" onClick={() => props.onClickInsurance()}>
                  <span className={`fa fa-fw ${otherServices.insurance ? 'fa-check' : ' '}`} />
                </button>
                <div className="checkbox-label">Insurance</div>
              </div>
              <div className="field">
                <button className="checkbox" onClick={() => props.onClickCustomsClearance()}>
                  <span
                    className={`fa fa-fw ${otherServices.customsClearance ? 'fa-check' : ' '}`} />
                </button>
                <div className="checkbox-label">Customs Clearance</div>
              </div>
            </div>
            <div className="delivery">
              <button className="submit">GET RATES</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewQuote;
