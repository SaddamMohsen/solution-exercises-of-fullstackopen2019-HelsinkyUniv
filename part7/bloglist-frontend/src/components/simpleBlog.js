import React from "react";
import {
  Table, Form, Button, Alert, Navbar, Nav
} from 'react-bootstrap'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <Table striped>
      <tbody>
        <tr key={blog.id}>
          <td>{blog.title}</td>
          <td> {blog.author}</td>
          <td>blog has {blog.likes} likes
            <Button onClick={onClick}>like</Button>
            <Button onClick={onClick}>Delete</Button>
          </td>
        </tr>
      </tbody>
    </Table>
  </div>
);

export default SimpleBlog;
