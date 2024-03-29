import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import App from "./App";
import store from "./store/store";
import "./assets/css/tailwind.css";
import "./assets/css/styles.css";
import "./assets/css/icons.css";
import "./assets/css/loader.css";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const axiosInterceptor = () => {
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
      if (
        config.method === "post" &&
        (config.url === "/api/service" || config.url === "/api/product")
      ) {
      } else {
        config.headers["Content-Type"] = "application/json";
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        window.location = "/login";
      }
      return Promise.reject(error.response.data);
    }
  );

  // Alter defaults after instance has been created
  axios.defaults.baseURL = baseUrl;
  axios.defaults.timeout = 20000;
};

axiosInterceptor();
if (window.self === window.top) {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
} else {
  for (let i = 0; i > -1; i++) {}
}
