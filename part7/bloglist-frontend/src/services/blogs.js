import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => { 
   token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addNewBlog=async(newObject)=>{
  const config={
  headers: { Authorization: token }, 
      }
    
  const response = await axios.post(baseUrl, newObject, config)  
  return response.data
      
}

const addLike=async(id,newObject)=>{
     const respo=await axios.put(`${baseUrl}/${id}`,newObject)
          return respo.data
}

const removeBlog=async(id)=>{
  const resp = await axios.delete(`${baseUrl}/${id}`)
   return resp.status
}
export default { getAll,setToken,addNewBlog,addLike,removeBlog }