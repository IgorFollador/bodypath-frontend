import axios from 'axios';

export const api = new axios.create({
    baseURL: 'http://localhost:10000'
});

api.interceptors.request.use(
    function(config) {
      const token = localStorage.getItem("@Auth:token"); 
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
      } else {
        delete config.headers["Authorization"];
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );