import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.authorization.currentUser);

  if (!currentUser) {
    return <Navigate to="/signIn" replace />;
  }

  return children;
};

export default ProtectedRoute;
