import React from "react";

import { Form, Button } from "react-bootstrap";

import { connect } from "react-redux";

import { useHistory, useLocation } from "react-router-dom";

import { logIn } from "../reducers/loginReducer";
import { setNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs";

import Togglable from "./Togglable";

const LoginForm = props => {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  const handleLogin = async event => {
    event.preventDefault();
    try {
      const username = event.target.username.value;
      const password = event.target.password.value;
      // console.log(username,password)
      await props.logIn({
        username,
        password
      });
      //set the token into browser local storage
      const loggedUserJSON = window.localStorage.getItem("loggedUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        blogService.setToken(user.token);
      }
      history.replace(from);
    } catch (exception) {
      props.setNotification("UserName or Password Wrong", 10);
    }
  };
  return (
    <div className="container">
      <Togglable buttonLable="Log In">
        <h2>Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username</Form.Label>
            <Form.Control type="text" name="username" />

            <Form.Label>password</Form.Label>
            <Form.Control
              className="form-control"
              type="password"
              name="password"
            />
            <Button type="submit">login</Button>
          </Form.Group>
        </Form>
      </Togglable>
    </div>
  );
};
const mapStateToDispatch = {
  logIn,
  setNotification
};
export default connect(null, mapStateToDispatch)(LoginForm);
