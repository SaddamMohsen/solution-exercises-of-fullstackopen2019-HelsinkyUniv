import React,{useState} from 'react'
const Blog = (props) => {
   const blog=props.blog
   const [show,setShow]=useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    hover:"red"
  }
  const showName={display:show?'none':''}
  const showAll={display:show?'':'none'}
const toggleVisibility=()=>{
        setShow(!show)
    }

  return(
  <div style={blogStyle}>
   <div style={showName} onClick={toggleVisibility}>
    {blog.title} <br/>
    {blog.author} <br/>
  </div>
   <div style={showAll} >
   <p onClick={toggleVisibility}>
     {blog.title} <br/>
    {blog.author} <br/>
     {blog.url} <br/>
     </p>
     {blog.likes} <br/>
     <div>
    <button onClick={()=>props.handleLikeBtn(blog.id)}>like</button>
    </div>
    </div>
  
  </div>
)
}
export default Blog