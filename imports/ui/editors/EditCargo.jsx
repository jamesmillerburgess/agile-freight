import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { APIGlobals } from '../../api/api-globals';
import { integerFormat, weightFormat } from '../formatters/numberFormatters';
import { resizeHeight } from '../formatters/resizeHeight';

import CheckboxField from '../fields/CheckboxField.jsx';

export const PackageLines = ({ cargo, dispatchers }) => (
  <div className="">
    <div className="">
      <div className="package-row-header">
        <button
          className="cargo-row-icon"
          onClick={() => dispatchers.onAddPackageLine()}
          disabled={cargo.ratedQuote}
        >
          <span className="fa fa-fw fa-plus-square" />
        </button>
        <div className="package-type">
          <div className="label">
            PACKAGE TYPE
          </div>
        </div>
        <div className="num-packages">
          <div className="label">
            # PKGS
          </div>
        </div>
        <div className="dimensions">
          <div className="label">
            DIMENSIONS / PKG
          </div>
        </div>
        <div className="weight">
          <div className="label">
            WEIGHT / PKG
          </div>
        </div>
      </div>
      {cargo.packageLines.map((packageLine, index) => (
        <div key={index} className="package-row">
          <button
            className="cargo-row-icon"
            onClick={() => dispatchers.onRemovePackageLine(index)}
            disabled={cargo.ratedQuote}
          >
            <span className="fa fa-fw fa-minus-square" />
          </button>
          <div className="package-type">
            <Select
              value={packageLine.packageType}
              options={APIGlobals.packageTypeOptions}
              clearable={false}
              onChange={selectedValue => dispatchers
                .onChangePackageType(
                  index,
                  selectedValue.value,
                )}
              disabled={cargo.ratedQuote}
            />
          </div>
          <div className="num-packages">
            <input
              className="input-numeric"
              type="number"
              placeholder=""
              value={packageLine.numPackages}
              onChange={e => dispatchers.onChangeNumPackages(
                index,
                e.target.value === '' ? '' : +e.target.value,
              )}
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
                onChange={e => dispatchers.onChangeLength(
                  index,
                  e.target.value === '' ? '' : +e.target.value,
                )}
                disabled={cargo.ratedQuote}
              />
              <input
                className="input-group-middle"
                type="number"
                placeholder="W"
                value={packageLine.width}
                onChange={e => dispatchers.onChangeWidth(
                  index,
                  e.target.value === '' ? '' : +e.target.value,
                )}
                disabled={cargo.ratedQuote}
              />
              <input
                className="input-group-middle"
                type="number"
                placeholder="H"
                value={packageLine.height}
                onChange={e => dispatchers.onChangeHeight(
                  index,
                  e.target.value === '' ? '' : +e.target.value,
                )}
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
                onChange={selectedValue => dispatchers
                  .onChangePackageLineUnitVolumeUOM(
                    index,
                    selectedValue.value,
                  )}
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
                onChange={e => dispatchers.onChangeWeight(
                  index,
                  e.target.value === '' ? '' : +e.target.value,
                )}
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
                onChange={selectedValue => dispatchers
                  .onChangePackageLineWeightUOM(
                    index,
                    selectedValue.value,
                  )}
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
        </div>
      ))}
    </div>
    <div className="edit-group-footer">
      <div className="cargo-row-icon" />
      <div className="field select-country">
        <div className="label">
          DENSITY RATIO
        </div>
        <input
          className="small-numeric-input"
          value={cargo.densityRatio}
          onChange={
            e => dispatchers.onChangeDensityRatio(e.target.value)
          }
        />
      </div>
      <div className="field select-country">
        <div className="label">
          CHARGEABLE WEIGHT
        </div>
        <div className="label">
          {weightFormat(cargo.chargeableWeight)}&nbsp;
          {cargo.weightUOM}
        </div>
      </div>
      <div className="edit-group-totals">
          <span className="total-shipment-label">
            TOTAL
          </span>
      </div>
      <div className="total-values">
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
    <div className="edit-group-footer">
      <div className="cargo-row-icon" />
      <CheckboxField
        className="checkbox-hazardous"
        onClick={dispatchers.onClickHazardous}
        value={cargo.hazardous}
        label="HAZARDOUS"
      />
      <CheckboxField
        className="checkbox-temperature-controlled"
        onClick={dispatchers.onClickTemperatureControlled}
        value={cargo.temperatureControlled}
        label="TEMPERATURE CONTROLLED"
      />
    </div>
  </div>
);

