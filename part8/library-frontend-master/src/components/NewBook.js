import React, { useState } from "react";
import {
  Add_BOOK,
  All_Books,
  All_Authors,
  All_BooksByGenres,
} from "../queries";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuhtor] = useState("");
  const [published, setPublished] = useState(0);
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(Add_BOOK, {
    refetchQueries: [{ query: All_Books }],
    update: (store, response) => {
      console.log("===>New Book =>", response.data.addBook.genres[0]);
      const dataInStore = store.readQuery({
        query: All_BooksByGenres,
        variables: { gener: response.data.addBook.genres[0] },
      });

      console.log("--->", dataInStore.findBooks);
      store.writeQuery({
        query: All_BooksByGenres,
        variables: { gener: response.data.addBook.genres[0] },
        data: {
          findBooks: [...dataInStore.findBooks, response.data.addBook],
        },
      });
      console.log("after write query--->", dataInStore.findBooks);
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    createBook({ variables: { title, published, author, genres } });
    console.log("add book...");

    setTitle("");
    setPublished("");
    setAuhtor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
