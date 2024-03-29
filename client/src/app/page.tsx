"use client";
import * as React from "react";

//

import { Box, Button, TextField, Typography } from "@mui/material";
import FormModal from "./components/FormModal";

export default function Home() {
  const [formData, setFormData] = React.useState(""); // State to hold form data

  const handleAddData = () => {
    // Function to handle adding new data
    fetch("your_api_endpoint_here", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: formData }), // Send form data to the API
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response from the API
        console.log("Data added successfully:", data);
        // Optionally, you can reset the form after successful addition
        setFormData("");
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error adding data:", error);
      });
  };

  return (
    <main>
      <Box
        component="section"
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography
          variant="h6"
          textAlign="center"
          gutterBottom={false}
          sx={{ fontWeight: "regular", letterSpacing: "0.4rem" }}
        >
          NYContra
        </Typography>
        <Typography variant="h2" textAlign="center" sx={{ fontWeight: "bold" }}>
          Content Management System
        </Typography>
        <Box
          component="section"
          display="flex"
          flexDirection={"row"}
          alignItems="center"
          justifyContent="center"
          margin={2}
        >
          <TextField
            id="outlined-basic"
            placeholder="Nike Airforce 1"
            label="Get Data"
            variant="outlined"
          />
        </Box>
        <Box
          component="section"
          display="flex"
          // width={"50vh"}
          flexDirection={"row"}
          alignItems="center"
          justifyContent="center"
        >
          <FormModal />
        </Box>
      </Box>
    </main>
  );
}
