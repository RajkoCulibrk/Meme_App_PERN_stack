import axios from "axios";

const instance = axios.create({
  baseURL: "https://rajko-mern-meme-app.herokuapp.com/api/"
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default instance;
