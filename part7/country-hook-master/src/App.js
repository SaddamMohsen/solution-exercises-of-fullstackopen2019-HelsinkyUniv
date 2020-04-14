import React, { useState, useEffect } from "react";

import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState([]);
  const [found, setfound] = useState(false);
  const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`;
  useEffect(() => {
    setfound(false);
    setCountry([]);
    axios
      .get(url)
      .then((response) => response.data)
      .then((result) => {
        setCountry(
          result.filter((r) => r.name.toLowerCase() === name.toLowerCase())
        );
        setfound(true);
      })
      .catch((error) => console.log(error));
  }, [url, name]);
  return {
    data: country,
    found: found,
  };
};

const Country = ({ country, name }) => {
  if (!country) {
    return <div>... no input</div>;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data[0].name} </h3>
      <div>capital {country.data[0].capital} </div>
      <div>population {country.data[0].population}</div>
      <img
        src={country.data[0].flag}
        height="100"
        alt={`flag of ${country.data[0].name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} name={name} />
    </div>
  );
};

export default App;
