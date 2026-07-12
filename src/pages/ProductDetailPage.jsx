import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import Header from '../components/Header';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-[#FF9900] text-2xl">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-[#FF9900] text-2xl">★</span>);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300 text-2xl">★</span>);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E3E6E6]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FF9900] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E3E6E6]">
        <div className="text-center text-red-600">
          <p className="text-xl mb-4">{error}</p>
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-[#FF9900] text-white rounded hover:bg-[#e88b00] transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E3E6E6]">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Product not found</p>
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-[#FF9900] text-white rounded hover:bg-[#e88b00] transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E3E6E6]">
      <Header searchQuery="" setSearchQuery={() => {}} onMenuClick={() => {}} isFiltersVisible={false} searchSuggestions={[]} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-[#007185] hover:text-[#C7511F] transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="text-lg text-gray-600">({product.rating})</span>
              </div>

              <p className="text-4xl font-bold text-[#B12704] mb-6">${product.price}</p>

              <div className="space-y-4 mb-6">
                <div>
                  <span className="font-semibold text-gray-700">Brand:</span>
                  <span className="ml-2 text-gray-600">{product.brand}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Category:</span>
                  <span className="ml-2 text-gray-600 capitalize">{product.category}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Additional Product Info */}
              {product.stock !== undefined && (
                <div className="mb-6">
                  <span className="font-semibold text-gray-700">Availability:</span>
                  <span className={`ml-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
              )}

              <button className="w-full py-3 bg-[#FF9900] text-white font-semibold rounded hover:bg-[#e88b00] transition mb-4">
                Add to Cart
              </button>

              <button className="w-full py-3 border-2 border-[#FF9900] text-[#FF9900] font-semibold rounded hover:bg-[#FFF8E7] transition">
                Buy Now
              </button>
            </div>
          </div>

          {/* Reviews Section */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="border-t border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {review.reviewerName.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-800">{review.reviewerName}</span>
          </div>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                        <span className="text-gray-600">({review.rating})</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product Images Gallery */}
          {product.images && product.images.length > 1 && (
            <div className="border-t border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${product.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
