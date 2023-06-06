import React from 'react';
import { render } from '@testing-library/react';
import Table from '../components/Table';
import filterContext from '../context/createContext';
import App from '../App';

describe('Table', () => {
  test('renders loading message when planetsData is null', () => {
    const { getByText } = render(
      <filterContext.Provider value={{ planetsData: null }}>
        <Table />
      </filterContext.Provider>
    );
    const loadingMessage = getByText('Carregando...');
    expect(loadingMessage).toBeInTheDocument();
  });

  test('renders table with planet data', () => {
    const planetsData = [
      {
        name: 'Planet 1',
        rotation_period: '24',
        orbital_period: '365',
        diameter: '10000',
        climate: 'Temperate',
        gravity: '1',
        terrain: 'Grasslands',
        surface_water: '50',
        population: '1000000',
        films: ['Film 1', 'Film 2'],
        created: '2023-05-30T10:00:00',
        edited: '2023-05-31T15:30:00',
        url: 'https://example.com/planet1',
      },
    ];

    const { getByText } = render(
      <filterContext.Provider value={{ planetsData }}>
        <Table />
      </filterContext.Provider>
    );

    const planetName = getByText('Planet 1');
    const rotationPeriod = getByText('24');
    const orbitalPeriod = getByText('365');
    const diameter = getByText('10000');
    const climate = getByText('Temperate');
    const gravity = getByText('1');
    const terrain = getByText('Grasslands');
    const surfaceWater = getByText('50');
    const population = getByText('1000000');
    const films = getByText('Film 1 Film 2');
    const created = getByText('2023-05-30T10:00:00');
    const edited = getByText('2023-05-31T15:30:00');
    const url = getByText('https://example.com/planet1');

    expect(planetName).toBeInTheDocument();
    expect(rotationPeriod).toBeInTheDocument();
    expect(orbitalPeriod).toBeInTheDocument();
    expect(diameter).toBeInTheDocument();
    expect(climate).toBeInTheDocument();
    expect(gravity).toBeInTheDocument();
    expect(terrain).toBeInTheDocument();
    expect(surfaceWater).toBeInTheDocument();
    expect(population).toBeInTheDocument();
    expect(films).toBeInTheDocument();
    expect(created).toBeInTheDocument();
    expect(edited).toBeInTheDocument();
    expect(url).toBeInTheDocument();
  });

  test('renders Filter component', () => {
    const { getByRole } = render(<App />);
    const name = getByRole('columnheader', {  name: /name/i})
    expect(name).toBeInTheDocument();
    const rotation = getByRole('columnheader', {  name: /rotation period/i})
    expect(rotation).toBeInTheDocument();
    const orbitalPeriod = getByRole('columnheader', {  name: /orbital period/i})
    expect(orbitalPeriod).toBeInTheDocument();
    const diameter = getByRole('columnheader', {  name: /diameter/i})
    expect(diameter).toBeInTheDocument();
    const climate = getByRole('columnheader', {  name: /climate/i})
    expect(climate).toBeInTheDocument();
    const gravity = getByRole('columnheader', {  name: /gravity/i})
    expect(gravity).toBeInTheDocument();
    const terrain = getByRole('columnheader', {  name: /terrain/i})
    expect(terrain).toBeInTheDocument();
    const surfaceWater = getByRole('columnheader', {  name: /surface water/i})
    expect(surfaceWater).toBeInTheDocument();
    const population = getByRole('columnheader', {  name: /population/i})
    expect(population).toBeInTheDocument();
    const films = getByRole('columnheader', {  name: /films/i})
    expect(films).toBeInTheDocument();
    const created = getByRole('columnheader', {  name: /created/i})
    expect(created).toBeInTheDocument();
    const edited = getByRole('columnheader', {  name: /edited/i})
    expect(edited).toBeInTheDocument();
    const table = getByRole('table')
    expect(table).toBeInTheDocument();
  });
});
