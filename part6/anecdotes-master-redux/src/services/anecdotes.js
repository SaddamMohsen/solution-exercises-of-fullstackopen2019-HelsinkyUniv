import axios from 'axios'

const baseUrl="http://localhost:3001/anecdotes"


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const creatNew=(anecdote)=>{
  const newObj={
    content:anecdote
  }
  return axios.post(baseUrl,newObj)
    
}

const addVote =async(id,content)=>{
   const newObj ={
     content:content.content,
     votes:content.votes
   }
  const response = await axios.put(`${baseUrl}/${id}`,newObj)
    return response.data
}
const deleteAnec=async(id)=>{
  console.log('from services')
  const response = await axios.delete(`${baseUrl}/${id}`)
   return response.status
}

export default { getAll,creatNew,deleteAnec,addVote }
