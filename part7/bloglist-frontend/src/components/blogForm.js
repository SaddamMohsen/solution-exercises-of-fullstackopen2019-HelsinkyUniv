import React from "react";

import { Form, Button, InputGroup, FormControl } from "react-bootstrap";

import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import { createBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";
const BlogForm1 = props => {
  const addBlog = async e => {
    const nblog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value
    };
    try {
      await props.createBlog(nblog);
      props.setNotification(`new blog ${nblog.title} added`, 10);
    } catch (expp) {
      console.log(expp.message);
    }
  };

  return (
    /*<div>
      <Form onSubmit={addBlog}>
        <InputGroup size="bg" className="mb-5">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-bg">Title</InputGroup.Text>
          </InputGroup.Prepend>

          <FormControl
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
          <Button variant="primary" type="submit">
            Create
          </Button>
        </InputGroup>
      </Form>
    </div>*/
    <Form onSubmit={addBlog}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" placeholder="Enter the Title" />

        <Form.Label> Author</Form.Label>
        <Form.Control
          type="text"
          name="author"
          placeholder="Enter The Author"
        />

        <Form.Label>URL</Form.Label>

        <Form.Control type="text" name="url" placeholder="Enter url" />

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form.Group>
    </Form>
  );
};

const mapDispatchToProps = {
  createBlog,
  setNotification
};
const BlogForm = withRouter(connect(null, mapDispatchToProps)(BlogForm1));
export default BlogForm;
