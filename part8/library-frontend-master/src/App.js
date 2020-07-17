import { useQuery, useApolloClient,useLazyQuery } from "@apollo/client";

import React, { useState, useEffect } from "react";

import { All_Authors,Me} from "./queries";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/loginform";
import Recomended from './components/recomended'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }

  return <div style={{ color: "red" }}>{errorMessage}</div>;
}; 



const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("");
  const [user,setUser]=useState([])
   const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(All_Authors);
  const client = useApolloClient();
  const [getUser,{currUser}] = useLazyQuery(Me,{
    onCompleted:(data)=>{
      setUser(data.me)
    }
  });
  
 useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if ( token ) {
      
      setToken(token)
      getUser({variables:token})
    }
    console.log(token)
  }, [token])
  if (result.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    setUser(null)
    localStorage.clear();
   // client.resetStore();
   client.cache.reset();
   
  };

  const notify = (message) => {
    console.log("from notification")
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };
/*
 const login=()=>(
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        
      </div>
    );
    */
  
  return (
    <div>
    <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
         
        {token && (
          <span>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recom")}>Recommended</button>
            <button onClick={() => logout()}>logOut</button>
            
          </span>)}
          {!token &&(
            <button onClick={() => setPage("login")}>logIn</button>
            )
            }
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
      <Recomended show={page==="recom"} setPage={setPage} user={user} />
      <LoginForm setToken={setToken} setError={notify} show={page === "login"} setPage={setPage} />
    </div>
  );
};

export default App;
