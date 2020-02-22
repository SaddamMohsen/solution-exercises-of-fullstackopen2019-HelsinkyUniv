import React, { useEffect } from "react";

import { connect } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import { Accordion, Card } from "react-bootstrap";
import { Badge, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap";

import { getAll } from "../reducers/usersReducer";
//import Blog from "./Blog";
const Users = props => {
  //if (!props.users.items) return null;
  const user = props.user;
  const users = props.users;
  useEffect(() => {
    if (props.user !== null) {
      const fetchData = async () => {
        await props.getAll();
      };

      fetchData();
    }
    //console.log("from effect");
    //props.initializeBlogs();
  }, []);

  const userById = id => {
    const a = users.items.find(a => a.id === id);
    return a;
  };
  return (
    <div className="col-md-6 col-md-offset-3">
      <h1>Hi {user.name}!</h1>
      <p>You're logged in with React!!</p>
      <h3>All registered users:</h3>
      {users.loading && <em>Loading users...</em>}
      {users.error && <span className="text-danger">ERROR: {users.error}</span>}
      {users.items && (
        <div>
          {users.items.map((u, index) => (
            <Accordion defaultActiveKey="1">
              <Card key={u.id}>
                /*
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <Link to={`/users/${u.id}`}>{u.name} </Link> ---------- Blogs:{" "}
                  <Badge varian="light">{u.blogs.length}</Badge>
                </Accordion.Toggle>
                */
                <CustomToggle eventKey="0">
                  <Link to={`/users/${u.id}`}>
                    {u.name}
                    <Badge varian="light">{u.blogs.length}</Badge>
                  </Link>{" "}
                  ---------- Blogs:{" "}
                </CustomToggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Route
                      exact
                      path="/users/:id"
                      render={({ match }) => (
                        <User user={userById(match.params.id)} />
                      )}
                    />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
        </div>
      )}

      <Link to="/login">Logout</Link>
    </div>
  );
};
function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    console.log("totally custom!")
  );
  return { children };
}
const User = props => {
  const history = useHistory();
  //props.history.push("/users");
  const user = props.user;
  const blogById = id => {
    //console.log("from blog by id ", id);
    const a = user.blogs.find(a => a.id === id);
    //console.log("from blogbyid", a);
    return a;
  };
  return (
    <Card>
      <Card.Header>{user.username} </Card.Header>
      <Card.Subtitle className="mb-2 text-muted">
        <strong>Blogs of {user.username}</strong>
      </Card.Subtitle>
      <ListGroup className="list-group-flush">
        {user.blogs.map(u => (
          <ListGroupItem key={u.id}>{u.title}</ListGroupItem>
        ))}
      </ListGroup>
      <Card.Footer>no. of blogs created:{user.blogs.length}</Card.Footer>
    </Card>
  );
};
//const User = withRouter(UserHis);
/*const BlogHist = props => {
  props.history.push("/protected/blogs");
  const blog = props.blog;
  return (
    <div>
      <strong>{blog.title}</strong>
      <br />
      <em>{blog.author}</em>
      {blog.likes}
      {blog.url}
    </div>
  );
};
const Blog = withRouter(BlogHist);*/
const mapState = state => {
  return {
    user: state.user,
    users: state.users
  };
};

const actionCreators = {
  getAll
};

export default connect(mapState, actionCreators)(Users);
