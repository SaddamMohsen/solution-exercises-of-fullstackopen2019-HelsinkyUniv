const { ApolloServer, UserInputError, gql } = require("apollo-server");
const uuid = require("uuid/v1");
let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }
  type Book {
    title: String!
    published: Int!
    author: String!
    genres: [String]
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, gener: String): [Book!]!
    allAuthors: [Author!]!
    bookByAuthor(name: String!):[Book!]
  }
  type Mutation {
     addAuthor(name: String!, born: Int): Author!,
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book!
    editAuthor(name:String!,setBornTo:Int!):Author!
   
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (args.author && args.gener) {
        /* return books by author and genre*/
        let b = [];
        books.map((a) => {
          if (args.author === a.author && a.genres.includes(args.gener))
            b.push(a);
        });
        return b;
      } else if (args.author) {
        /* return books by author only*/
        let b = [];
        books.map((a) => {
          if (args.author === a.author) b.push(a);
        });
        return b;
      } else if (args.gener) {
        /* return books by genre only*/
        let b = [];
        books.map((a) => {
          if (a.genres.includes(args.gener)) b.push(a);
        });
        return b;
      } else return books;
      /* return all books*/
    },
    allAuthors: () => authors,
    bookByAuthor:(root,args)=>{
      let b=[]; 
       books.filter(bb=>{
       if(bb.author === args.name)
       b.push(bb)
       })
      return b
    }
  } /*end of Query*/,

  Mutation: {
    addAuthor: (root, args) => {
      if (authors.find((p) => p.name === args.author)) {
        throw new UserInputError("Name must be unique", {
          invalidArgs: args.name,
        });
      }

      let author = { ...args, id: uuid() };
      authors = authors.concat(author);
      return author;
    },
    addBook: (root, args) => {
      let book;
     
        book = { ...args, id: uuid() };
        books = books.concat(book);
      
      return book;
    },
  editAuthor:(root,args)=>{
    let author=authors.find(p=>p.name===args.name)
    author = {...author,born:args.setBornTo}
    authors=authors.map(p=>p.name === author.name?author:p)
    return author

  }
  } /* End of Mutation*/,
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    id: (root) => root.id,
    bookCount: (root) => {
      let total = [];
      books.map((nam) => {
        if (nam.author === root.name) total.push(nam);
      });
      return total.length;
    },
  },
}; /*end of resolver*/

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