export const Containers = ({ cargo, dispatchers }) => (
  <div className="">
    <div className="">
      <div className="container-header">
        <button
          className="cargo-row-icon"
          onClick={() => dispatchers.onAddContainerLine()}
          disabled={cargo.ratedQuote}
        >
          <span className="fa fa-fw fa-plus-square" />
        </button>
        <div className="num-containers">
          <div className="label">
            QUANTITY
          </div>
        </div>
        <div className="container-type">
          <div className="label">
            CONTAINER TYPE
          </div>
        </div>
      </div>
      {
        cargo.containerLines.map((
          containerLine,
          index,
        ) => (
          <div key={index} className="container-row">
            <button
              className="cargo-row-icon"
              onClick={() => dispatchers.onRemoveContainerLine(
                index)}
              disabled={cargo.ratedQuote}
            >
              <span className="fa fa-fw fa-minus-square" />
            </button>
            <div className="num-containers">
              <input
                value={containerLine.numContainers}
                onChange={e => dispatchers
                  .onChangeContainerLineNumContainers(
                    index,
                    +e.target.value,
                  )}
                disabled={cargo.ratedQuote}
              />
            </div>
            <div className="container-type">
              <button
                className={`radio-button ${containerLine.containerType ===
                                           '20\'' ? 'active' : ''}`}
                onClick={() => dispatchers.onChangeContainerLineContainerType(
                  index,
                  '20\'',
                )}
                disabled={cargo.ratedQuote}
              >
                20&apos;
              </button>
              <button
                className={`radio-button ${containerLine.containerType ===
                                           '40\'' ? 'active' : ''}`}
                onClick={() => dispatchers.onChangeContainerLineContainerType(
                  index,
                  '40\'',
                )}
                disabled={cargo.ratedQuote}
              >
                40&apos;
              </button>
              <button
                className={`radio-button ${containerLine.containerType ===
                                           '40\'HC' ? 'active' : ''}`}
                onClick={() => dispatchers.onChangeContainerLineContainerType(
                  index,
                  '40\'HC',
                )}
                disabled={cargo.ratedQuote}
              >
                40&apos;HC
              </button>
              <button
                className={`radio-button ${containerLine.containerType ===
                                           '45\'HC' ? 'active' : ''}`}
                onClick={() => dispatchers.onChangeContainerLineContainerType(
                  index,
                  '45\'HC',
                )}
                disabled={cargo.ratedQuote}
              >
                45&apos;HC
              </button>
            </div>
            <div className="field checkbox-temperature-controlled">
              <button
                className="checkbox"
                onClick={() =>
                  dispatchers.onClickContainerLineTemperatureControlled(
                    index)}
                disabled={cargo.ratedQuote}
              >
                  <span
                    className={`fa fa-fw ${containerLine.temperatureControlled ?
                                           'fa-check' : ' '}`}
                  />
              </button>
              <div className="checkbox-label">TEMPERATURE CONTROLLED</div>
            </div>
          </div>
        ))
      }
    </div>
    <div className="edit-group-footer">
      <div className="cargo-row-icon" />
      <CheckboxField
        className="checkbox-hazardous"
        onClick={dispatchers.onClickHazardous}
        value={cargo.hazardous}
        label="HAZARDOUS"
      />
      <div className="edit-group-totals">
          <span className="total-shipment-label">
            TOTAL
          </span>
      </div>
      <div className="total-values">
          <span className="total-shipment-value">
            {integerFormat(cargo.totalContainers)}
          </span> CONTAINERS,&nbsp;
        <span className="total-shipment-value">
            {integerFormat(cargo.totalTEU)}
          </span> TEU&nbsp;
      </div>
    </div>
  </div>
);

export const Description = ({ cargo, dispatchers }) => {
  let descriptionNode;
  return (
    <div>
      <div className="cargo-row-icon" />
      <div className="field">
        <div className="label">
          DESCRIPTION
        </div>
        <textarea
          className="description"
          ref={(node) => {
            descriptionNode = node;
            setTimeout(() => resizeHeight(descriptionNode), 1);
          }}
          value={cargo.description}
          onChange={e => dispatchers.onChangeCargoDescription(e.target.value)}
        />
      </div>
    </div>
  );
};

const EditCargo = (
  {
    cargo,
    dispatchers,
    useContainers,
    splitCargoTypes,
    useDescription,
  }) => {
  const CargoType = () => (
    <div className="button-group col-6">
      <button
        className={`radio-button ${cargo.cargoType ===
                                   'Loose' ? 'active' : 'inactive'}`}
        onClick={() => dispatchers.onChangeCargoType(
          'Loose')}
      >
        LOOSE
      </button>
      <button
        className={`radio-button ${cargo.cargoType ===
                                   'Containerized' ? 'active' :
                                   'inactive'}`}
        onClick={() => dispatchers.onChangeCargoType(
          'Containerized')}
      >
        CONTAINERIZED
      </button>
    </div>
  );

  const Cargo = () => {
    if (splitCargoTypes) {
      return (
        <div>
          {cargo.cargoType === 'Loose' ?
           <PackageLines cargo={cargo} dispatchers={dispatchers} /> :
           ''}
          {cargo.cargoType === 'Containerized' ?
           <Containers cargo={cargo} dispatchers={dispatchers} /> : ''}
        </div>
      );
    }
    if (useContainers) {
      return (
        <div>
          <PackageLines cargo={cargo} dispatchers={dispatchers} />
          <Containers cargo={cargo} dispatchers={dispatchers} />
        </div>
      );
    }
    return <PackageLines cargo={cargo} dispatchers={dispatchers} />;
  };

  let descriptionNode = null;

  return (
    <div>
      <div className="input-row">
        <div className="cargo-row-icon" />
        <div className="input-group">
          {splitCargoTypes ? CargoType() : null}
        </div>
      </div>
      {Cargo()}
      {useDescription ?
       (<Description cargo={cargo} dispatchers={dispatchers} />) :
       null}

    </div>
  );
};

EditCargo.propTypes = {
  cargo: PropTypes.object.isRequired,
  dispatchers: PropTypes.objectOf(PropTypes.func).isRequired,
  useContainers: PropTypes.bool,
  splitCargoTypes: PropTypes.bool,
  useDescription: PropTypes.bool,
};

EditCargo.defaultProps = {
  useContainers: false,
  splitCargoTypes: false,
  useDescription: false,
};

export default EditCargo;
