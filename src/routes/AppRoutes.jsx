import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Products from '../components/Products/Products';
import Favorites from '../pages/Favorites/Favorites';
import Orders from '../pages/Orders/Orders';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Products />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="orders" element={<Orders />} />
          <Route path="sneakers" element={<Navigate to="/" />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
