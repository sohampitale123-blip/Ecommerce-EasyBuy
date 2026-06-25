import { Navigate, Route, Routes } from "react-router-dom";
import AuthenticatedAppShell from "./components/AuthenticatedAppShell";
import AuthenticatedRouteGuard from "./components/AuthenticatedRouteGuard";
import AccountPage from "./pages/AccountPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import ProductPage from "./pages/ProductPage";
import SignupPage from "./pages/SignupPage";
import AboutPage from "./pages/AboutPage";
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import { useAuthContext } from "./context/AuthContext";

// App-level route table for all pages.
function App() {
  const { isAuthenticated } = useAuthContext();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/home" replace /> : <LandingPage />
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? <Navigate to="/home" replace /> : <SignupPage />
        }
      />

      <Route
        element={
          <AuthenticatedRouteGuard>
            <AuthenticatedAppShell />
          </AuthenticatedRouteGuard>
        }
      >
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/categories" element={<ProductPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<OrderConfirmationPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
