import React,{useState,useEffect} from 'react';
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notificaton from './components/Notification'
import './App.css'
import BlogForm from './components/blogForm'
//import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import {useField} from './hooks'

const App=()=>{
  const usernamee=useField('text')
  const passwordd= useField('password')
  const [user,setUser] = useState(null)
  const [blogs,setBlogs]=useState([])
  const [errorMessage,setErrorMessage]=useState(null)
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl] =useState('')
    const blogFormRef = React.createRef()
  useEffect(()=>{
    //let count=0
      blogService
        .getAll()
         .then(
           initialBlogs=>{
             setBlogs(initialBlogs)
           }
         )
    },[])

    //Return token of usere from local storage 
    useEffect(() => {   
       const loggedUserJSON = window.localStorage.getItem('loggedUser')   
        if (loggedUserJSON) {     
            const user = JSON.parse(loggedUserJSON) 
                 setUser(user)      
                 blogService.setToken(user.token)
                 }
      },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      //console.log(usernamee.value)
      const username=usernamee.value
      const password = passwordd.value
      const user = await loginService.login({
        username,password
      })
      //set the token into browser local storage
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )       
      blogService.setToken(user.token)
      setUser(user)
      usernamee.reset()
      passwordd.reset()
    } catch (exception) {
      
      setErrorMessage('UserName or Password Wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const handleLikebtn=async(blogId)=>{
    const blog=blogs.find(b=>b.id===blogId)
    //console.log(blog)
     const changedBlog={...blog,likes:blog.likes+1}   
      //console.log(changedBlog.likes)
       const retBlog=await blogService.addLike(blogId,changedBlog)
       setBlogs(blogs.map(b=>(b.id !==blogId)?b:retBlog))
}

  const rows=()=>blogs.map(blog=>
    <Blog
     key={blog.id}
     blog={blog}
     handleLikeBtn={handleLikebtn}
     />
    )

  
//handle adding of new Blog
const handleBlog=async(e)=>{
  e.preventDefault()
   blogFormRef.current.toggleVisibility()
  const newBlog={
    title:title,
    author:author,
    url:url
  }
  try{
    const nblog= await blogService.addNewBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
    setBlogs(blogs.concat(nblog))
    setErrorMessage(`a new blog ${nblog.title} by ${nblog.author}`)
     setTimeout(()=>{
       setErrorMessage(null)
     },5000)
  }catch(exception){
    //console.log()
    setErrorMessage(exception.message)
    setTimeout(()=>{
      setErrorMessage(null)
    },5000)
  }
}
//log Out handler
    const logOut=()=>{
      const preUser=user.name
      window.localStorage.clear()
      setUser(null)
      setErrorMessage(`${preUser} has logged Out`)
       setTimeout(()=>{
         setErrorMessage(null)
       },5000)
}

const loginForm=()=>{
  
    return (
      <div>
       <Togglable buttonLable="log in">
         <form onSubmit={handleLogin}>
           username <input 
                type={usernamee.type}
                value={usernamee.value}
                onChange={usernamee.onChange} />
            <br/>
            password <input
               type={passwordd.type}
               value={passwordd.value}
               onChange={passwordd.onChange} />
            <br/>
            <button type="submit">login</button>
          </form>
        </Togglable>
      </div>
    )
  }

  return(
    <div id='root' className="App-header">
    <Notificaton message={errorMessage}/>
     <h1>Blog List FrontEnd</h1>
     {user===null
      ?loginForm()
      :<div>
       <p>{user.name} is logged</p>
      <button onClick={()=>logOut()}>log Out</button>
       <h2>Add New Blog</h2>
       <Togglable buttonLable="CreateBlog" ref={blogFormRef}>
        <BlogForm 
             handleBlog={handleBlog}
             title={title}
             setTitle ={setTitle}
             author={author}
             setAuthor={setAuthor}
             url={url}
             setUrl={setUrl}
             />
             </Togglable>
          <h2>Blogs</h2>
            {rows()} 
      </div>
      }
    
    </div>
    
  )
  
}

export default App;
                                        