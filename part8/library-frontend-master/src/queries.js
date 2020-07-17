import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const Me = gql`
  query {
    me {
      username
      id
      favoriteGenres
    }
  }
`;

export const All_Authors = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const All_BooksByGenres = gql`
  query All_BooksByGenres($gener: String!) {
    findBooks(gener: $gener) {
      title
      published
      author {
        name
      }
      genres
    }
  }
`;
export const All_Books = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
      genres
    }
  }
`;

export const Add_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: String!
    $author: String!
    $genres: [String!]
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published

      genres
    }
  }
`;
export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: String!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`;

export const EDIT_BOOK = gql`
  mutation editBook($title: String!, $author: String!) {
    editBook(title: $title, setAuthorTo: $author) {
      title
      published

      genres
    }
  }
`;
export const EDIT_BOOKGenres = gql`
  mutation editBookGenres($title: String!, $author: String!) {
    editBookGenres(title: $title, setGenresTo: $author) {
      title
      published

      genres
    }
  }
`;
