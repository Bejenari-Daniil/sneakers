import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Products from '../components/Products/Products';
import Favorites from '../pages/Favorites/Favorites';
import Orders from '../pages/Orders/Orders';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import SignIn from '../pages/Authorization/SignIn/SignIn';
import SignUp from '../pages/Authorization/SignUp/SignUp';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import AuthLayout from '../components/AuthLayout/AuthLayout ';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
        </Route>

        <Route path="/" element={<Layout />}>
          <Route index element={<Products />} />
          <Route
            path="favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
