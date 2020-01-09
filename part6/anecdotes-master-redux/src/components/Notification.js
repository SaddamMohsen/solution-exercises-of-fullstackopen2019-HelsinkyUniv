import React from 'react'
import {connect} from 'react-redux'
//import {addNotification,removeNotificaton} from '../reducers/notificationReducer'
const Notification = (props) => {
   if (props.notification==='')
     return null;
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    width:'50%',
    background:'red'
  }
  return (
    <div style={style}>
     {
       props.notification
     }
    </div>
  )
}

const mapStateToProps=(state)=>{
  return{
    notification:state.notification
  }
}

export  default connect(mapStateToProps)(Notification)