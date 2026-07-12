import { Link } from 'react-router-dom';

const Header = ({ searchQuery, setSearchQuery, onMenuClick, searchSuggestions = [] }) => {
  return (
    <header className="bg-[#131921] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Hamburger Menu */}
          <button 
            onClick={onMenuClick}
            className="p-2 hover:bg-[#3a4553] rounded-lg transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white hover:text-[#FF9900] transition">
            ShopHub
          </Link>

          {/* Search Bar with Suggestions */}
          <div className="flex-1 max-w-2xl relative">
            <div className="flex">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
              />
              <button className="bg-[#FF9900] hover:bg-[#e88b00] px-6 py-2 rounded-r-lg transition">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            {/* Search Suggestions Dropdown */}
            {searchQuery && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white text-gray-900 rounded-b-lg shadow-lg mt-1 max-h-96 overflow-y-auto z-50">
                {searchSuggestions.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 transition border-b border-gray-100 last:border-0"
                    onClick={() => setSearchQuery('')}
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-12 h-12 object-contain"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">{product.title}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                    <p className="text-sm font-bold text-[#B12704]">${product.price}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-[#3a4553] rounded-lg transition flex flex-col items-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs">Cart</span>
            </button>
            <button className="p-2 hover:bg-[#3a4553] rounded-lg transition flex flex-col items-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-xs">Orders</span>
            </button>
            <button className="p-2 hover:bg-[#3a4553] rounded-lg transition flex flex-col items-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs">Account</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
