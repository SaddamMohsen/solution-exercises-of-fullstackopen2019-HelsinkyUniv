import React from 'react'
import {
  Table, Form, Button, Alert, Navbar, Nav
} from 'react-bootstrap'
const LoginForm = (props) => 
  (
    <div className='container'>
    <h2>Login</h2>
    <Form onSubmit={props.handleLogin}>
    <Form.Group>
      <Form.Label>username</Form.Label>
        <Form.Control
          type="text"
          value={props.username}
          name="Username"
          onChange={({target}) => props.setUser(target.value)}
        />
     
         <Form.Label>password</Form.Label>
        <Form.Control
          type="password"
          value={props.password}
          name="Password"
          onChange={({target}) => props.setPass(target.value)}
        />
      
      <Button type="submit">login</Button>
      </Form.Group>
    </Form>
    </div>
  )

  export default LoginForm