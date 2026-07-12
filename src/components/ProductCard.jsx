import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useFilters } from '../context/FilterContext';

const ProductCard = ({ product }) => {
  const { updateFilter } = useFilters();

  // Generate deterministic review count from product ID (pure function)
  const reviewCount = useMemo(() => {
    // Use product ID to generate a pseudo-random but consistent number
    const seed = product.id * 9973; // Prime number for better distribution
    return (seed % 5000) + 100;
  }, [product.id]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-[#FF9900]">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-[#FF9900]">★</span>);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }

    return stars;
  };

  const handleClick = () => {
    // Clear search query when navigating to product detail
    updateFilter('search', '');
  };

  return (
    <Link to={`/product/${product.id}`} className="block" onClick={handleClick}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-200">
        <div className="aspect-square overflow-hidden bg-gray-100 p-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 text-sm" title={product.title}>
            {product.title}
          </h3>
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-sm">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-[#007185] hover:text-[#C7511F] cursor-pointer">
              ({reviewCount})
            </span>
          </div>
          <p className="text-xl font-bold text-[#B12704] mb-1">${product.price}</p>
          <p className="text-xs text-gray-500">
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
