import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { categories, colors } from "../constants";
import ImageUrlField from "./ImageURLField";
import FormControls from "./FormControls";
import { useGlobalState } from "@/context/GlobalStateContext"; // Import the context hook

const FormModal: React.FC = () => {
  const {
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
  } = useGlobalState(); // Access values and functions from the context

  const [open, setOpen] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit data");
      }
      const data = await response.json();
      console.log("Data submitted successfully:", data);
      // Clear out all the fields by resetting their state values
      setBrand("");
      setSelectedGender("");
      setSelectedCategory("");
      setInStock(true);
      setIsHidden(false);
      setSelectedColors([]);
      setSelectedSizes([]);
      setImageUrls([""]);
      setName("");
      setDescription("");
      setShippingPolicy("");
      setPrice(0);

      handleClose();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Data
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Data</DialogTitle>
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
          />
          <ImageUrlField imageUrls={imageUrls} setImageUrls={setImageUrls} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            onClick={() =>
              handleSubmit({
                colors: selectedColors,
                sizes: selectedSizes,
                isHidden: isHidden,
                inStock: inStock,
                images: imageUrls,
                gender: selectedGender,
                brand: brand,
                category: selectedCategory,
                price: price,
                description: description,
                shippingPolicy: shippingPolicy,
                name: name,
              })
            }
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default FormModal;
