import { useFilters } from '../context/FilterContext';

const Filters = ({ categories, brands }) => {
  const { filters, updateFilter, toggleBrand, resetFilters } = useFilters();

  if (!categories || categories.length === 0) {
    return (
      <div className="w-64 bg-white p-4 rounded shadow-sm h-fit">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF9900]"></div>
        </div>
      </div>
    );
  }

  const handlePriceApply = () => {
    // Price filter is applied immediately through state
    console.log('Price filter applied:', filters.minPrice, filters.maxPrice);
  };

  return (
    <div className="w-64 bg-white p-4 rounded shadow-sm h-fit">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Filters</h3>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="w-full mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition text-sm"
      >
        Reset Filters
      </button>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-2 text-gray-800 text-sm">Category</h4>
        <select
          value={filters.category}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#FF9900] text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((category) => {
            // Handle both string and object category formats
            const categorySlug = typeof category === 'string' ? category : category.slug;
            const categoryName = typeof category === 'string' ? category : category.name;
            return (
              <option key={categorySlug} value={categorySlug}>
                {categoryName}
              </option>
            );
          })}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-2 text-gray-800 text-sm">Price Range</h4>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => updateFilter('minPrice', e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#FF9900] text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#FF9900] text-sm"
          />
        </div>
        <button
          onClick={handlePriceApply}
          className="w-full mt-2 px-4 py-2 bg-[#FF9900] text-white rounded hover:bg-[#e88b00] transition text-sm"
        >
          Apply
        </button>
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-2 text-gray-800 text-sm">Brands</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => {
            const brandStr = typeof brand === 'string' ? brand : String(brand);
            return (
              <label key={brandStr} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brandStr)}
                  onChange={() => toggleBrand(brandStr)}
                  className="w-4 h-4 text-[#FF9900] rounded focus:ring-[#FF9900]"
                />
                <span className="text-sm text-gray-700">{brandStr}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Filters;
