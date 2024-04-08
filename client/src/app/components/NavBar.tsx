import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import SearchBar from "./SearchBar";

interface NavBarProps {
  setSearchTerm: any;
  searchTerm: any;
  handleSearch: any;
}

export default function NavBar({
  setSearchTerm,
  searchTerm,
  handleSearch,
}: NavBarProps) {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            display={"grid"}
            flex={1}
            gridTemplateColumns={"repeat(3, 1fr)"}
            // sx={{ backgroundColor: "red" }}
          >
            <Box
              display={"flex"}
              flex={1}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <ArrowBack
                onClick={() => router.back()}
                sx={{ marginInline: 2, cursor: "pointer" }}
              />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  cursor: "pointer",
                }}
                onClick={() => router.push(`http://localhost:3000`)}
              >
                NYCONTRA CMS
              </Typography>
            </Box>
            <SearchBar
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              handleSearch={handleSearch}
            />
            <Box />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
