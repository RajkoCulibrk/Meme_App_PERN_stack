import {
  FormControl,
  FormHelperText,
  Grid,
  Box,
  Button,
  TextField,
  Avatar
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useInput from "../hooks/RegisterPageHook";
import useStyles from "../materialThemes/signinRegister";
import placeholder from "../images/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/UserActions";
import Error from "../components/core/Error";
const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [data, handleChange, errors] = useInput();
  const { errors: errorMessages } = useSelector((state) => state.user);
  /* shows if inputs have been touched or not */
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  /* handle submit */
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, password, email } = data;
    dispatch(register({ name, password, email }));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="90vh"
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{ width: "100%", marginTop: "5rem" }}
      >
        <Grid
          className={classes.regulator}
          container
          direction="column"
          alignItems="center"
          justify="center"
          spacing={10}
        >
          <h3>Register</h3>
          <Avatar
            className={classes.avatar}
            alt="Remy Sharp"
            src={placeholder}
          />
          <FormControl className={classes.formInput}>
            <TextField
              value={data.name}
              variant="outlined"
              onChange={(e) => handleChange(e)}
              onBlur={() => setTouched({ ...touched, name: true })}
              id="name"
              error={touched.name && data.name === ""}
              name="name"
              label="Username"
              aria-describedby="my-helper-text"
            />
            {touched.name && data.name === "" && (
              <FormHelperText error id="my-helper-text">
                Please enter your Username
              </FormHelperText>
            )}
          </FormControl>
          <FormControl className={classes.formInput}>
            <TextField
              variant="outlined"
              value={data.email}
              onBlur={() => setTouched({ ...touched, email: true })}
              onChange={(e) => handleChange(e)}
              name="email"
              error={touched.email && data.email === ""}
              type="email"
              id="email"
              label="Email"
              aria-describedby="my-helper-text"
            />
            {touched.email && data.email === "" && (
              <FormHelperText error id="my-helper-text">
                Please enter your Email adress
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
              error={
                (errors.passwordLength && touched.password) ||
                (data.password === "" && touched.password)
              }
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
          <FormControl className={classes.formInput}>
            <TextField
              variant="outlined"
              label="Confirm Password"
              value={data.confirmPassword}
              onBlur={() => setTouched({ ...touched, confirmPassword: true })}
              onChange={(e) => handleChange(e)}
              name="confirmPassword"
              type="password"
              id="confirm-password"
              error={
                (errors.passwordMissmatch && touched.confirmPassword) ||
                (data.confirmPassword === "" && touched.confirmPassword)
              }
              aria-describedby="my-helper-text"
            />
            {errors.passwordMissmatch && touched.confirmPassword && (
              <FormHelperText error id="my-helper-text">
                Passwords do not match
              </FormHelperText>
            )}
            {data.confirmPassword === "" && touched.confirmPassword && (
              <FormHelperText error id="my-helper-text">
                Please confirm your password
              </FormHelperText>
            )}
          </FormControl>

          <Box m={2}>
            <Button
              /* disable submit if data is invalid or missing  */
              disabled={
                errors.passwordMissmatch ||
                errors.passwordLength ||
                data.name === "" ||
                data.password === "" ||
                data.confirmPassword === "" ||
                data.email === ""
              }
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Box>
          {errorMessages.map((error) => (
            <Error key={error.id} error={error} />
          ))}
          <Box
            m={2}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <span>
              Already have an account?{" "}
              <Link className="link-blue-no-decor" to="/login">
                {" "}
                Sign in
              </Link>
            </span>
          </Box>
        </Grid>
      </form>
    </Box>
  );
};

export default Login;
