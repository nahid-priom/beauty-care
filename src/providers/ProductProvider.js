import { createContext, useContext, useState, useEffect } from 'react';
import { fetchProducts } from '../services/ProductsApi';

// Create context with default value
const ProductsContext = createContext({
  products: [],
  loading: true,
  error: null
});

export const ProductsProvider = ({ children }) => {
  const [state, setState] = useState({
    products: [],
    loading: true,
    error: null
  });

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
        
        setState({
          products: transformedProducts,
          loading: false,
          error: null
        });
      } catch (err) {
        setState({
          products: [],
          loading: false,
          error: err.message
        });
      }
    };

    getProducts();
  }, []);

  return (
    <ProductsContext.Provider value={state}>
      {children}
    </ProductsContext.Provider>
  );
};


export const useProducts = () => {
  const context = useContext(ProductsContext);
  
  if (context === undefined) {
    throw new Error(
      'useProducts must be used within a ProductsProvider. ' +
      'Make sure you have wrapped your component or App with <ProductsProvider>.'
    );
  }
  
  return context;
};