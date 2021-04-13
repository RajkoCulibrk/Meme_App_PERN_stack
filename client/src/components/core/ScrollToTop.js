import React from "react";
import Fab from "@material-ui/core/Fab";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { Box } from "@material-ui/core";
const ScrollToTop = () => {
  /* scroll to the top of the document */
  const handleClick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  return (
    <Box
      onClick={handleClick}
      position="fixed"
      bottom={10}
      right={20}
      zIndex={500}
      className={"to-top"}
      display="none"
    >
      <Fab color="primary" aria-label="add">
        <ArrowUpwardIcon />
      </Fab>
    </Box>
  );
};

export default ScrollToTop;
