import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import { Route, Link, useHistory } from "react-router-dom";

import { Accordion, Card } from "react-bootstrap";
import { Badge, ListGroup, ListGroupItem } from "react-bootstrap";

import { getAll } from "../reducers/usersReducer";
//import Blog from "./Blog";
const Users = props => {
  const user = props.user;
  const users = props.users;
  const [activeKey, setActiveKey] = useState("0");
  useEffect(() => {
    if (props.user !== null) {
      const fetchData = async () => {
        await props.getAll();
      };

      fetchData();
    }
  }, []);

  const userById = id => {
    const a = users.items.find(a => a.id === id);
    return a;
  };

  const setActiveKeyOnSelect = actKey => {
    if (actKey === activeKey) actKey = -1;
    setActiveKey(actKey);
  };
  return (
    <div className="col-bg-6 col-md-offset-3">
      <h1>Hi {user.name}!</h1>
      <p>You're logged in with React!!</p>
      <h3>All registered users:</h3>
      {users.loading && (
        <div
          className="spinner-border"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only">Loading Users...</span>
        </div>
      )}
      {users.error && <span className="text-danger">ERROR: {users.error}</span>}
      {users.items && (
        <div>
          <Accordion activeKey={activeKey}>
            {users.items.map((u, index) => (
              <Card
                key={u.id}
                eventKey={index}
                onClick={() => {
                  setActiveKeyOnSelect(index);
                }}
              >
                <Accordion.Toggle as={Card.Header}>
                  <Link to={`/users/${u.id}`}>{u.name} </Link> ---------- Blogs:{" "}
                  <Badge varian="light">{u.blogs.length}</Badge>
                </Accordion.Toggle>

                <Accordion.Collapse eventKey={index}>
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
            ))}
          </Accordion>
        </div>
      )}

      <Link to="/login">Logout</Link>
    </div>
  );
};
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
      <Card.Header> {user.username} </Card.Header>
      <Card.Subtitle className="mb-4 text-muted">
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
