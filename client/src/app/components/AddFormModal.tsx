import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { Typography } from "@mui/material";

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

export default function FormModal() {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedColors, setSelectedColors] = React.useState("");

  const handleColorChange = (value: string) => {
    setSelectedColors((prevSelectedColors) => {
      if (prevSelectedColors.includes(value)) {
        // Deselect color if already selected
        return prevSelectedColors.filter((color) => color !== value);
      } else {
        // Select color if not already selected
        return [...prevSelectedColors, value];
      }
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch("http://localhost:3001/api/products/", {
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
      handleClose();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Data
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event: any) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            // console.log("FormData:", formData);
            const formJson = Object.fromEntries(formData.entries());
            // console.log("FormJson:", formJson);
            const dataSubmission = {
              ...formJson,
              colors: selectedColors,
            };

            console.log("Data submission:", dataSubmission);
            await handleSubmit(dataSubmission);

            // console.log("Test: ", dataSubmission);
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
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              // helperText="Please enter your name"
            />
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup row name="gender" aria-required>
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              autoFocus
              required
              id="description"
              name="description"
              label="Description"
              multiline
              rows={4}
              type="text"
              fullWidth
              variant="standard"
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
            />
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
              {/* {selectedCategory && (
                <FormGroup sx={{ flexDirection: "row" }}>
                  {selectedCategory === categories[0].label &&
                    categories.map((category) => (
                      <FormControlLabel
                        key={category.value}
                        control={<Checkbox />}
                        label={category.label}
                      />
                    ))}
                </FormGroup>
              )} */}
              {categories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.value}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              required
              margin="dense"
              id="brand"
              name="brand"
              label="Brand"
              type="text"
              fullWidth
              variant="standard"
            />
            <FormGroup>
              <FormLabel>Colours</FormLabel>
              <FormGroup sx={{ flexDirection: "row" }}>
                {colours.map((colour) => (
                  <FormControlLabel
                    key={colour.value}
                    control={
                      <Checkbox
                        onChange={() => handleColorChange(colour.value)}
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
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
