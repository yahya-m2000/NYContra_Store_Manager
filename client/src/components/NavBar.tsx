import * as React from "react";

import { useRouter } from "next/navigation";
import { ArrowBack } from "@mui/icons-material";
import { Typography, Toolbar, Box, AppBar } from "@mui/material";

import SearchBar from "./SearchBar";

export default function NavBar() {
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
                onClick={() => router.push(`${process.env.NEXT_PUBLIC_URL}`)}
              >
                NYCONTRA CMS
              </Typography>
            </Box>
            <SearchBar />
            <Box />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
