import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";

const ImageUrlField: React.FC<ImageUrlFieldProps> = ({
  imageUrls, // Provide a default empty array if imageUrls is undefined
  setImageUrls,
}) => {
  const handleImageUrlChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newImageUrls = [...imageUrls];
      newImageUrls[index] = event.target.value;
      setImageUrls(newImageUrls);
    };

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageUrlField = (index: number) => () => {
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);
  };

  return (
    <FormControl>
      {imageUrls.map((url, index) => (
        <React.Fragment key={index}>
          <TextField
            required
            margin="dense"
            id={`image-url-${index}`}
            name={`images`}
            label={`Image URL`}
            type="url"
            fullWidth
            variant="standard"
            value={url}
            onChange={handleImageUrlChange(index)}
          />
          {index > 0 && (
            <Button
              variant="contained"
              color="secondary"
              onClick={removeImageUrlField(index)}
            >
              Remove
            </Button>
          )}
        </React.Fragment>
      ))}
      <Button variant="contained" color="primary" onClick={addImageUrlField}>
        Add Another Image URL
      </Button>
    </FormControl>
  );
};

export default ImageUrlField;
