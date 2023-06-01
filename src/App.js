import React from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Table from './components/Table';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Table } />
      </Switch>
    </div>
  );
}

export default App;
