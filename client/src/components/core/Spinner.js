import { Box, CircularProgress } from "@material-ui/core";
import React from "react";

const Spinner = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Box marginTop={2}>
        <CircularProgress size={100} color="secondary" />
      </Box>
    </Box>
  );
};

export default Spinner;
