import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddPost from "../Pages/AddPost/AddPost";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import MyPosts from "../Pages/MyPosts/MyPosts";
import Register from "../Pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },

      { path: "/myposts", element: <MyPosts /> },
      { path: "/addpost", element: <AddPost /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
