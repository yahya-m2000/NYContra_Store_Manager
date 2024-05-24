"use client";

import React, { createContext, useState, useContext } from "react";

// Create the context
export const GlobalStateContext = createContext<GlobalState | undefined>(
  undefined
);
interface GlobalStateProviderProps {
  children: React.ReactNode;
}

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}) => {
  const [id, setId] = useState("");
  const [formData, setFormData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [brand, setBrand] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [inStock, setInStock] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState([""]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [shippingPolicy, setShippingPolicy] = useState("");
  const [price, setPrice] = useState<number>(0);

  const state: GlobalState = {
    id,
    setId,
    formData,
    setFormData,
    searchTerm,
    setSearchTerm,
    brand,
    setBrand,
    selectedGender,
    setSelectedGender,
    selectedCategory,
    setSelectedCategory,
    inStock,
    setInStock,
    isHidden,
    setIsHidden,
    selectedColors,
    setSelectedColors,
    selectedSizes,
    setSelectedSizes,
    imageUrls,
    setImageUrls,
    open,
    setOpen,
    name,
    setName,
    description,
    setDescription,
    shippingPolicy,
    setShippingPolicy,
    price,
    setPrice,
  };

  return (
    <GlobalStateContext.Provider value={state}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to consume the global state
export const useGlobalState = (): GlobalState => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
