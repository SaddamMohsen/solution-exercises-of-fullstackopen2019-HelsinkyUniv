import React, { useState } from "react";

import { Table, Button, Badge, Card } from "react-bootstrap";

import { withRouter, useHistory, useLocation } from "react-router-dom";
const BlogView = props => {
  const blog = props.blog;
  const [show, setShow] = useState(true);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    hover: "red"
  };
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/blogs" } };
  const showName = { display: show ? "none" : "" };
  const showAll = { display: show ? "" : "none" };
  const toggleVisibility = () => {
    setShow(!show);
  };

  return (
    <Card style={{ width: "20rem" }}>
      <Card.Body>
        <Card.Title>{blog.title} </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{blog.author}</Card.Subtitle>
        <Card.Text>{blog.title}</Card.Text>
        <Card.Link href={blog.url}>{blog.url}</Card.Link>
        <br />
        <Button
          onClick={() => {
            history.push(from);
            props.handleLikeBtn(blog.id);
          }}
        >
          Like{" "}
        </Button>
        like <Badge variant="light">{blog.likes}</Badge>
        {props.creatore && (
          <Button
            onClick={() => {
              history.push(from);
              props.handleRemoveBtn(blog.id);
            }}
          >
            Remove
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};
const Blog = withRouter(BlogView);
export default Blog;
