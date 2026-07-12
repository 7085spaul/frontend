const BASE_URL = 'https://dummyjson.com';

export const fetchProducts = async (limit = 12, skip = 0, category = null) => {
  try {
    let url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
    if (category) {
      url = `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const searchProducts = async (query, limit = 12, skip = 0) => {
  try {
    const url = `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to search products');
    return await response.json();
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products?limit=100`);
    if (!response.ok) throw new Error('Failed to fetch all products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};

export const fetchProductsByCategory = async (category, limit = 12, skip = 0) => {
  try {
    const url = `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products by category');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const fetchSortedProducts = async (sortBy = 'title', order = 'asc', limit = 12, skip = 0) => {
  try {
    const url = `${BASE_URL}/products?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch sorted products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching sorted products:', error);
    throw error;
  }
};
