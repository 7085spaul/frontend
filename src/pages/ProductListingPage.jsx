import { useState, useEffect } from 'react';
import { useFilters } from '../context/FilterContext';
import { fetchProducts, fetchCategories, fetchAllProducts, searchProducts, fetchProductsByCategory } from '../services/api';
import Header from '../components/Header';
import Filters from '../components/Filters';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

// Debounce hook to delay search API calls
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const ProductListingPage = () => {
  const { filters, updateFilter } = useFilters();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const productsPerPage = 12;

  // Debounce search query to prevent API calls on every keystroke
  const debouncedSearchQuery = useDebounce(filters.search, 300);
  
  // Debounce price range inputs to prevent API calls on every keystroke
  const debouncedMinPrice = useDebounce(filters.minPrice, 500);
  const debouncedMaxPrice = useDebounce(filters.maxPrice, 500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesData, allProductsData] = await Promise.all([
          fetchCategories(),
          fetchAllProducts()
        ]);
        
        // Handle categories - they come as objects with slug, name, url
        setCategories(categoriesData);
        
        // Store all products for search suggestions
        setAllProducts(allProductsData.products);
        
        // Extract unique brands from all products
        const uniqueBrands = [...new Set(allProductsData.products.map(p => p.brand).filter(Boolean))];
        setBrands(uniqueBrands);
        
        // Load initial products
        const initialProducts = await fetchProducts(productsPerPage, 0);
        setProducts(initialProducts.products);
        setTotalPages(Math.ceil(initialProducts.total / productsPerPage));
        
        setError(null);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
        setInitialLoadComplete(true);
      }
    };

    fetchData();
  }, []);

  // Client-side search suggestions (no loading)
  useEffect(() => {
    if (debouncedSearchQuery && allProducts.length > 0) {
      const searchLower = debouncedSearchQuery.toLowerCase();
      const suggestions = allProducts.filter(p =>
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.brand?.toLowerCase().includes(searchLower)
      ).slice(0, 8); // Show top 8 suggestions
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [debouncedSearchQuery, allProducts]);

  useEffect(() => {
    // Skip if initial load not complete or allProducts not loaded
    if (!initialLoadComplete || allProducts.length === 0) {
      return;
    }

    const fetchFilteredProducts = async () => {
      try {
        // Only show loading for non-search operations
        if (!debouncedSearchQuery) {
          setLoading(true);
        }
        
        let data;
        const skip = (currentPage - 1) * productsPerPage;

        // Use client-side search for instant results (no loading)
        if (debouncedSearchQuery) {
          // Filter from all products for instant search
          const searchLower = debouncedSearchQuery.toLowerCase();
          let filtered = allProducts.filter(p =>
            p.title.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower) ||
            p.brand?.toLowerCase().includes(searchLower)
          );
          
          // Apply price and brand filters
          if (debouncedMinPrice) {
            filtered = filtered.filter(p => p.price >= parseFloat(debouncedMinPrice));
          }
          if (debouncedMaxPrice) {
            filtered = filtered.filter(p => p.price <= parseFloat(debouncedMaxPrice));
          }
          if (filters.brands.length > 0) {
            filtered = filtered.filter(p => filters.brands.includes(p.brand));
          }
          
          // Paginate client-side
          const startIndex = skip;
          const paginatedProducts = filtered.slice(startIndex, startIndex + productsPerPage);
          
          setProducts(paginatedProducts);
          setTotalPages(Math.ceil(filtered.length / productsPerPage) || 1);
          return;
        }
        // Use API category filter if category is selected
        else if (filters.category) {
          data = await fetchProductsByCategory(filters.category, productsPerPage, skip);
        }
        // Otherwise fetch all products
        else {
          data = await fetchProducts(productsPerPage, skip);
        }

        let filteredProducts = data.products;

        // Apply client-side filters for price and brand (API doesn't support these)
        if (debouncedMinPrice) {
          filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(debouncedMinPrice));
        }
        if (debouncedMaxPrice) {
          filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(debouncedMaxPrice));
        }
        if (filters.brands.length > 0) {
          filteredProducts = filteredProducts.filter(p => filters.brands.includes(p.brand));
        }

        setProducts(filteredProducts);
        
        // Calculate total pages based on filtered results for client-side filters
        // If no client-side filters, use API total
        if (debouncedMinPrice || debouncedMaxPrice || filters.brands.length > 0) {
          setTotalPages(Math.ceil(filteredProducts.length / productsPerPage) || 1);
        } else {
          setTotalPages(Math.ceil(data.total / productsPerPage));
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        if (!debouncedSearchQuery) {
          setLoading(false);
        }
      }
    };

    fetchFilteredProducts();
  }, [debouncedSearchQuery, filters.category, debouncedMinPrice, debouncedMaxPrice, filters.brands, currentPage, initialLoadComplete, allProducts.length];

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.category, debouncedMinPrice, debouncedMaxPrice, filters.brands, debouncedSearchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E3E6E6]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FF9900] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E3E6E6]">
        <div className="text-center text-red-600">
          <p className="text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#FF9900] text-white rounded hover:bg-[#e88b00] transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E3E6E6]">
      <Header 
        searchQuery={filters.search} 
        setSearchQuery={(value) => updateFilter('search', value)}
        onMenuClick={() => setIsFiltersVisible(!isFiltersVisible)}
        isFiltersVisible={isFiltersVisible}
        searchSuggestions={searchSuggestions}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {isFiltersVisible && (
            <aside className="flex-shrink-0">
              <Filters categories={categories} brands={brands} />
            </aside>
          )}

          {/* Product Grid */}
          <main className="flex-1">
            {products.length === 0 && !loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found matching your filters.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
