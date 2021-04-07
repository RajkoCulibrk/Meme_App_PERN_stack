import { makeStyles } from "@material-ui/core";

const singlePostStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "1rem"
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  }
}));

export default singlePostStyle;
