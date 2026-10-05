import { createBrowserRouter } from 'react-router'
import { PageLoadingFallback } from './components/layout/PageLoadingFallback'
import { RootLayout } from './components/layout/RootLayout'
import { RouteErrorPage } from './pages/RouteErrorPage'
import { paths } from './routes/paths'

// Her sayfa ayrı bir parça olarak, yalnızca o sayfa açıldığında yüklenir.
export const router = createBrowserRouter([
  {
    Component: RootLayout,
    HydrateFallback: PageLoadingFallback,
    ErrorBoundary: RouteErrorPage,
    children: [
      { path: paths.home, lazy: async () => ({ Component: (await import('./pages/HomePage')).HomePage }) },
      { path: paths.products, lazy: async () => ({ Component: (await import('./pages/ProductsPage')).ProductsPage }) },
      { path: paths.productDetail, lazy: async () => ({ Component: (await import('./pages/ProductDetailPage')).ProductDetailPage }) },
      { path: paths.cart, lazy: async () => ({ Component: (await import('./pages/CartPage')).CartPage }) },
      { path: paths.checkout, lazy: async () => ({ Component: (await import('./pages/checkoutRoutes')).CheckoutPage }) },
      {
        path: paths.checkoutConfirmation,
        lazy: async () => ({ Component: (await import('./pages/checkoutRoutes')).CheckoutConfirmationPage }),
      },
      { path: '*', lazy: async () => ({ Component: (await import('./pages/NotFoundPage')).NotFoundPage }) },
    ],
  },
])
