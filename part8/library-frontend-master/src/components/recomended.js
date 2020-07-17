import { useLazyQuery, useQuery } from "@apollo/client";

import React, { useState,useEffect } from "react";

import { All_BooksByGenres, Me } from "../queries";

const Recomended = (props) => {
  const [user, setUser] = useState(props.user);
  const [books, setBooks] = useState([]);

  const [getbooks, result] = useLazyQuery(All_BooksByGenres, {
    onCompleted: (data) => {
      setBooks(data.findBooks);
    },
    onError:(error)=>{
        console.log(error.graphQLErrors[0].message)
    }
  });
 
  useEffect(()=>{
      if(props.user)
      {  console.log('in effect',props.user)
        setUser(props.user)
      }
      else
      console.log('in effect no user props',props.user)
    
      
  },[props.user])
  

  const showbooks = async (name) => {
    if (name === "web") 
    await getbooks({ variables: { gener: "Web" } });
    else await getbooks({ variables: { gener: name } });
  };

  if (!props.show) return null;

  return (
    <div>
      <h3> Recomendetion Books of You </h3>
      {user &&
        user.favoriteGenres.map((a) => (
          <button key={a} onClick={() => showbooks(a)}>
            show {a}
          </button>
        ))}
      <table>
        <tbody>
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{"_"}</td>
              <td>{a.author.name}</td>
              <td>{"     "}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Recomended;
