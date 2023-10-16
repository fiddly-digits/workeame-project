import { Navigate } from 'react-router-dom';

function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const token = sessionStorage.getItem('token');

    if (!token) {
      return <Navigate to='/login' replace />;
    }

    return <Component {...props} />;
  };
}

export default withAuth;
