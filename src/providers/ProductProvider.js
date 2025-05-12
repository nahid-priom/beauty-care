// src/providers/ProductsProvider.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { fetchProducts } from '../services/ProductsApi';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        const transformedProducts = data.map(product => ({
          id: product.id,
          name: product.title,
          category: product.category,
          slug: product.category.replace(/\s+/g, '-').toLowerCase(),
          price: product.price,
          discountPrice: product.price * 0.9,
          rating: product.rating.rate,
          image: product.thumbnail,
          inStock: product.stock > 0,
        }));
        setProducts(transformedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};