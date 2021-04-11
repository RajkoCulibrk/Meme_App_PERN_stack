import { makeStyles } from "@material-ui/core";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  side: {
    width: "33.33%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  main: {
    width: "33.33%",
    display: "flex",
    alignItems: "center",
    marginTop: "5rem",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  holder: {
    height: "100%"
  },
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  list: {
    marginTop: "3rem"
  }
}));
export default useStyles;
