import React,{useState,useEffect} from 'react';
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notificaton from './components/Notification'
import './App.css'
import BlogForm from './components/blogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App=()=>{
  const [username,setUsername]=useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [blogs,setBlogs]=useState([])
  const [errorMessage,setErrorMessage]=useState(null)
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl] =useState('')
    const blogFormRef = React.createRef()
  useEffect(()=>{
      blogService
        .getAll()
         .then(
           initialBlogs=>{
             setBlogs(blogs.concat(initialBlogs))
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
      const user = await loginService.login({
        username, password,
      })
      //set the token into browser local storage
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )       
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

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
          <LoginForm 
            handleLogin={handleLogin}
            username={username}
            setUser={setUsername}
            password={password}
            setPass={setPassword}
            />
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
       <Togglable buttonLable="newBlog" ref={blogFormRef}>
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
