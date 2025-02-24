import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Cart from "../components/Cart";
import CheckOut from "../components/CheckOut";
import SinglePage from "../components/SinglePage";
import PrivateRoute from "./private/PrivateRoute";
import Orders from "../pages/Orders";
import AdminLogin from "../components/AdminLogin";
import PrivateRouteForAdmin from "./private/PrivateRouteForAdmin";
import DashboardLayout from "../pages/dashboard/dashboardLayout";
import ManageBooks from "../pages/dashboard/ManageBooks";
import UpdateBook from "../pages/dashboard/UpdateBook";
import AddBook from "../pages/dashboard/addbook/AddBook";
import Dashboard from "../pages/dashboard/Dashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <CheckOut />
          </PrivateRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        ),
      },
      {
        path: "/books/:id",
        element: <SinglePage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouteForAdmin>
        <DashboardLayout />
      </PrivateRouteForAdmin>
    ),
    children: [
      {
        path: "",
        element: (
          <PrivateRouteForAdmin>
            <Dashboard />
          </PrivateRouteForAdmin>
        ),
      },
      {
        path: "add-new-book",
        element: (
          <PrivateRouteForAdmin>
            <AddBook />
          </PrivateRouteForAdmin>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <PrivateRouteForAdmin>
            <UpdateBook />
          </PrivateRouteForAdmin>
        ),
      },
      {
        path: "manage-books",
        element: (
          <PrivateRouteForAdmin>
            <ManageBooks />
          </PrivateRouteForAdmin>
        ),
      },
    ],
  },
]);
export default router;
