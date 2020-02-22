import React, { useEffect, useRef } from "react";

import { Button, Tabs, Tab, Navbar, NavItem, NavLink } from "react-bootstrap";

import { connect } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  useHistory
} from "react-router-dom";

import { NavbarBrand } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";

import "./App.css";
import "./bootstrap.min.css";

import BlogsList from "./components/BlogsList";
import LoginForm from "./components/LoginForm";
import Notificaton from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import BlogForm from "./components/blogForm";
import { logIn, logOut } from "./reducers/loginReducer";
import { setNotification } from "./reducers/notificationReducer";
import blogService from "./services/blogs";

const App = props => {
  const blogFormRef = React.createRef();

  //Return token of usere from local storage
  useEffect(() => {
    try {
      const loggedUserJSON = window.localStorage.getItem("loggedUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        blogService.setToken(user.token);
      }
    } catch (exp) {
      console.log(exp.message);
    }
  }, []);

  //log Out handler
  const logOut = () => {
    console.log("from logout");
    const preUser = props.user;
    window.localStorage.clear();
    props.logOut();
    props.setNotification(`${preUser.name} has logged Out`);
    //loginForm()
    setTimeout(() => {
      props.setNotification(null);
    }, 5000);
  };

  return (
    <Router>
      <div className="container">
        <Notificaton message={props.message} />
        <Navbar
          className="navbar navbar-expand navbar-dark"
          bg="dark"
          expand="lg"
        >
          <Navbar.Brand text="Blog List Application">
            Blog List Application
          </Navbar.Brand>
          <Navbar.Collapse class="collapse navbar-collapse">
            <NavItem className="nav-item">
              <a className="nav-link">
                <Link to="/">Home Page</Link>
              </a>
            </NavItem>
            <NavItem className="nav-item">
              <a className="nav-link">
                <Link to="/blogs">Blogs</Link>
              </a>
            </NavItem>
            <NavItem className="nav-item">
              <a className="nav-link">
                <Link to="/users">Users</Link>
              </a>
            </NavItem>

            <ul className="nav navbar-nav navbar-right">
              <NavItem className="nav-item">
                <a className="nav-link">
                  <Navbar.Text>
                    <span className="glyphicon glyphicon-log-in"></span>{" "}
                    <AuthButton user={props.user} logout={logOut} />
                  </Navbar.Text>
                </a>
              </NavItem>
            </ul>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <h1>Blog List Application</h1>
              </div>
            )}
          ></Route>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <PrivateRoute user={props.user} path="/blogs">
            <Togglable buttonLable="Create Blog" ref={blogFormRef}>
              <BlogForm />
            </Togglable>
            <BlogsList />
          </PrivateRoute>
          <Route path="/blogs"></Route>
          <PrivateRoute user={props.user} path="/">
            <Users />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
};

const User = () => {
  /* let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  const handleClick = () => {
    console.log("hello from user");
    history.replace(from);
  };*/
  return (
    <div>
      <Button>Back to home</Button>
      <p>users</p>
    </div>
  );
};
const AuthButton = ({ user, logout }) => {
  let history = useHistory();

  return user !== null ? (
    <p>
      Welcome!{user.name}
      <Button
        onClick={() => {
          logout();
          history.push("/");
        }}
      >
        Sign out
      </Button>
    </p>
  ) : (
    <div>
      <p>You are not logged in.</p>
    </div>
  );
};

const PrivateRoute = ({ user, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user !== null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
const mapStateToProps = state => {
  return {
    message: state.notification,
    user: state.user
  };
};
const mapDispatchToProps = {
  setNotification,
  logIn,
  logOut
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
