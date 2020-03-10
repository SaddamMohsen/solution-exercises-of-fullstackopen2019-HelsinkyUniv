import React, { useEffect } from "react";

import { Button, Navbar, Nav } from "react-bootstrap";

import { connect } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  useHistory
} from "react-router-dom";

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
      <div
        className="container"
        style={{ height: "100%", margin: "0px 0px 0px 10px auto" }}
      >
        <Notificaton message={props.message} />
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="light"
          variant="light"
          expand="lg"
        >
          <Navbar.Brand href="/">Blog List Application</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/" style={{ padding: 30 }}>
                Home Page
              </Link>
              <Link to="/blogs" style={{ padding: 30 }}>
                Blogs
              </Link>
              <Link to="/users" style={{ padding: 30 }}>
                Users
              </Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <AuthButton user={props.user} logout={logOut} />
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        {/* <Navbar
          className="navbar navbar-expand navbar-dark"
          bg="dark"
          expand="lg"
        >
          <Navbar.Brand text="Blog List Application">
            Blog List Application
          </Navbar.Brand>
          <Navbar.Collapse className="collapse navbar-collapse">
            <NavItem className="nav-item">
              <NavLink to="/">Home Page</NavLink>
            </NavItem>
            <NavItem className="nav-item">
              <Link to="/blogs">Blogs</Link>
            </NavItem>
            <NavItem className="nav-item">
              <Link to="/users">Users</Link>
            </NavItem>

            <ul className="nav navbar-nav navbar-right">
              <NavItem className="nav-item  justify-content-end">
                <Navbar.Text>
                  <span className="glyphicon glyphicon-log-in"></span>{" "}
                  <AuthButton user={props.user} logout={logOut} />
                </Navbar.Text>
              </NavItem>
            </ul>
          </Navbar.Collapse>
        </Navbar>*/}

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
      {
        // <Footer />
      }
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
    <span>
      !{user.name}
      <Button
        onClick={() => {
          logout();
          history.push("/");
        }}
      >
        Sign out
      </Button>
    </span>
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
const Footer = () => {
  const style = {
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
    //"justify-content": "bottom",
    height: "10%",
    display: "inline",
    //position: "relative",
    "background-color": "transparent",
    "text-align": "center",
    color: "black",
    "border-left": "50px solid transparent",
    "border-right": "50px solid transparent",
    "border-bottom": "50px solid beige"
  };
  return (
    <div style={style}>
      <p>
        <strong>Blog List Application</strong>
        <br />
        <em> Created By Developer Saddam Mohsen(c) 2020</em>
        <br />
        <a href="https://github.com/SaddamMohsen">Saddam Mohsen on GithuB</a>
      </p>
    </div>
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
