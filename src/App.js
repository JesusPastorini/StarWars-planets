import React from 'react';
import './App.css';
import Table from './components/Table';
import Filter from './components/Filter';
import FilterProvider from './Hooks/FilterProvaider';

function App() {
  return (

    <FilterProvider>
      <div>
        <Filter />
        <Table />
      </div>
    </FilterProvider>

  );
}

export default App;
