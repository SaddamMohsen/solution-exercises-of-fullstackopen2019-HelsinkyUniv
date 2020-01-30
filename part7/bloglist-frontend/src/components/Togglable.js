import React,{useState,useImperativeHandle} from 'react'
import PropTypes from 'prop-types'
import {
  Table, Form, Button, Alert, Navbar, Nav
} from 'react-bootstrap'
const Togglable=React.forwardRef((props, ref)=>{
  const[visible,setVisible]=useState(false)

  
  const hideWhenVisible = { display: visible ?'none' : '' }
    const showWhenVisible = { display: visible ? '' :'none' }
    
    const toggleVisibility=()=>{
        setVisible(!visible)
    }
 useImperativeHandle(ref, () => {    
       return {
              toggleVisibility   
               }  
    })
    return(
       
    <div>
     {}
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLable}</Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
    )
})

Togglable.propTypes ={
  buttonLable: PropTypes.string.isRequired
}
export default Togglable