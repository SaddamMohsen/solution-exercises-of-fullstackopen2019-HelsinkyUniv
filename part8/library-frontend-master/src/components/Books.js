import React,{useState} from 'react'
import {useQuery,useMutation} from "@apollo/client"
import {All_Books,EDIT_BOOK} from '../queries'

const Books = (props) => {
	const [title,setTitle] = useState() 
	const [author ,setAuthor] =useState()
	
  const result  = useQuery(All_Books)
  
  const [editBook] = useMutation(EDIT_BOOK, {
    refetchQueries: [{ query: All_Books }],
    pollInterval: 500,
  });
  
  if (!props.show) {
    return null
  }
  if( result.loading)
  {
    return(<div>...loading</div>)
  }

  const books = result.data.allBooks
  const submit = async (event) => {
    event.preventDefault();

    editBook({ variables: { title, author } });
    setTitle("");
    setAuthor("");
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{'     '}</td><td>{   a.author.name}</td>
              <td>{'     '}</td><td>{   a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
	   <form onSubmit={submit}>
        <div>
          name{" "}
          <select value={title} onChange={({ target }) => setTitle(target.value)}>
            {books.map((a) => (
              <option key={a.title} value={a.title}>
                {a.title}
              </option>
            ))}
          </select>
          {/*<input
            value={name}
            onChange={({ target }) => setName(target.value)}
            required
          />*/}
        </div>
        <div>
          Author{" "}
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </div>
        <button type="submit">change Author</button>
      </form>
    </div>
  )
}

export default Books