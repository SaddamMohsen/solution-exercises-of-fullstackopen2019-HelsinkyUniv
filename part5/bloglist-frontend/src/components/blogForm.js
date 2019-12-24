
import React from 'react'

const BlogForm=(props)=> {    
  return(
    <form onSubmit={props.handleBlog}>
      <div>
        Title
        <input
          type="text"
          value={props.title}
          name="title"
          onChange={({target})=>{props.setTitle(target.value)}}
        />
      </div>
      <div>
        Author
        <input
          type="text"
          value={props.author}
          name="author"
          onChange={({target})=>{props.setAuthor(target.value)}}
        />
      </div>
      <div>
        URL
        <input
          type="text"
          value={props.url}
          name="url"
          onChange={({target})=>{props.setUrl(target.value)}}
        />
      </div>
      <button type="submit">Create Blog</button>
    </form>
  )
}

export default BlogForm