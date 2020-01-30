import React, { useState, useEffect } from "react";

import { Button, Form } from "react-bootstrap";

import { connect} from "react-redux";

import "./App.css";
import { useField } from "./hooks";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notificaton from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/blogForm";
import { initializeBlogs } from "./reducers/blogsReducer";
import blogService from "./services/blogs";
import loginService from "./services/login";
import {setNotification} from './reducers/notificationReducer'
const App = props => {
  let blg = props.blogs;
  const usernamee = useField("text");
  const passwordd = useField("password");
  const [user, setUser] = useState(null);
  /*const [bloggs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");*/
  const blogFormRef = React.createRef();

  useEffect(() => {
    //let count=0
    const fetchData = async () => {
      await props.initializeBlogs();
      //setBlogs(props.blogs[0])
      blg = props.blogs;
    };
    fetchData();
  }, []);

  //Return token of usere from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();

    try {
      console.log(usernamee.value);
      const username = usernamee.value;
      const password = passwordd.value;
      const user = await loginService.login({
        username,
        password
      });
      //set the token into browser local storage
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      usernamee.reset(true);
      passwordd.reset(true);
    } catch (exception) {
      props.setNotification("UserName or Password Wrong");
      setTimeout(() => {
        props.setNotification(null);
      }, 5000);
    }
  };
  
  const handleLikebtn = blogId => {
    //let blog=handleBlogSet(blogId)

    //console.log('from like',blg)
    //console.log(typeof blogId);
    let blog = blg.find(b => b.id === blogId);
    console.log(blog);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    //console.log(changedBlog.likes)
    //const retBlog=await blogService.addLike(blogId,changedBlog)
    //setBlogs(blogs.map(b=>(b.id !==blogId)?b:retBlog))
  };

  const rows = () =>
    blg.map(blog => (
      <Blog key={blog.id} blog={blog} />
    ));

  //handle adding of new Blog
 /* const handleBlog = async e => {
    e.preventDefault();
    blogFormRef.current.toggleVisibility();
    const newBlog = {
      title: title,
      author: author,
      url: url
    };
    try {
      const nblog = await blogService.addNewBlog(newBlog);
      setTitle("");
      setAuthor("");
      setUrl("");
      setBlogs(bloggs.concat(nblog));
      setErrorMessage(`a new blog ${nblog.title} by ${nblog.author}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      //console.log()
      setErrorMessage(exception.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };*/
  //log Out handler
  const logOut = () => {
    const preUser = user.name;
    window.localStorage.clear();
    setUser(null);
    props.setNotification(`${preUser} has logged Out`);
    setTimeout(() => {
      props.setNotification(null);
    }, 5000);
  };

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLable="log in">
          <Form onSubmit={handleLogin}>
            <Form.Group>
              <Form.Label>username</Form.Label>
              <Form.Control
                type={usernamee.type}
                value={usernamee.value}
                onChange={usernamee.onChange}
              />
              <br />
              <Form.Label>password</Form.Label>
              <Form.Control
                type={passwordd.type}
                value={passwordd.value}
                onChange={passwordd.onChange}
              />
              <br />
              <Button type="submit">login</Button>
            </Form.Group>
          </Form>
        </Togglable>
      </div>
    );
  };

  return (
    <div id="root" className="container">
      <Notificaton message={props.message} />
      <h1>Blog List FrontEnd</h1>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} is logged</p>
          <Button onClick={() => logOut()}>log Out</Button>
          <h2>Add New Blog</h2>
          <Togglable buttonLable="CreateBlog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <h2>Blogs</h2>
          {rows()}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    message:state.notification
  };
};
const mapDispatchToProps = {
  initializeBlogs,setNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
