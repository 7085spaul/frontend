import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    brands: [],
    search: ''
  });

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleBrand = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      brands: [],
      search: ''
    });
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilter, toggleBrand, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
