import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormGroup,
  Checkbox,
  MenuItem,
} from "@mui/material";

interface UpdateFormModalProps {
  open: boolean;
  onClose: () => void;
  handleSubmit: (data: any) => void;
  categories: { value: string; label: string }[];
  colours: { value: string; label: string }[];
  selectedItem: object;
}

const categories = [
  {
    value: "Clothing",
    label: "Clothing",
    options: ["S", "M", "L"],
  },
  {
    value: "Footwear",
    label: "Footwear",
    options: ["5", "6", "7"],
  },
];

const colours = [
  {
    value: "Black",
    label: "Black",
  },
  {
    value: "White",
    label: "White",
  },
  {
    value: "Multi-colour",
    label: "Multi-colour",
  },
  {
    value: "Red",
    label: "Red",
  },
  {
    value: "Blue",
    label: "Blue",
  },
  {
    value: "Green",
    label: "Green",
  },
  {
    value: "Yellow",
    label: "Yellow",
  },
  {
    value: "Purple",
    label: "Purple",
  },
  {
    value: "Pink",
    label: "Pink",
  },
  {
    value: "Orange",
    label: "Orange",
  },
  {
    value: "Brown",
    label: "Brown",
  },
  {
    value: "Gray",
    label: "Gray",
  },
];

const UpdateFormModal: React.FC<UpdateFormModalProps> = ({
  open,
  onClose,
  selectedItem,
}) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<any>({});

  //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = event.target;
  //     setFormValues((prevValues: any) => ({
  //       ...prevValues,
  //       [name]: value,
  //     }));
  //   };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedColors((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((color) => color !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };

  const handleSubmit = async (formData: any) => {
    try {
      console.log(selectedItem._id);
      const response = await fetch(
        `${process.env.API_URL}?id=${selectedItem._id}`,
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
      onClose();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSubmit(formValues);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const dataSubmission = {
            ...formJson,
            colors: selectedColors,
          };
          await handleSubmit(dataSubmission);
          onClose(); // Close the modal after submitting the form
        },
      }}
    >
      <DialogTitle>Add Data</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill out all the text fields and options
        </DialogContentText>
        <FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={selectedItem.name}
          />
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup row name="gender">
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            autoFocus
            id="description"
            name="description"
            label="Description"
            multiline
            rows={4}
            type="text"
            fullWidth
            variant="standard"
            defaultValue={selectedItem.description}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={selectedItem.price}
          />
          <TextField
            margin="dense"
            id="category"
            name="category"
            label="Category"
            select
            fullWidth
            variant="standard"
            defaultValue={selectedItem.category}
          >
            {categories.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            id="brand"
            name="brand"
            label="Brand"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={selectedItem.brand}
          />
          <FormGroup>
            <FormLabel>Colours</FormLabel>
            <FormGroup sx={{ flexDirection: "row" }}>
              {colours.map((colour) => (
                <FormControlLabel
                  key={colour.value}
                  control={
                    <Checkbox
                      onChange={handleColorChange}
                      value={colour.value}
                      checked={selectedColors.includes(colour.value)}
                    />
                  }
                  label={colour.label}
                />
              ))}
            </FormGroup>
          </FormGroup>
          <TextField
            autoFocus
            margin="dense"
            id="image-url"
            name="images"
            label="Image URL"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={selectedItem.images}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateFormModal;
