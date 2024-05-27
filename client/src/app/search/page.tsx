"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import NavBar from "../../components/NavBar";

const SearchResults = dynamic(() => import("../../components/SearchResults"), {
  ssr: false,
  loading: () => <p>Loading search results...</p>,
});

export default function Search() {
  return (
    <React.Fragment>
      <React.Suspense fallback={<p>Loading...</p>}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          flex={1}
          height={"100vw"}
        >
          <Box>
            <NavBar />
          </Box>
          <SearchResults />
        </Box>
      </React.Suspense>
    </React.Fragment>
  );
}
