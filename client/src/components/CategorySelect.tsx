import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const CategorySelect: React.FC<CategorySelectProps> = ({
  setSelectedCategory,
  categories,
}) => {
  return (
    <TextField
      required
      margin="dense"
      id="category"
      name="category"
      label="Category"
      select
      fullWidth
      variant="standard"
    >
      {categories.map((category) => (
        <MenuItem
          required
          key={category.value}
          value={category.value}
          onClick={() => setSelectedCategory(category.value)}
        >
          {category.value}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CategorySelect;
