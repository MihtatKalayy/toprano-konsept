import { createBrowserRouter } from 'react-router'
import { RootLayout } from './components/layout/RootLayout'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { ProductsPage } from './pages/ProductsPage'
import { paths } from './routes/paths'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: paths.home, element: <HomePage /> },
      { path: paths.products, element: <ProductsPage /> },
      { path: paths.productDetail, element: <ProductDetailPage /> },
      { path: paths.cart, element: <CartPage /> },
      { path: paths.checkout, element: <CheckoutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
