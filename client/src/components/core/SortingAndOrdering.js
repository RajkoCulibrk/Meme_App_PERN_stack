import { Box, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/PostsActions";
import { sortingAndOrdering } from "../../redux/slices/PostsSlice";
const useStyles = makeStyles((theme) => ({
  select: {
    width: "100%",
    marginBottom: "1rem"
  }
}));
const SortingAndOrdering = () => {
  const dispatch = useDispatch();
  const { order, order_by } = useSelector((state) => state.posts);

  const classes = useStyles();
  /* handle select input change */
  const handleChange = (e) => {
    dispatch(sortingAndOrdering({ [e.target.name]: e.target.value }));
    dispatch(getPosts());
  };
  /* stop event propagation so that when we click on sorting we do not close the navbar
   */
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <Box onClick={(e) => stopPropagation(e)} width="100%">
      <TextField
        className={classes.select}
        select
        onChange={(e) => {
          handleChange(e);
        }}
        name="order_by"
        label="Sort By"
        value={order_by}
        SelectProps={{
          native: true
        }}
        variant="outlined"
      >
        <option value={"created_at"}>Date</option>
        <option value={"likes"}>Likes</option>
        <option value={"dislikes"}>Dislikes</option>
        <option value={"comments"}>Comments</option>
      </TextField>
      <TextField
        value={order}
        className={classes.select}
        select
        onChange={(e) => {
          handleChange(e);
        }}
        name="order"
        label="Sort order"
        SelectProps={{
          native: true
        }}
        variant="outlined"
      >
        <option value={"2"}>Descending</option>
        <option value={"1"}>Ascending</option>
      </TextField>
    </Box>
  );
};

export default SortingAndOrdering;
