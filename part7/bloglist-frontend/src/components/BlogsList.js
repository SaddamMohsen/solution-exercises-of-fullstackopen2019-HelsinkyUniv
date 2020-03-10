import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import {
  Route,
  Link,
  useHistory,
  useLocation,
  withRouter
} from "react-router-dom";

import { Accordion, Card, Badge } from "react-bootstrap";

import {
  addLike,
  removeBlog,
  initializeBlogs,
  addComment
} from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";

import Blog from "./Blog";

const BlogsListView = props => {
  let history = useHistory();
  let location = useLocation();
  const [activeKey, setActiveKey] = useState("0");
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
  }, []);

  const handleLikeBtn = async id => {
    let blog = blg.items.find(b => b.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    await props.addLike(changedBlog);
    props.setNotification(`you liked ${blog.title}`, 5);
    setActiveKey(-1);
    props.initializeBlogs();
  };

  const handleRemoveBtn = async blogId => {
    let blog = blg.items.find(b => b.id === blogId);
    //console.log(blogId, "from remove btn");
    await props.removeBlog(blogId);
    props.setNotification(`you remove ${blog.title}`, 5);
    //history.push(from);
    props.initializeBlogs();
  };

  const addComment = async (blogId, comment) => {
    await props.addComment(blogId, comment);

    props.initializeBlogs();
    //console.log("from add comment", blog);
  };

  const blogById = id => {
    //console.log(blg);
    let blog = blg.items.find(b => b.id === id);
    return blog;
  };
  const isCreator = id => {
    let blog = blg.items.find(b => b.id === id);
    return props.user.username === blog.user[0].username;
  };
  //set the active menu
  const setActiveKeyOnSelect = actKey => {
    //actKey.preventDefault();
    // console.log(actKey);
    if (actKey === activeKey) {
      actKey = -1;
      history.push(from);
    }

    setActiveKey(actKey);
  };
  return (
    <div>
      {props.blogs.loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {props.blogs.failur && (
        <span className="text-danger">ERROR: {props.blogs.error}</span>
      )}
      {props.blogs.items && (
        <div>
          <Accordion activeKey={activeKey}>
            {props.blogs.items.map((blog, index) => (
              <Card key={blog.id}>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey={index}
                  onClick={() => {
                    setActiveKeyOnSelect(index);
                  }}
                >
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  <span
                    className="badge badge-primary"
                    style={{
                      position: "absolute",
                      right: "90px"
                    }}
                  >
                    {blog.likes}
                  </span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index}>
                  <Card.Body>
                    <Route
                      exact
                      path="/blogs/:id"
                      render={({ match }) => (
                        <Blog
                          blog={blogById(match.params.id)}
                          handleLikeBtn={handleLikeBtn}
                          handleRemoveBtn={handleRemoveBtn}
                          addComment={addComment}
                          creatore={isCreator(match.params.id)}
                        />
                      )}
                    />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}; //end of blog list component

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
  initializeBlogs,
  addComment
};
const BlogList = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BlogsListView)
);
export default BlogList;
