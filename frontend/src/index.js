import React, {useEffect} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./app.css";
import NewGame from "./pages/NewGame";
import reportWebVitals from "./reportWebVitals";
import {createBrowserRouter, Outlet,  RouterProvider} from "react-router-dom";
import Game from "./pages/Game";
import Header from "./components/Header";

const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/new",
        element: <NewGame />,
      },
      {
        path: "/game/:id",
        element: <Game />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
