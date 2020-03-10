import React, { useState } from "react";

import ReactDOM from "react-dom";

import {
  FormControl,
  Form,
  Button,
  Badge,
  Card,
  ListGroup,
  ListGroupItem,
  InputGroup
} from "react-bootstrap";

import { withRouter, useHistory, useLocation } from "react-router-dom";

/*var style = { color: "#ffaaaa" };
var max_Char = "140";
var Teaxtarea = React.createClass({
  getInitialState: function() {
    return { value: "Controlled!!!", char_Left: max_Char };
  },
  handleChange: function(event) {
    var input = event.target.value;
    this.setState({ value: input });
  },
  render: function() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="comments">
            Comments <span style={style}>*</span>
          </label>
          (<span>{this.state.char_Left}</span> characters left)
          <textarea
            className="form-control"
            value={this.state.value}
            maxLength={max_Char}
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
});*/
const BlogView = props => {
  const blog = props.blog;
  const [show, setShow] = useState(true);
  const [comment, setComment] = useState();
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/blogs" } };
  //const showName = { display: show ? "none" : "" };
  //const showAll = { display: show ? "" : "none" };
  /*const toggleVisibility = () => {
    setShow(!show);
  };*/

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e.target.comment.value, blog.id);
    props.addComment(blog.id, e.target.comment.value);
    //history.push(from);
  };

  return (
    <Card style={{ width: "50rem" }}>
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
        <ListGroup className="list-group-flush">
          {blog.comments.map(u => (
            <ListGroupItem key={u.comments}>{u.comments}</ListGroupItem>
          ))}
        </ListGroup>
        <Form inline onSubmit={handleSubmit}>
          <FormControl
            type="text"
            placeholder="Enter Comment Here!"
            className=" sm-4"
            name="comment"
          />

          <button
            className="btn btn-default btn-lg btn-link"
            style={{ "font-size": "36px" }}
          >
            <span className="glyphicon glyphicon-comment"></span>
          </button>
          <span className="badge badge-notify">

          <Button type="submit">Submit</Button>
          </span>
          <Form.Text className="text-muted">
            You'll never get delete this
          </Form.Text>
        </Form>
      </Card.Body>
    </Card>
  );
};
const Blog = withRouter(BlogView);
export default Blog;
