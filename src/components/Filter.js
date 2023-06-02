import React, { useContext, useState } from 'react';
import filterContext from '../context/createContext';

export default function Filter() {
  const { handleChangeInputText, applyNumericFilter } = useContext(filterContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const [filterResult, setFilterResult] = useState(null);

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
    setFilterResult({ column, comparison, value });
  };

  const handleFilterChange = (event) => {
    handleChangeInputText(event.target.value);
  };

  const optionsColumn = [
    'population',
    'orbital_period',
    'diameter', 'rotation_period',
    'surface_water'];
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
        <select onChange={ handleColumnChange } data-testid="column-filter">
          {optionsColumn.map((option) => (
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
      {filterResult && (
        <span>
          {filterResult.column}
          {' '}
          {filterResult.comparison}
          {' '}
          {filterResult.value}
        </span>
      )}
    </div>
  );
}
