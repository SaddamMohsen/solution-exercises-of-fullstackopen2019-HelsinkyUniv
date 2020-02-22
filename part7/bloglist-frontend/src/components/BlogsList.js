import React, { useEffect } from "react";

import { connect } from "react-redux";

import {
  Route,
  Redirect,
  Link,
  useHistory,
  useLocation,
  withRouter
} from "react-router-dom";

import { Accordion, Card } from "react-bootstrap";

import { addLike, removeBlog, initializeBlogs } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";

import Blog from "./Blog";

const BlogsListView = props => {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/blogs" } };
  let blg = props.blogs ? props.blogs : { items: [] };
  /* blg = props.items.sort((a, b) =>
    a.likes < b.likes ? 1 : b.likes < a.likes ? -1 : 0
  );*/

  useEffect(() => {
    if (props.user !== null) {
      if (!blg.items) {
        const fetchData = async () => {
          await props.initializeBlogs();
        };
        fetchData();
      }
    }

    //console.log("from effect");
    //props.initializeBlogs();
  }, []);

  const handleLikeBtn = async id => {
    let blog = blg.items.find(b => b.id === id);
    console.log("from handle like", blog);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    await props.addLike(changedBlog);
    props.setNotification(`you liked ${blog.title}`, 5);

    history.push(from);
    //setTimeout(() => {}, 6);
    props.initializeBlogs();
  };

  const handleRemoveBtn = async blogId => {
    let blog = blg.items.find(b => b.id === blogId);
    console.log(blogId, "from remove btn");
    await props.removeBlog(blogId);
    props.setNotification(`you remove ${blog.title}`, 5);
    history.push(from);
    props.initializeBlogs();
  };

  const blogById = id => {
    console.log(blg);
    let blog = blg.items.find(b => b.id === id);
    return blog;
  };
  const isCreator = id => {
    let blog = blg.items.find(b => b.id === id);
    return props.user.username === blog.user[0].username;
  };
  return (
    <div>
      {props.blogs.loading && <em>loading blogs...</em>}
      {props.blogs.failur && (
        <span className="text-danger">ERROR: {props.blogs.error}</span>
      )}
      {props.blogs.items &&
        props.blogs.items.map(
          blog => (
            /*<Blog
            key={blog.id}
            blog={blog}
            handleLikeBtn={handleLikeBtn}
            handleRemoveBtn={handleRemoveBtn}
            creatore={props.user.username === blog.user[0].username}
          />*/
            <Accordion defaultActiveKey="1">
              <Card key={blog.id}>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Route
                      exact
                      path="/blogs/:id"
                      render={({ match }) => (
                        <Blog
                          blog={blogById(match.params.id)}
                          handleLikeBtn={handleLikeBtn}
                          handleRemoveBtn={handleRemoveBtn}
                          creatore={isCreator(match.params.id)}
                        />
                      )}
                    />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          )
        )}
    </div>
  );
};//end of blog list component

const mapStateToProps = (state, ownProps) => {
  return {
    blogs: state.blogs,
    user: state.user
  };
};
const mapDispatchToProps = {
  addLike,
  removeBlog,
  setNotification,
  initializeBlogs
};
const BlogList = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BlogsListView)
);
export default BlogList;
