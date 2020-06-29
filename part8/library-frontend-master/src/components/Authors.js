import { useQuery, useMutation } from "@apollo/client";

import React, { useState } from "react";

import { All_Authors, EDIT_AUTHOR } from "../queries";

const Authors = (props) => {
  const result = useQuery(All_Authors);
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: All_Authors }],
    pollInterval: 500,
  });
  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return <div>...loading</div>;
  }

  const authors = result.data.allAuthors;

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, born } });
    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>{'   '}born</th>
            <th>{'        '}books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>' '</td>
              <td>{a.born}</td>
              <td>' '</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Change Born Date</h2>

      <form onSubmit={submit}>
        <div>
          name{" "}
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
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
          born{" "}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
            required
          />
        </div>
        <button type="submit">change born</button>
      </form>
    </div>
  );
};

export default Authors;
