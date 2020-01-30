import blogService from '../services/blogs'

const blogsReducer=(state=[],action)=>{
     console.log('from reduce',action.data)
   switch(action.type){
   case 'INIT_BLOGS':
       return state.concat(action.data)
    case 'ADD_BLOG':
        return state.concat(action.data.nblog)
    case 'ADD_LIKE':
        return state.map(anecs=>anecs.id !==action.data.likedBlog.id?anecs:action.data.likedBlog)
    case 'DEL_BLOG':
          return state.filter(st=>st.id !==action.data.id)
    default:
        return state
   }



}
export const initializeBlogs=()=>{
   return async dispatch=>{
     const blogs=await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}
export const createBlog=(blog)=>{
  return async dispatch=>{
    const nblog= await blogService.addNewBlog(blog)
    dispatch({
      type:'ADD_BLOG',
      data:nblog
    })
  }
}

export const addLike=(blog)=>{
  return async dispatch=>{
   const likedBlog = await blogService.addLike(blog.id,blog)
    dispatch({
    type:'ADD_LIKE',
    data:{likedBlog}
  })
  }
}
 export const removeBlog=(id)=>{
   return async dispatch=>{
     const delBlog=await blogService.removeBlog(id)
     dispatch({
       type:'DEL_BLOG',
       data:id
     })
   }
 }

export default blogsReducer