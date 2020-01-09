import React from 'react'
import {connect} from 'react-redux'
import {addFilter} from '../reducers/filterReducer'
const Filter = (props) => {
  const handleChange = (event) => {
      event.preventDefault()
      const filter = event.target.value
        props.addFilter(filter)
    // input-field value is in variable event.target.value
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input  onChange={handleChange} />
    </div>
  )
}



const mapDispatchToProps={
    addFilter
}

export default connect(null, mapDispatchToProps)(Filter)