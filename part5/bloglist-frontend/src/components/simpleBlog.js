import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className="simple">
      {blog.title} {blog.author}
    </div>
    <div>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog