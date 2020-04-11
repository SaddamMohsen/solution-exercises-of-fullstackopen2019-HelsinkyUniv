import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from "react-router-dom";

import { useField } from "./hooks";
const Menu = (props) => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/" style={padding}>
        anecdotes
      </Link>
      <Link to="/createNew" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  );
};
const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h1>{anecdote.content} </h1>
      <h2>
        has Votes:
        {anecdote.votes}
        <br />
        <strong>Author:{anecdote.author}</strong>
      </h2>
      <b>
        {" "}
        url: <a>{anecdote.info}</a>
      </b>
    </div>
  );
};

const AnecdoteList = (props) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {props.anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          <button onClick={() => props.vote(anecdote.id)}>Vote</button>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -sovelluskehitys
    </a>
    <br />. See{" "}
    <a href="https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const { input: content, reset: rescontent } = useField("text");
  const { input: author, reset: resauthor } = useField("text");
  const { input: info, reset: resinfo } = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

    props.history.push("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content:
          <input {...content} />
        </div>
        <div>
          author :
          <input {...author} />
        </div>
        <div>
          url for more info :
          <input {...info} />
        </div>
        <button>create</button>
      </form>
      <button
        onClick={() => {
          rescontent();
          resauthor();
          resinfo();
        }}
      >
        reset
      </button>
    </div>
  );
};
const CreateNew1 = withRouter(CreateNew);

const Notification = (props) => {
  if (props.notification === "") return null;
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    width: "50%",
  };
  return <div style={style}>{props.notification}</div>;
};
const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));

    setNotification(`new anecdote add ,${anecdote.content}`);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  const anecdoteById = (id) => {
    const a = anecdotes.find((a) => a.id === id);
    return a;
  };

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>

      <Router>
        <Menu />
        {notification ? <Notification notification={notification} /> : null}
        <Route
          exact
          path="/"
          render={() => <AnecdoteList anecdotes={anecdotes} vote={vote} />}
        />
        <Route
          exact
          path="/anecdotes/:id"
          render={({ match }) => (
            <Anecdote anecdote={anecdoteById(match.params.id)} />
          )}
        />

        <Route
          path="/createNew"
          render={() => <CreateNew1 addNew={addNew} />}
        />
        <Route path="/about" render={() => <About />} />
      </Router>

      <Footer />
    </div>
  );
};

export default App;
