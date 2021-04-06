import {
  FormControl,
  FormHelperText,
  Grid,
  makeStyles,
  Box,
  Button,
  TextField
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useInput from "../hooks/RegisterPageHook";
import useStyles from "../materialThemes/signinRegister";

const Login = () => {
  const classes = useStyles();
  const [data, handleChange, errors] = useInput();
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="90vh"
    >
      <h3>Login</h3>
      <form onSubmit={(e) => handleSubmit(e)} style={{ width: "100%" }}>
        <Grid
          className={classes.regulator}
          container
          direction="column"
          alignItems="center"
          justify="center"
          spacing={10}
        >
          <FormControl className={classes.formInput}>
            <TextField
              variant="outlined"
              value={data.email}
              onBlur={() => setTouched({ ...touched, email: true })}
              onChange={(e) => handleChange(e)}
              name="email"
              type="email"
              id="email"
              label="Email"
              aria-describedby="my-helper-text"
            />
            {touched.email && data.email === "" && (
              <FormHelperText error id="my-helper-text">
                Please enter yur Email adress
              </FormHelperText>
            )}
          </FormControl>
          <FormControl className={classes.formInput}>
            <TextField
              variant="outlined"
              value={data.password}
              onChange={(e) => handleChange(e)}
              onBlur={() => setTouched({ ...touched, password: true })}
              name="password"
              type="password"
              label="Password"
              id="password"
              aria-describedby="my-helper-text"
            />
            {errors.passwordLength && touched.password && (
              <FormHelperText error id="my-helper-text">
                Password must be at least 6 characters long
              </FormHelperText>
            )}
            {data.password === "" && touched.password && (
              <FormHelperText error id="my-helper-text">
                Enter your password
              </FormHelperText>
            )}
          </FormControl>

          <Box m={2}>
            <Button
              disabled={
                errors.passwordLength ||
                data.password === "" ||
                data.email === ""
              }
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Box>
          <Box
            m={2}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <span>
              Don't have an account?{" "}
              <Link className="link-blue-no-decor" to="/register">
                {" "}
                Register
              </Link>
            </span>
          </Box>
        </Grid>
      </form>
    </Box>
  );
};

export default Login;
