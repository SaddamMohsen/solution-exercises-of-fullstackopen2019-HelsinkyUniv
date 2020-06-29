import {gql} from "@apollo/client"

export const All_Authors=gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }`

 export const All_Books=gql`
 query{
     allBooks {
         title
         published
         author {name}
         genres
     }
 }`

 export const Add_BOOK= gql`
mutation createBook($title: String!, $published: String!, $author: String!, $genres:[String]) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    published
     
    genres
  }
}
`
export const EDIT_AUTHOR=gql`
mutation editAuthor($name:String!,$born:String!){
  editAuthor(
    name:$name,
    setBornTo:$born
  ){
    name
    born  
  }
}`

export const EDIT_BOOK=gql`
mutation editBook($title:String!,$author:String!){
	editBook(
	title:$title,
	setAuthorTo:$author){
		title
		published
    
    genres
	}
}`