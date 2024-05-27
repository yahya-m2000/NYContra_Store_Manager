import React, { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import CategorySelect from "./CategorySelect.tsx";

const FormControls: React.FC<FormControlsProps> = ({
  price,
  setPrice,
  name,
  setName,
  description,
  setDescription,
  shippingPolicy,
  setShippingPolicy,
  brand,
  setBrand,
  setSelectedGender,
  selectedGender,
  selectedCategory,
  setSelectedCategory,
  selectedColors = [],
  setSelectedColors,
  selectedSizes,
  setSelectedSizes,
  inStock,
  setInStock,
  isHidden,
  setIsHidden,
  categories,
  colors,
}) => {
  const handleColorChange = (selectedColor: string[]) => {
    setSelectedColors(selectedColor);
  };

  const handleSizeChange = (event: SelectChangeEvent<string[]>) => {
    const selectedSizes = event.target.value as string[];
    setSelectedSizes(selectedSizes);
  };

  const handleSelectedGender = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedGender(event.target.value);
  };

  const handleBrandChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBrand(event.target.value);
  };

  const handleCheckboxChange =
    (setter: (value: boolean) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.checked);
    };

  return (
    <>
      <TextField
        autoFocus
        required
        margin="dense"
        id="name"
        name="name"
        label="Name"
        type="text"
        fullWidth
        variant="standard"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FormControl required>
        <FormLabel>Gender</FormLabel>
        <RadioGroup row name="gender" onChange={handleSelectedGender}>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="unisex" control={<Radio />} label="Unisex" />
        </RadioGroup>
      </FormControl>
      <TextField
        required
        id="description"
        name="description"
        label="Description"
        multiline
        rows={4}
        fullWidth
        variant="standard"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        required
        id="shipping_policy"
        name="shippingPolicy"
        label="Shipping Policy"
        multiline
        rows={4}
        fullWidth
        variant="standard"
        value={shippingPolicy}
        onChange={(e) => setShippingPolicy(e.target.value)}
      />
      <TextField
        required
        margin="dense"
        id="price"
        name="price"
        label="Price"
        type="text"
        fullWidth
        variant="standard"
        value={price}
        onChange={(e) => setPrice(parseInt(e.target.value))}
      />
      <CategorySelect
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      {selectedCategory && (
        <Select
          required
          margin="dense"
          id="sizes"
          name="sizes"
          label="Sizes"
          value={Array.isArray(selectedSizes) ? selectedSizes : []}
          onChange={handleSizeChange}
          multiple
          fullWidth
          variant="standard"
        >
          {selectedCategory === "Clothing" &&
            categories
              .find((category) => category.value === "Clothing")
              ?.options.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
          {selectedCategory === "Footwear" &&
            categories
              .find((category) => category.value === "Footwear")
              ?.options.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
        </Select>
      )}
      <TextField
        required
        margin="dense"
        id="brand"
        name="brand"
        label="Brand"
        type="text"
        fullWidth
        variant="standard"
        value={brand}
        onChange={handleBrandChange}
      />
      <FormControl required>
        <FormLabel>Colours</FormLabel>
        <FormGroup row>
          {colors.map((color) => (
            <FormControlLabel
              key={color.value}
              control={
                <Checkbox
                  onChange={() =>
                    handleColorChange([...selectedColors, color.value])
                  }
                  value={color.value}
                  checked={selectedColors.includes(color.value)}
                />
              }
              label={color.label}
            />
          ))}
        </FormGroup>
      </FormControl>

      <FormControl required>
        <FormLabel>In Stock</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={inStock}
              onChange={handleCheckboxChange(setInStock)}
            />
          }
          label="If the item is in stock"
        />
        <FormLabel>Hidden</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={isHidden}
              onChange={handleCheckboxChange(setIsHidden)}
            />
          }
          label="If you want to hide this item from the website"
        />
      </FormControl>
    </>
  );
};

export default FormControls;
