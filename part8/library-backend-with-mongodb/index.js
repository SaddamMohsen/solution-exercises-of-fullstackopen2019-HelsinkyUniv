const { ApolloServer, UserInputError, gql } = require("apollo-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Book = require("./models/books");
const Author = require("./models/authors");
const User = require("./models/users");

const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";
mongoose.set("useFindAndModify", false);

const MONGODB_URI = "mongodb://127.0.0.1:27017/libraryDB?retryWrites=true";

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }
  type Book {
    title: String!
    published: String!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, gener: String): [Book!]!
    allAuthors: [Author!]!
    bookByAuthor(name: String!): [Book!]
    me: User
  }
  type Mutation {
    addAuthor(name: String!, born: Int): Author!
    addBook(
      title: String!
      published: String!
      author: String!
      genres: [String]
    ): Book!
    editAuthor(name: String!, setBornTo: String!): Author!
    editBook(title: String!, setAuthorTo: String!): Book!
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => {
      console.log("from author count");
      return Author.collection.countDocuments();
    },
    allBooks: async (root, args) => {
      return await Book.find({}).populate("authors");
    },
    allAuthors: () => {
      return Author.find({});
    },
    bookByAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      //console.log(author);
      return await Book.find({ author: author._id });
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  } /*end of Query*/,

  Mutation: {
    addAuthor: async (root, args) => {
      //console.log("here ", args.name, args.born);
      const author = new Author({ ...args });
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
    addBook: (root, args,{ currentUser }) => {
      let book = new Book({ ...args });
      if (!currentUser) {
         console.log("no user")
        throw new AuthenticationError("not authenticated")
       
      }

      console.log("autthor here", args.author);
      Author.findOne({ name: args.author }, (err, doc) => {
        if (err) {
          console.log("Error in find author.name");
        }

        //console.log("in find author", doc.name, doc.id);
        if (doc !== null) {
          book.author = doc._id;
          try {
            console.log("create book", book);
            book.save(async (err) => {
              if (err) {
                console.log("book not saved   ", err.data);
                return err.data;
              }
              console.log("book  saved   ", book);
              //doc.books.concat(book._id);
              await Author.findByIdAndUpdate(
                { _id: doc._id },
                { $push: { books: book._id } }
              );
            });
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            });
          }
        } else {
          console.log("create autthor here", args.author);
          const author = new Author({ name: args.author });
          author.save((err) => {
            if (err) {
              console.log("author not saved", err);
              return err.data;
            }
            book.author = author._id;

            try {
              console.log("create book", book);
              book.save(async (err) => {
                if (err) {
                  console.log("book not saved   ", err);
                  return err.data;
                }
                console.log("book  saved");
                await Author.findByIdAndUpdate(
                  { _id: author._id },
                  { $push: { books: book._id } }
                );
              });
            } catch (error) {
              throw new UserInputError(error.message, {
                invalidArgs: args,
              });
            }
          });
        }
      });
      return book;
    },
    editAuthor: async (root, args,{currentUser}) => {
      //console.log("edit Author");
      //find author by name and update the born feild
       if (!currentUser) {
         console.log("no authenticated user")
        throw new AuthenticationError("not authenticated")
       
      }
      const author = await Author.findOneAndUpdate(
        { name: args.name },

        { $set: { born: args.setBornTo }, new: true }
      );
      console.log("last log in Edit author", author.name, author.id);
      return author;
    },

    editBook: (root, args) => {
      console.log("edit Book");
      var book;
      Author.findOne({ name: args.setAuthorTo }, async (err, doc) => {
        if (err) {
          console.log("Error in find author.name");
        }
        try {
          book = await Book.findOne({ title: args.title });
          //add the book id to the new author books array
          Author.findByIdAndUpdate(
            { _id: doc._id },
            { $push: { books: book._id } },
            async (err) => {
              if (err) console.log("Error in add book to author", book.title);
              //remove the book id from the last author
              Author.findByIdAndUpdate(
                { _id: book.author },
                { $pull: { books: book._id } },
                { multi: true },
                (err) => {
                  if (err)
                    console.log(
                      "error in remove book id from the author array of the book"
                    );
                }
              );
            }
          );
          //Update the new author of the book
          Book.findOneAndUpdate(
            { _id: book._id },
            { $set: { author: doc._id }, new: true },
            (err) => {
              if (err) console.log("error in update the author of the book ");
            }
          );
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
        console.log("Update Book", book);
        //return book;
      });
      return Book.findOne({ title: args.title });
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secred") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  } /* End of Mutation*/,
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    id: (root) => root.id,
    bookCount: async (root) => {
      const auth = await Author.findOne({ _id: root._id });
      //console.log("from book Count", auth.books.length);
      return auth.books.length;
    },
  },
  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    genres: (root) => root.genres,
    author: async (root) => {
      const auth = await Author.findOne({ _id: root.author });
      //console.log(auth);
      return {
        name: auth.name,
        id: auth._id,
      };
    },
  },
}; /*end of resolver*/

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
