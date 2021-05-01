import { Route, Redirect } from "react-router-dom";
import Auth from "../auth/auth";
import { useSelector } from "react-redux";
function ProtectedRoute({ component: Component, isAuthenticated, ...rest }) {
  const userId = useSelector((state) => state.user.user._id);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Auth(userId)) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
