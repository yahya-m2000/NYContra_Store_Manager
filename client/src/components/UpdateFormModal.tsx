import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FormControls from "./FormControls";
import { colors, categories } from "../constants";
import { useGlobalState } from "@/context/GlobalStateContext";

interface UpdateFormModalProps {
  open: boolean;
  onClose: () => void;
  selectedItem: any;
}

const UpdateFormModal: React.FC<UpdateFormModalProps> = ({
  open,
  onClose,
  selectedItem,
}) => {
  const {
    id,
    setId,
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
    name,
    setName,
    description,
    setDescription,
    shippingPolicy,
    setShippingPolicy,
    price,
    setPrice,
  } = useGlobalState(); // Access state values and functions from the context

  React.useEffect(() => {
    // Set initial values from selectedItem when it changes
    if (selectedItem) {
      setId(selectedItem.id);
      setName(selectedItem.name);
      setDescription(selectedItem.description);
      setShippingPolicy(selectedItem.shippingPolicy);
      setPrice(selectedItem.price);
      setBrand(selectedItem.brand);
      setSelectedGender(selectedItem.selectedGender);
      setSelectedCategory(selectedItem.selectedCategory);
      setSelectedColors(selectedItem.selectedColors);
      setSelectedSizes(selectedItem.selectedSizes);
      setInStock(selectedItem.inStock);
      setIsHidden(selectedItem.isHidden);
      setSelectedCategory(selectedItem.selectedCategory);
      setImageUrls(selectedItem.imageUrls);
    }
  }, [selectedItem]); // Run effect when selectedItem changes

  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/?id=${id}`!,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit data");
      }
      const data = await response.json();
      console.log("Data submitted successfully:", data);
      // Clear out all the fields by resetting their state values
      setId("");
      setName("");
      setDescription("");
      setShippingPolicy("");
      setPrice(0);
      setBrand("");
      setSelectedGender("");
      setSelectedCategory("");
      setSelectedColors([]);
      setSelectedSizes([]);
      setInStock(true);
      setIsHidden(false);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleFormSubmit = async () => {
    const formData = {
      name,
      description,
      shippingPolicy,
      price,
      isHidden,
      brand,
      selectedGender,
      selectedCategory,
      selectedColors,
      selectedSizes,
      inStock,
    };
    await handleSubmit(formData);
    onClose(); // Close the modal after submitting the form
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Data</DialogTitle>
      <DialogContent>
        <FormControls
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          shippingPolicy={shippingPolicy}
          setShippingPolicy={setShippingPolicy}
          price={price}
          setPrice={setPrice}
          isHidden={isHidden}
          brand={brand}
          setBrand={setBrand}
          setSelectedGender={setSelectedGender}
          selectedGender={selectedGender}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
          inStock={inStock}
          setInStock={setInStock}
          setIsHidden={setIsHidden}
          categories={categories}
          colors={colors}
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleFormSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateFormModal;
