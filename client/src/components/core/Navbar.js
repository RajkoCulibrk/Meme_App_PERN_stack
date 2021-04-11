import React, { useEffect, useRef } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";

import MoreIcon from "@material-ui/icons/MoreVert";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";
import { logout } from "../../redux/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../images/logo.svg";
import { openCloseSideNav } from "../../redux/slices/UtilitySlice";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  nav_links: {
    color: "white",
    decoration: "none"
  },
  logo: {
    margin: "0px",
    padding: "0px"
  },
  navbar: {
    zIndex: 999999999,
    position: "fixed",
    transition: "all 0.3s ease"
  }
}));

export default function PrimarySearchAppBar() {
  /* my code start */
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const logoutUser = () => {
    dispatch(logout());
  };

  let current = useRef(0);

  const handleSidenavOpening = () => {
    dispatch(openCloseSideNav());
  };
  useEffect(() => {
    const navbar = document.querySelector(".makeStyles-navbar-12");
    document.addEventListener("scroll", () => {
      let scrolled = window.pageYOffset;
      if (current.current - scrolled < 0) {
        navbar.style.transform = "translateY(-120%)";
      } else {
        navbar.style.transform = "translateY(0%)";
      }

      current.current = window.pageYOffset;
    });
  }, []);
  /* my code  end*/
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          logoutUser();
        }}
      >
        Logout
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {pathname !== "/login" && !user && (
        <MenuItem>
          <Button color="inherit">
            {" "}
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to="/login"
            >
              Login
            </Link>
          </Button>
        </MenuItem>
      )}
      {pathname !== "/register" && !user && (
        <MenuItem>
          <Button color="inherit">
            {" "}
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to="/register"
            >
              Register
            </Link>
          </Button>
        </MenuItem>
      )}

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar className={classes.navbar} position="static">
        <Toolbar>
          <IconButton
            onClick={handleSidenavOpening}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            display="none"
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            {" "}
            <IconButton
              className={classes.logo}
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <img className="logo" src={logo} alt="Logo" />
            </IconButton>
          </Link>

          <Typography className={classes.title} variant="h6" noWrap>
            Dank Memes
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {pathname !== "/login" && !user && (
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to="/login"
                >
                  Login
                </Link>
              </IconButton>
            )}

            {pathname !== "/register" && !user && (
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to="/register"
                >
                  Register
                </Link>
              </IconButton>
            )}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
