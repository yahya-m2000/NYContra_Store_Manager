import * as React from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Button,
  Pagination,
} from "@mui/material";
import UpdateFormModal from "./UpdateFormModal";
import { SearchContext } from "@/context/SearchContext";

const SearchResults = () => {
  const {
    setTotalPages,
    setCurrentPage,
    totalPages,
    currentPage,
    searchResults,
    setSearchResults,
    selectedItem,
    setSelectedItem,
    loading,
    setLoading,
    isUpdateModalOpen,
    setUpdateModalOpen,
  } = React.useContext(SearchContext) as SearchContextType;

  const searchParams = useSearchParams();

  const handleCloseModal = () => {
    setSelectedItem(null);
    setUpdateModalOpen(false);
  };

  const handleOpenModal = (item: SearchResult | null) => {
    setSelectedItem(item);
    setUpdateModalOpen(true);
    console.log("Updating item:", item);
  };

  const handleDeleteClick = async (item: SearchResult | null) => {
    if (!item) return;

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/?id=${item.id}`;

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      //@ts-ignore
      setSearchResults((prevResults) =>
        (prevResults as SearchResult[]).filter(
          (result: SearchResult) => result.id !== item.id
        )
      );

      console.log("Deleted item:", item);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const fetchSearchResults = async (query: string, page: number) => {
    try {
      const limit = 10; // You can set this to any value you prefer
      const url =
        query === "all"
          ? `${process.env.NEXT_PUBLIC_API_URL}?page=${page}&limit=${limit}`
          : `${process.env.NEXT_PUBLIC_API_URL}/?name=${query}&page=${page}&limit=${limit}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      setSearchResults(data.products);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setLoading(false);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", newPage.toString());
    window.history.pushState({}, "", `?${queryParams.toString()}`);
    fetchSearchResults(queryParams.get("name") || "all", newPage);
  };

  React.useEffect(() => {
    const query = searchParams.get("name") || "all";
    const page = searchParams.get("page") || "1"; // Ensure page is a string
    fetchSearchResults(query, parseInt(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <Box display={"flex"} flexDirection={"column"} flex={1} height={"100vw"}>
        {searchResults.map((result) => (
          <Card key={result.id} sx={{ display: "grid", flex: 0.1 }}>
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
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
                  {result.sizes && (
                    <Typography variant="body2" color="text.secondary">
                      {result.sizes.map((size, index) => (
                        <span key={index}>
                          {size}
                          {index !== result.sizes.length - 1 && ", "}
                        </span>
                      ))}
                    </Typography>
                  )}
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
                {result.colors && result.colors.length > 0 && (
                  <Box marginInline={2}>
                    <Typography variant="body2" color="text.secondary">
                      Colors
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {result.colors.map((color, index) => (
                        <span key={index}>
                          {color}
                          {index !== result.colors.length - 1 && ", "}
                        </span>
                      ))}
                    </Typography>
                  </Box>
                )}
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <CardActions>
                  <Button size="small" onClick={() => handleOpenModal(result)}>
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
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
        {selectedItem && (
          <UpdateFormModal
            open={isUpdateModalOpen}
            onClose={handleCloseModal}
            selectedItem={selectedItem}
          />
        )}
      </Box>
    </React.Fragment>
  );
};

export default SearchResults;
