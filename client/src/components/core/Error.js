import React, { useEffect } from "react";
import { Alert } from "@material-ui/lab";
import { Box } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { deleteError } from "../../redux/slices/UserSlice";
const Error = ({ error }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(deleteError(error.id));
    }, 3000);
  }, [dispatch, error.id]);
  return (
    <Box m={0.3}>
      <Alert variant="filled" severity="error">
        {error.message}
      </Alert>
    </Box>
  );
};

export default Error;
