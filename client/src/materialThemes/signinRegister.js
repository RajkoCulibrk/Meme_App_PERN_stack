import { makeStyles } from "@material-ui/core";

const signinRegisterStyles = makeStyles((theme) => ({
  formInput: {
    minWidth: "100%",
    marginTop: "1rem"
  },

  regulator: {
    maxWidth: "40%",
    padding: "1rem",
    borderRadius: "0.2rem",

    background:
      "linear-gradient(321deg, rgba(4,116,191,0.12088585434173671) 27%, rgba(122,153,175,0.13209033613445376) 70%)",
    boxShadow: ".2px 12px 18px rgba(131,153,167,0.6)",

    "&:hover": {
      boxShadow: "0px 24px 36px rgba(131,153,167,0.99)"
    },

    margin: "auto",
    [theme.breakpoints.down("md")]: {
      minWidth: "30px",
      maxWidth: "70%"
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "30px",
      maxWidth: "70%"
    },
    [theme.breakpoints.down("xs")]: {
      minWidth: "30px",
      maxWidth: "90%"
    }
  }
}));

export default signinRegisterStyles;
