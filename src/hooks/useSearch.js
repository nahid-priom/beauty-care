// src/hooks/useSearch.js
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';

export const useSearch = (products = []) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const timeoutRef = useRef();
  const prevQueryRef = useRef('');

  const filteredResults = useMemo(() => {
    // Skip if query hasn't changed
    if (prevQueryRef.current === searchQuery) {
      return searchSuggestions;
    }

    // Validate products array
    if (!Array.isArray(products)) {
      console.error('useSearch: products must be an array');
      return [];
    }

    // Skip if query is too short
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
  }, [searchQuery, products, searchSuggestions]); // Added searchSuggestions to dependencies

  const updateSuggestions = useCallback(() => {
    if (JSON.stringify(filteredResults) !== JSON.stringify(searchSuggestions)) {
      setSearchSuggestions(filteredResults);
      prevQueryRef.current = searchQuery;
    }
  }, [filteredResults, searchSuggestions, searchQuery]);

  useEffect(() => {
    // Clear previous timeout
    clearTimeout(timeoutRef.current);

    // Only set new timeout if we have actual changes
    timeoutRef.current = setTimeout(updateSuggestions, 200);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [updateSuggestions]); // Now depends on the stable updateSuggestions callback

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