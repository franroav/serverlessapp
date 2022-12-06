import React, { Fragment, useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

import Inicio from "../Inicio/Inicio";
import Subscribers from "../Subscriber/Subscriber";
import Subs from "../Subscriber/subscriber-create/createSubs";
import Register from "../Register/Register";
import Login from "../Login/Login";
import "./Nav.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    offset: theme.mixins.toolbar,
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

function Nav(): JSX.Element {

  const classes = useStyles();
  const [logged, setAuth] = useState(false);

  const killSession = () => {
    localStorage.removeItem("token_auth")
    window.location.reload();
  };
  const isLoggedIn = () => {
    return (
      <div>
        {logged
          ? (
              <div className="btn-group">
                <Link to="/subscribers" className="btn btn-sm btn-dark ml-1">
                  Subscribers
                </Link>
                <a onClick={killSession}>
                  <Link to="/" className="btn btn-sm btn-danger ml-1">
                    Salir
                </Link>
                </a>
              </div>
            )
          : (
              <div className="btn-group">
                <Link to="/auth/register" className="btn btn-sm btn-success">
                  Register
                </Link>
                <Link to="/auth/login" className="btn btn-sm btn-primary">
                  Login
                </Link>
              </div>
            )}
      </div>
    );
  };
  const loggedPath = () => {
    return (
      <div>
        {logged ? (             
          <Route path="/subscribers/:id" exact>
              <Subs />
            </Route>
        ) : (
          (
            <Route path="/auth/register" exact>
              <Register />
            </Route>
          ) && (
            <Route path="/auth/login" exact>
              <Login />
            </Route>
          )
        )}
      </div>
    );
  };
  useEffect(() => {
    const checkAuthToken = async () => {
      if (localStorage.getItem("token_auth") !== null) {
        setAuth(true);
      }
    };

    checkAuthToken();
  }, []);
  return (
    <>
      <Router>
        <div className={classes.root}>
          <AppBar position="sticky">
            <Toolbar>
              <img
                src="https://webkonce.cl/wp-content/uploads/2018/08/Phoenix_logo-600x563.png"
                width="40px"
                height="40px"
                className="mr-2"
              />
              <Typography variant="h6" className={classes.title}>
                Serverless App
              </Typography>

              <div className="btn-group">
                <Link to="/" className="btn badge-pill btn-pill btn-dark">
                  Inicio
                </Link>
              </div>
              {isLoggedIn()}
            </Toolbar>
          </AppBar>
          <hr />
          <Switch>
            <Route path="/" exact>
              <Inicio />
            </Route>
            <Route path="/subscribers" exact>
            <Subscribers />
          </Route>
            {loggedPath()}
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default Nav;
