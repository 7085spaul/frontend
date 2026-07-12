import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <FilterProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProductListingPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </Router>
    </FilterProvider>
  );
}

export default App;
