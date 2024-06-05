import { DashboardLayout, RootLayout } from '@/layouts'
import {
  About,
  Auth,
  Products,
  Contact,
  DashboardHome,
  DiscountedProducts,
  Error,
  Home,
  ProductDetails,
  Profile,
  AddProduct,
  UpdateProduct,
} from '@/pages'
import ManageProducts from '@/pages/dashboard/ManageProducts'

import { createBrowserRouter } from 'react-router-dom'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'product/:id',
        element: <ProductDetails />,
      },
      {
        path: 'discounted-products',
        element: <DiscountedProducts />,
      },
      {
        path: 'auth',
        element: <Auth />,
      },
    ],
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: 'dashboard/home',
        element: <DashboardHome />,
      },
      {
        path: 'dashboard/profile',
        element: <Profile />,
      },
      {
        path: 'dashboard/manage-products/add-product',
        element: <AddProduct />,
      },
    
      {
        path: 'dashboard/manage-products',
        element: <ManageProducts />,
      },
     
      {
        path: 'dashboard/manage-products/update-product/:id',
        element: <UpdateProduct />,
      },
    ],
  },
])
