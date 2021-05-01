import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

const TodoList = React.lazy(() => import("./components/TodoList"));
const Mentor = React.lazy(() => import("./components/Mentor"));
const Login = React.lazy(() => import("./components/Login"));

function App() {
  return (
    <React.Suspense fallback={<p>Loading....</p>} className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <ProtectedRoute exact path="/dashboard" component={Mentor} />
          <ProtectedRoute exact path="/task/:id" component={TodoList} />
          <Route exact path="*">
            <div>404 Not found </div>
          </Route>
        </Switch>
      </Router>
    </React.Suspense>
  );
}

export default App;
