import React,{useState,useImperativeHandle} from 'react'
import PropTypes from 'prop-types'

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
        <button onClick={toggleVisibility}>{props.buttonLable}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
    )
})

Togglable.propTypes ={
  buttonLable: PropTypes.string.isRequired
}
export default Togglable