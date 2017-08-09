const {React} = require( "react");

const {DIControl} = require( "./di");

const {
  Route,
  Redirect,
} = require( "react-router-dom");

const PrivateRoute = (component, ...rest) => (
  
  <Route
    {...rest} render={props => (
    console.warn('COMPONENT', component) ||
    !DIControl.store.isLoggedIn ? (
        <Redirect to={{
          pathname: "/login",
          state: { from: props.location }
        }} />
      ) : (
        <Component {...props} />
      )
  )} />
);

exports.PrivateRoute = PrivateRoute;
