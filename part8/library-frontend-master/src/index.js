import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://192.168.1.109:4000",
  }),
});
/*const query = gql`
  query {
   allBooks {
         title
         published
         author
         genres
     }
  }
`;

client.query({ query }).then((response) => {
  console.log(response.data);
})*/
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
