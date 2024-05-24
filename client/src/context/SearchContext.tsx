// SearchContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

interface SearchProviderProps {
  children: React.ReactNode;
}

export const useSearchContext = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        setSearchResults,
        selectedItem,
        setSelectedItem,
        loading,
        setLoading,
        isUpdateModalOpen,
        setUpdateModalOpen,
        setTotalPages,
        setCurrentPage,
        totalPages,
        currentPage,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
