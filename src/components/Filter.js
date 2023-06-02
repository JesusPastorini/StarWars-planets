import React, { useContext } from 'react';
import filterContext from '../context/createContext';

export default function Filter() {
  const { handleChangeInputText } = useContext(filterContext);

  const handleFilterChange = ({ target }) => {
    const { value } = target;
    handleChangeInputText(value);
    console.log(value);
  };

  return (
    <div>
      <input
        type="text"
        onChange={ handleFilterChange }
        data-testid="name-filter"
      />
    </div>
  );
}
