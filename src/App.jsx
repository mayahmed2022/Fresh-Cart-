import React from "react";
import { createBrowserRouter,createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import Register from "./Component/Register/Register";
import Login from "./Component/Login/Login";
import NotFound from "./Component/NotFound/NotFound";
import Products from "./Component/Products/Products";
import { AuthComtextProvider } from "./Context/AuthContext";
import Cart from "./Component/Cart/Cart";
import Brands from "./Component/Brands/Brands";
import Categories from "./Component/Categories/Categories";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import CategorySlider from "./Component/HomeSlider/HomeSlider";
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "./Context/CartContext";
import Payment from "./Component/Payment/Payment";
import AllOrders from "./Component/AllOrders/AllOrders";
import MyProfile from "./Component/MyProfile/MyProfile";
import { Offline } from "react-detect-offline";
import BrandsDetails from "./Component/BrandsDetails/BrandsDetails";





const myRouter = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />{" "}
          </ProtectedRoute>
        ),
      },
      
      {
        path: "allOrders",
        element: (
          <ProtectedRoute>
            <AllOrders />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <MyProfile />{" "}
          </ProtectedRoute>
        ),
      },
     
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            {" "}
            <Products />
          </ProtectedRoute>
        ),
      },
     

      { path: "brands", element: <Brands /> },
      {
        path: "brandsDetails",
        element: (
          <ProtectedRoute>
            <BrandsDetails />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "BrandsDetails/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <BrandsDetails />
          </ProtectedRoute>
        ),
      },
      { path: "categories", element: <Categories /> },
      { path: "categoriesss", element: <CategorySlider /> },
      { path: "*", element: <NotFound /> },
      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default function App() {
  const myClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={myClient}>
      <AuthComtextProvider>
      <CartContextProvider>  
          <RouterProvider router={myRouter} />
        </CartContextProvider>
        </AuthComtextProvider>
      </QueryClientProvider>

      <Toaster />
      <Offline >
        <div className=" bg-black  fixed-bottom bottom-0  w-50 border  rounded border-white opacity-75">
         <p className=" text-white text-center ">Oops! Your Internet Connection has been Curruptted....</p>
        </div>
      </Offline>
    </>
  );
}
