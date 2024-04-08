"use client";
import * as React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";
import Button from "@mui/material/Button";
import NavBar from "../components/NavBar";
import UpdateFormModal from "../components/UpdateFormModal";
import { useSearchParams } from "next/navigation";

interface SearchResult {
  _id: any;
  name: string;
  price: string;
  brand: string;
  colors: any;
  createdAt: string;
  gender: string;
  images: React.ReactNode;
  sizes: React.ReactNode;
  updatedAt: string;
  description: string;
  category: string;
}

interface SearchProps {
  setSearchTerm: any;
  searchTerm: any;
  handleSearch: any;
}

export default function Search({
  setSearchTerm,
  searchTerm,
  handleSearch,
}: SearchProps) {
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<SearchResult | null>(
    null
  );
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isUpdateModalOpen, setUpdateModalOpen] =
    React.useState<boolean>(false);

  const searchParams = useSearchParams(); // Call useSearchParams directly inside the function component

  const handleCloseModal = () => {
    setSelectedItem(null);
    setUpdateModalOpen(false); // Close the modal
  };

  const handleUpdateClick = (item: SearchResult) => {
    setSelectedItem(item);
    setUpdateModalOpen(true); // Open the modal when the update button is clicked
    console.log("Updating item:", item);
    // console.log("Selected item:", selectedItem);
  };

  const handleDeleteClick = async (item: SearchResult) => {
    try {
      setSelectedItem(item);
      console.log("Deleting item:", item);
    } catch (error) {
      if (!selectedItem) return console.log("No item selected");
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/products/?id=${selectedItem._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      // Remove the deleted item from the search results
      setSearchResults((prevResults) =>
        prevResults.filter((result) => result._id !== selectedItem._id)
      );
      setSelectedItem(null); // Clear the selectedItem state
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  React.useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const query = searchParams.get("name") as string; // Get search query from URL
        console.log("Query:", query); // Log the query to see if it's correctly retrieved
        if (!query) return;

        // Perform search query
        if (query === "all") {
          const response = await fetch(`http://localhost:3001/api/products/`);
          console.log("Response:", response); // Log the response to see if it's successful
          if (!response.ok) {
            throw new Error("Failed to fetch search results");
          }
          const data = await response.json();
          console.log("Data:", data); // Log the data received from the API
          setSearchResults(data);
          setLoading(false);
        } else {
          const response = await fetch(
            `http://localhost:3001/api/products/?name=${query}`
          );
          console.log("Response:", response); // Log the response to see if it's successful
          if (!response.ok) {
            throw new Error("Failed to fetch search results");
          }
          const data = await response.json();
          console.log("Data:", data); // Log the data received from the API
          setSearchResults(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchParams]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Box
          display={"flex"}
          flexDirection={"column"}
          flex={1}
          height={"100vw"}
        >
          <Box>
            <NavBar
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              handleSearch={handleSearch}
            />
          </Box>
          {/* <Box sx={{ display: "flex", height: "100vw", flexDirection: "row" }}> */}
          {searchResults.map((result, index) => (
            // eslint-disable-next-line react/jsx-key
            <Card
              sx={{
                display: "grid",
                flex: 0.1,
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                {/* 1 */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <CardMedia
                    sx={{ height: 100, width: 100 }}
                    image={result.images[0]}
                    title="results"
                  />
                  <Typography marginInline={2}>{result.name}</Typography>
                </Box>

                {/* 2 */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <Box marginInline={2}>
                    <Typography variant="body2" color="text.secondary">
                      Description
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {result.description}
                    </Typography>
                  </Box>
                  <Box marginInline={2}>
                    <Typography variant="body2" color="text.secondary">
                      Price
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {result.price}
                    </Typography>
                  </Box>
                  <Box marginInline={2}>
                    <Typography variant="body2" color="text.secondary">
                      Sizes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {result.sizes[0]}
                    </Typography>
                  </Box>
                  <Box marginInline={2}>
                    <Typography variant="body2" color="text.secondary">
                      Gender
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {result.gender}
                    </Typography>
                  </Box>
                  <Box marginInline={2}>
                    <Typography variant="body2" color="text.secondary">
                      Category
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {result.category}
                    </Typography>
                  </Box>
                  <Box marginInline={2}>
                    <Typography variant="body2" color="text.secondary">
                      Colours
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {result.colors}
                    </Typography>
                  </Box>
                  <Box marginInline={2}>
                    <Typography variant="body2" color="text.secondary">
                      Brand
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {result.brand}
                    </Typography>
                  </Box>
                  <Box marginInline={2}>
                    <Typography variant="body2" color="text.secondary">
                      Created
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {result.createdAt}
                    </Typography>
                  </Box>
                  <Box marginInline={2}>
                    <Typography variant="body2" color="text.secondary">
                      Updated
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {result.updatedAt}
                    </Typography>
                  </Box>
                </Box>
                {/* 3 */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleUpdateClick(result)}
                    >
                      Update
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleDeleteClick(result)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Box>
              </CardContent>
            </Card>
          ))}
          {/* </Box> */}
          {/* Update form modal */}
          {/* {selectedItem && <Typography>HELLO</Typography>} */}
          {selectedItem && (
            <UpdateFormModal
              open={isUpdateModalOpen}
              onClose={handleCloseModal}
              selectedItem={selectedItem}
              handleSubmit={function (data: any): void {
                throw new Error("Function not implemented.");
              }}
              categories={[]}
              colours={[]}
            />
          )}
        </Box>
      )}
    </>
  );
}
