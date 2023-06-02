import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import filterContext from '../context/createContext';

function Provider({ children }) {
  const [planetsData, setPlanetsData] = useState([]);
  const [inputText, setInputText] = useState('');

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

  function filterPlanets() {
    const filteredData = planetsData
      .filter((planet) => planet.name.toLowerCase().includes(inputText.toLowerCase()));
    return filteredData;
  }

  const value = {
    planetsData: filterPlanets(),
    inputText,
    handleChangeInputText,
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
