
import React from 'react'
import {Form,Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {createBlog} from '../reducers/blogsReducer'

const BlogForm=(props)=> {   
         const addBlog=async(e)=>{
           const nblog= {
             title:e.target.title.value,
             author:e.target.author.value,
             url:e.target.url.value
           }
           await props.createBlog(nblog)
         }
     
  return(
    <Form onSubmit={addBlog}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
        />
      
      <Form.Label>  Author</Form.Label>
        <Form.Control
          type="text"
          name="author"
        />
      
      <Form.Label>URL</Form.Label>
       
        <Form.Control
          type="text"
          name="url"
        />
      
      <Button variant="primary" type="submit">
            Create
          </Button>
      </Form.Group>
    </Form>
  )
}

const mapDispatchToProps={
  createBlog

  }
export default connect(null,mapDispatchToProps) (BlogForm)