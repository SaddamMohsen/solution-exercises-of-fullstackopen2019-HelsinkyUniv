import { useQuery, useMutation } from "@apollo/client";

import React, { useState } from "react";

import { All_Books, EDIT_BOOK, EDIT_BOOKGenres } from "../queries";

const Books = (props) => {
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [genres, setGenres] = useState([]);
  const [showAll, setShowAll] = useState("All");

  const result = useQuery(All_Books);

  const [editBook] = useMutation(EDIT_BOOK, {
    refetchQueries: [{ query: All_Books }],
    pollInterval: 500,
  });
  const [editBookGenres] = useMutation(EDIT_BOOKGenres, {
    refetchQueries: [{ query: All_Books }],
    pollInterval: 500,
  });

  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return <div>...loading</div>;
  }

  const books = result.data.allBooks;
  const submit = async (event) => {
    event.preventDefault();

    //console.log("change authors button pressed");

    editBook({ variables: { title, author } });
    setTitle("");
    setAuthor("");
  };
  const submit2 = async () => {
   // console.log("change genres button pressed");
    //console.log(author, genres);

    editBookGenres({ variables: { title, author } });
    setTitle("");
    setAuthor("");
  };
  //extract genres into new array
  var arr = new Array();
  books.map((value) => value.genres.map(a=>arr.push(a.toLocaleLowerCase())));
  //remove the duplicate values from genres Array
  var genresArr = arr.reduce((prev, number) => {
    if (prev.indexOf(number) === -1) {
      prev.push(number);
    }
    return prev;
  }, []);
  var obj=[]
  const booksToShow =
    showAll === "All"
      ? books
      : books.filter((b) =>
  b.genres.filter((g) => 
    g.toLocaleLowerCase() === showAll
  ).length > 0);
   //book.genres.some(g => g.toLocaleLowerCase() === showAll.toLocaleLowerCase()))
    

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{"     "}</td>
              <td>{a.author.name}</td>
              <td>{"     "}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={submit} id="main">
        <div>
          name{" "}
          <select
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          >
            {booksToShow.map((a) => (
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
          Author ||Genres
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </div>

        <button
          type="submit"
          name="submit1"
          value="submit1"
          onClick={() => submit}
        >
          change Author
        </button>
        <button
          type="button"
          name="submit2"
          value="submit2"
          onClick={() => submit2()}
        >
          change genres
        </button>
      </form>
      <table>
        <tbody>
          <tr>
            {genresArr.map((a) => (
              <td key={a}>
                <button onClick={() => setShowAll(a)}>{a}</button>
              </td>
            ))}
            <td>
              <button onClick={() => setShowAll("All")}>All Books</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Books;
