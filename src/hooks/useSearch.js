
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';

export const useSearch = (products = []) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const timeoutRef = useRef();
  const prevQueryRef = useRef('');

  const filteredResults = useMemo(() => {
    if (prevQueryRef.current === searchQuery) {
      return searchSuggestions;
    }

    if (!Array.isArray(products)) {
      console.error('useSearch: products must be an array');
      return [];
    }


    if (searchQuery.trim().length < 3) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    return products
      .filter(product => {
        const productName = product?.name?.toLowerCase() || '';
        return productName.includes(query);
      })
      .slice(0, 5);
  }, [searchQuery, products, searchSuggestions]); 
  const updateSuggestions = useCallback(() => {
    if (JSON.stringify(filteredResults) !== JSON.stringify(searchSuggestions)) {
      setSearchSuggestions(filteredResults);
      prevQueryRef.current = searchQuery;
    }
  }, [filteredResults, searchSuggestions, searchQuery]);

  useEffect(() => {

    clearTimeout(timeoutRef.current);


    timeoutRef.current = setTimeout(updateSuggestions, 200);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [updateSuggestions]);

  const stableSetSearchQuery = useCallback((value) => {
    const newValue = String(value || '');
    if (newValue !== searchQuery) {
      setSearchQuery(newValue);
    }
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery: stableSetSearchQuery,
    searchSuggestions: Array.isArray(searchSuggestions) ? searchSuggestions : [],
  };
};