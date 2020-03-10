import React from "react";

import { Form, Button, FormControl } from "react-bootstrap";

import { connect } from "react-redux";

import { createBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";
const BlogForm = props => {
  const addBlog = async e => {
    const nblog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value
    };
    console.log(nblog);
    try {
      console.log(nblog);
      await props.createBlog(nblog);

      props.setNotification(`new blog ${nblog.title} added`, 10);
      //props.history.push("/");
    } catch (expp) {
      props.setNotification(`An Error has occured${expp.message}`, 10);
      console.log(expp.message);
      //props.history.push("/");
    }
  };

  return (
    <Form onSubmit={addBlog}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <FormControl type="text" name="title" id="title" placeholder="Enter the Title" />
        <Form.Label> Author</Form.Label>
        <FormControl type="text" name="author" id="author" placeholder="Enter The Author" />
        <Form.Label>URL</Form.Label>
        <FormControl type="text" name="url" id='url' placeholder="Enter url" />
      </Form.Group>
      <Button variant="primary" type="submit" data-cy="submit">
          Create
        </Button>
    </Form>
  );
};

const mapDispatchToProps = {
  createBlog,
  setNotification
};
//const BlogForm = withRouter(connect(null, mapDispatchToProps)(BlogForm1));
export default connect(null, mapDispatchToProps)(BlogForm);
