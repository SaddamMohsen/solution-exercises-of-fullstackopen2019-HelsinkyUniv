import axios from "axios";
const baseUrl = "/api/login";

const login = async credential => {
  const response = await axios.post(baseUrl, credential);
  let user = response.data;
  // user = JSON.parse(user);
  //window.localStorage.setItem("loggedUser", JSON.stringify(user));
  return user;
};

export default { login };
