import React from "react";

type Props = {};

const Home = (props: Props) => {
  return <div>Home</div>;
};

export default Home;

// "use client";
// import * as React from "react";
// import { Box, Typography } from "@mui/material";

// import FormModal from "../components/FormModal";
// import SearchBar from "../components/SearchBar";

// export default function Home() {
//   return (
//     <React.Fragment>
//       <Box
//         component="section"
//         display="flex"
//         flexDirection={"column"}
//         alignItems="center"
//         justifyContent="center"
//         minHeight="100vh"
//       >
//         <Typography
//           variant="h6"
//           textAlign="center"
//           gutterBottom={false}
//           sx={{ fontWeight: "regular", letterSpacing: "0.4rem" }}
//         >
//           NYContra
//         </Typography>
//         <Typography variant="h2" textAlign="center" sx={{ fontWeight: "bold" }}>
//           Content Management System
//         </Typography>
//         <Box
//           component="section"
//           display="flex"
//           flexDirection={"row"}
//           alignItems="center"
//           justifyContent="center"
//           margin={2}
//         >
//           <SearchBar />
//         </Box>
//         <Box
//           component="section"
//           display="flex"
//           flexDirection={"row"}
//           alignItems="center"
//           justifyContent="center"
//         >
//           <FormModal />
//         </Box>
//       </Box>
//     </React.Fragment>
//   );
// }
