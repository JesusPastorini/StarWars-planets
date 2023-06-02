import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import filterContext from '../context/createContext';

function Provider({ children }) {
  const [planetsData, setPlanetsData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [numericFilters, setNumericFilters] = useState([]);

  const refresh = () => {
    fetch('https://swapi.dev/api/planets')
      .then((result) => result.json())
      .then((responseData) => {
        // Remover a coluna "residents" de cada planeta
        const modifiedData = responseData.results.map((planet) => {
          const { residents, ...rest } = planet;
          return rest;
        });

        setPlanetsData(modifiedData);
      })

      .catch((err) => console.log(err));
  };
  useEffect(() => {
    refresh();
  }, []);

  function handleChangeInputText(e) {
    setInputText(e);
  }
  // Filtra por texto digitado
  function filterPlanets() {
    const filteredData = planetsData
      .filter((planet) => planet.name.toLowerCase().includes(inputText.toLowerCase()));
    return filteredData;
  }

  // Aplica os filtros numéricos acumulados
  function applyNumericFilters() {
    let filteredData = planetsData;

    numericFilters.forEach((filter) => {
      const { column, comparison, handleValue } = filter;

      filteredData = filteredData.filter((planet) => {
        const planetValue = Number(planet[column]);

        if (comparison === 'maior que') {
          return planetValue > handleValue;
        } if (comparison === 'menor que') {
          return planetValue < handleValue;
        } if (comparison === 'igual a') {
          return planetValue === handleValue;
        }

        return false;
      });
    });

    return filteredData;
  }

  const filteredPlanets = numericFilters.length > 0 ? applyNumericFilters()
    : filterPlanets();

  const value = {
    planetsData: filteredPlanets,
    inputText,
    handleChangeInputText,
    applyNumericFilter: (column, comparison, handleValue) => {
      const newFilter = { column, comparison, handleValue };
      setNumericFilters((prevFilters) => [...prevFilters, newFilter]);
    },
  };

  return (
    <filterContext.Provider value={ value }>
      {children}
    </filterContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
