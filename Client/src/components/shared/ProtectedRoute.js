// components/shared/ProtectedRoute.js
class ProtectedRoute extends React.Component {
  static contextType = AuthContext;

  render() {
    const { component: Component, allowedRoles, ...rest } = this.props;
    const { isAuthenticated, user } = this.context;

    return (
      <Route
        {...rest}
        render={(props) => {
          if (!isAuthenticated) {
            return <Redirect to="/login" />;
          }
          if (allowedRoles && !allowedRoles.includes(user.role)) {
            return <Redirect to="/" />;
          }
          return <Component {...props} />;
        }}
      />
    );
  }
}

// Usage in App.js
<Switch>
  <ProtectedRoute
    exact
    path="/admin"
    component={AdminDashboard}
    allowedRoles={["admin"]}
  />
  <ProtectedRoute exact path="/dashboard" component={UserDashboard} />
</Switch>;
