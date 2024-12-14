import { Children, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Notfoundpage from "./Components/Notfoundpage/Notfoundpage";
import Login from "./Components/Login/Login";
import Brands from "./Components/Brands/Brands";
import Register from "./Components/Register/Register";
import Category from "./Components/Category/Category";
import UserContext from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartContext from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Payment from "./Components/Payment/Payment";
import AllOrder from "./Components/AllOrder/AllOrder";
import SubCategory from "./Components/SubCategory/SubCategory";
import SupBrand from "./Components/SupBrand/SupBrand";
import WishlistContext from "./Context/WishlistContext";
import WishList from "./Components/WishList/WishList";
import ResetPasswordContext from "./Context/ResetPasswordContext";
import ForgetPass from "./Components/ForgetPass/ForgetPass";
import ResetPass from "./Components/ResetPass/ResetPass";
import VerifyReset from "./Components/VerifyReset/VerifyReset";

export default function App() {
  let client = new QueryClient();

  let myRouter = createBrowserRouter(
    [
      {
        path: "",
        element: <Layout />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            ),
          },
          {
            path: "product",
            element: (
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            ),
          },
          {
            path: "allorders",
            element: (
              <ProtectedRoute>
                <AllOrder />
              </ProtectedRoute>
            ),
          },
          {
            path: "cart",
            element: (
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            ),
          },
          {
            path: "wishlist",
            element: (
              <ProtectedRoute>
                <WishList />
              </ProtectedRoute>
            ),
          },
          {
            path: "brand",
            element: (
              <ProtectedRoute>
                <Brands />
              </ProtectedRoute>
            ),
          },
          {
            path: "/subBrand/:brandID",
            element: (
              <ProtectedRoute>
                <SupBrand />
              </ProtectedRoute>
            ),
          },
          {
            path: "category",
            element: (
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            ),
          },
          {
            path: "/subCategory/:idCategory",
            element: (
              <ProtectedRoute>
                <SubCategory />
              </ProtectedRoute>
            ),
          },
          {
            path: "payment",
            element: (
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            ),
          },
          {
            path: "ProductDetails/:categoryProduct/:productId",
            element: (
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            ),
          },
          { path: "register", element: <Register /> },
          { path: "/login", element: <Login /> },
          { path: "login/forgetPassword", element: <ForgetPass /> },
          { path: "login/resentCode", element: <VerifyReset /> },
          { path: "login/resetPassword", element: <ResetPass /> },
          { path: "*", element: <Notfoundpage /> },
        ],
      },
    ],
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );
  return (
    <>
      <ResetPasswordContext>
        <UserContext>
          <CartContext>
            <WishlistContext>
              <QueryClientProvider client={client}>
                <RouterProvider router={myRouter} />
                {/* The rest of your application */}
                <Toaster
                  toastOptions={{
                    success: {
                      style: {
                        background:
                          "linear-gradient(to right, #56ab2f, #a8e063)", // Green gradient
                        padding: "3px 4px", // Enhanced padding
                        color: "#ffffff", // Text color
                        borderRadius: "8px", // Rounded corners
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                        fontFamily: "Arial, sans-serif", // Improved font style
                        fontWeight: "bold", // Bold text for emphasis
                      },
                    },
                    error: {
                      style: {
                        background:
                          "linear-gradient(to right, #e53935, #e35d5b)", // Red gradient
                        padding: "3px 4px", // Enhanced padding
                        color: "#ffffff", // Text color
                        borderRadius: "8px", // Rounded corners
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                        fontFamily: "Arial, sans-serif", // Improved font style
                        fontWeight: "bold", // Bold text for emphasis
                      },
                    },
                  }}
                />
                <ReactQueryDevtools />
              </QueryClientProvider>
            </WishlistContext>
          </CartContext>
        </UserContext>
      </ResetPasswordContext>
    </>
  );
}
