import React, { useContext, useState } from 'react';
import filterContext from '../context/createContext';

export default function Filter() {
  const { handleChangeInputText,
    applyNumericFilter,
    removeNumericFilter,
  } = useContext(filterContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const [filters, setFilters] = useState([]);
  const [availableColumns, setAvailableColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const handleColumnChange = (event) => {
    setColumn(event.target.value);
  };

  const handleComparisonChange = (event) => {
    setComparison(event.target.value);
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleFilterClick = () => {
    applyNumericFilter(column, comparison, Number(value));
    setFilters((prevFilters) => [...prevFilters, { column, comparison, value }]);
    setAvailableColumns((prevColumns) => prevColumns.filter((col) => col !== column));
    setColumn(availableColumns[0]);
    console.log(filters);
  };

  const handleDeleteFilter = (filter) => {
    setFilters((prevFilters) => prevFilters.filter((f) => f !== filter));
    setAvailableColumns((prevColumns) => [...prevColumns, filter.column]);
    removeNumericFilter(filter.column);
  };

  const handleRemoveAllFilters = () => {
    setColumn('population');
    setComparison('maior que');
    setValue('0');
    setFilters([]);
    setAvailableColumns([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    removeNumericFilter();
  };

  const handleFilterChange = (event) => {
    handleChangeInputText(event.target.value);
  };

  const optionsCompar = ['maior que', 'menor que', 'igual a'];
  return (
    <div>
      <div>
        <input
          type="text"
          onChange={ handleFilterChange }
          data-testid="name-filter"
        />
      </div>
      <div>
        <select
          onChange={ handleColumnChange }
          value={ column }
          data-testid="column-filter"
        >
          {availableColumns.map((option) => (
            <option key={ option } value={ option }>
              {option}
            </option>
          ))}
        </select>

        <select onChange={ handleComparisonChange } data-testid="comparison-filter">
          {optionsCompar.map((compar) => (
            <option key={ compar } value={ compar }>
              {compar}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={ value }
          onChange={ handleValueChange }
          data-testid="value-filter"
        />

        <button onClick={ handleFilterClick } data-testid="button-filter">
          Filtrar
        </button>
      </div>
      {filters.map((filter, index) => (
        <div key={ index } data-testid="filter">
          <span>
            {filter.column}
            {' '}
            {filter.comparison}
            {' '}
            {filter.value}
          </span>
          <button onClick={ () => handleDeleteFilter(filter) }>
            Remover Filtro
          </button>
        </div>
      ))}
      {filters.length > 0 && (
        <button onClick={ handleRemoveAllFilters } data-testid="button-remove-filters">
          Remover Todas as Filtragens
        </button>
      )}
    </div>
  );
}
