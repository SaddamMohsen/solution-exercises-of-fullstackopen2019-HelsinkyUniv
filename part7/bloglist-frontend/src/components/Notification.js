import React from 'react'
import '../App.css'
import {
  Table, Form, Button, Alert, Navbar, Nav
} from 'react-bootstrap'
import {connect} from 'react-redux'
const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <div >
             <Alert variant="success">{props.message}</Alert>
    </div>
  )
}
const mapStateToProps=(state)=>{
  return{
    message:state.notification
  }
}

export  default connect(mapStateToProps)(Notification)

