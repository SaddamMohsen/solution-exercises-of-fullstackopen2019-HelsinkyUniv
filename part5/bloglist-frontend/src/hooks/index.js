import { useState } from 'react'

 export const useField = (type) => {  
    const [value, setValue] = useState('')
     

    const onChange = (event) => {
          setValue(event.target.value)
  }
 
  const reset=(e)=>{
    if(e===true)
       setValue('')
  }


  return {
    type,
    value,
    onChange,
    reset
  }
  
}
