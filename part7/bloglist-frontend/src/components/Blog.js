import React, { useState } from "react";
import Notificaton from './Notification'
import { Table, Form, Button, Alert, Navbar, Nav } from "react-bootstrap";
import {connect} from 'react-redux'
import {addLike,removeBlog} from '../reducers/blogsReducer'
import {setNotification } from '../reducers/notificationReducer'

const Blog = (props) => {
  const blog = props.blog;
  const [show, setShow] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    hover: "red"
  };
  const showName = { display: show ? "none" : "" };
  const showAll = { display: show ? "" : "none" };
  const toggleVisibility = () => {
    setShow(!show);
  };

  const handleLikeBtn=(blogId)=>{
     
    let blg = blog
    //console.log(blog);
    const changedBlog = { ...blg, likes: blog.likes + 1 };
    props.addLike(changedBlog)
    props.setNotification(`you liked ${blog.title}`,5)
  }

  const handleRemoveBtn=(blogId)=>{
    console.log(blogId,'from remove btn')
    props.removeBlog(blogId)
    props.setNotification(`you remove ${blog.title}`,5)
  }
  return (
      <Table striped style={blogStyle}>
      <tbody>
      <tr style={showName} onClick={toggleVisibility}>
        <th>{blog.title}</th>
        <th>{blog.author} </th>
      </tr>
      <tr style={showAll}>
        <td onClick={toggleVisibility}>
          {blog.title} <br />
          {blog.author} <br />
          {blog.url} <br />
         blog liked {blog.likes} 
        </td>
        <td>
        <div className="btn-group btn-group-lg" role="group" aria-label="...">
         <Button onClick={() => handleLikeBtn(blog.id)}>like</Button>
          <Button onClick={() => handleRemoveBtn(blog.id)}>Remove</Button>
          </div>
          </td>
        </tr>
     
    </tbody>
    </Table>
  );
};
const mapDispatchToProps={
  addLike,removeBlog,setNotification
}
export default connect(null,mapDispatchToProps)(Blog)
