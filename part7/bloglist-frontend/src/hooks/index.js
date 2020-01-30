import { useState } from 'react'

 export const useField = (type) => {  
    const [value, setValue] = useState('')
     

    const onChange = (event) => {
      console.log(event.target.value)
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
