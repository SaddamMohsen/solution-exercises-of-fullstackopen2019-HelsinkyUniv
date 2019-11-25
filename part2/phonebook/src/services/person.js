import axios from 'axios'

const baseUrl = 'api/person'


const getAll=()=>{
    const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
  .catch(error=>{
    console.log('fail')
  })
}
const deleteInput=(id)=>{
   const request=axios.delete(`${baseUrl}/${id}`)
     request.then(resp=>{
         console.log(resp.statusText)
     })
}


export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  deleteInput:deleteInput
}

