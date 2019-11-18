import React from 'react'

const Notification=({message})=>{
    const msgstyle={
         color: 'green',
        fontStyle:'italic',
       
       background: 'lightgrey',
  fontSize: 20,
  borderstyle: 'solid',
  borderradius: 5,
  padding: 10,
  marginbottom: 10
}
    
    
    if(message===null)
    {return null}
     
     return(
    <div style={msgstyle}>
      {message}
    </div>
  )
}
     


     
export default Notification;