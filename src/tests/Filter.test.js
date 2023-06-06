import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import filterContext from '../context/createContext';
import App from '../App';
import Filter from '../components/Filter';
import apiResponse from './Mock';

describe('Filter', () => {
    let handleChangeInputText;
    let applyNumericFilter;
    let removeNumericFilter;
  
    beforeEach(() => {
      handleChangeInputText = jest.fn();
      applyNumericFilter = jest.fn();
      removeNumericFilter = jest.fn();
  
      filterContext.handleChangeInputText = handleChangeInputText;
      filterContext.applyNumericFilter = applyNumericFilter;
      filterContext.removeNumericFilter = removeNumericFilter;
    });
  
    test('Verifica se os elementos estão presentes', () => {
      const { getByTestId } = render(<App />);
  
      const nameFilterInput = getByTestId('name-filter');
      const columnFilterSelect = getByTestId('column-filter');
      const comparisonFilterSelect = getByTestId('comparison-filter');
      const valueFilterInput = getByTestId('value-filter');
      const filterButton = getByTestId('button-filter');
  
      expect(nameFilterInput).toBeInTheDocument();
      expect(columnFilterSelect).toBeInTheDocument();
      expect(comparisonFilterSelect).toBeInTheDocument();
      expect(valueFilterInput).toBeInTheDocument();
      expect(filterButton).toBeInTheDocument();
    });
  
    test('handles filter change', () => {
        const handleChangeInputText = jest.fn();
        const { getByTestId, getByRole } = render(
          <filterContext.Provider value={{ handleChangeInputText }}>
            <Filter />
          </filterContext.Provider>
        );

        const nameFilterInput = getByTestId('name-filter');
        fireEvent.change(nameFilterInput, { target: { value: 'filter text' } });
      
        expect(handleChangeInputText).toHaveBeenCalledWith('filter text');
      });

      test('testando filtro texto', () => {
        render(<App />);
        const textName = screen.getByRole('textbox');

        fireEvent.change(textName, { target: { value: 'aa' } });
      
        expect(textName.value).toBe('aa');
      });

  test('testando filtro numerico', () => {
    const { getByRole } = render(<App />);

    const valueFilterInput = getByRole('spinbutton');
    const filterButton = getByRole('button', {  name: /filtrar/i})
    
    userEvent.clear(valueFilterInput);
    userEvent.type(valueFilterInput, '2000');
    fireEvent.click(filterButton);
    const spanText = screen.getByText(/population maior que 2000/i)

    expect(spanText).toBeInTheDocument();

    const removeAllFiltersButton = getByRole('button', {  name: /remover todas as filtragens/i})
    fireEvent.click(removeAllFiltersButton);

    expect(spanText).not.toBeInTheDocument();
    userEvent.clear(valueFilterInput);
    userEvent.type(valueFilterInput, '2000');
    fireEvent.click(filterButton);
    const btnRemoveSpan = getByRole('button', {  name: /remover filtro/i})
    expect(btnRemoveSpan).toBeInTheDocument();
    fireEvent.click(btnRemoveSpan);
    expect(spanText).not.toBeInTheDocument();
    expect(btnRemoveSpan).not.toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks()
  });

  it('Testando exibição da api com mock', async () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(apiResponse)
      })
      render(<App />)
      const allPlanetsName = await screen.findByText('Tatooine');
      const PlanetsYavin = await screen.findByText('Yavin IV');
      expect(allPlanetsName).toBeInTheDocument();
      expect(PlanetsYavin).toBeInTheDocument();
      expect(global.fetch).toHaveBeenCalledTimes(1);
     
      const valueFilterInput = screen.getByRole('spinbutton');
    const filterButton = screen.getByRole('button', {  name: /filtrar/i})
    
    userEvent.clear(valueFilterInput);
    userEvent.type(valueFilterInput, '2000');
    fireEvent.click(filterButton);
    const spanText = screen.getByText(/population maior que 2000/i)
    })
});
