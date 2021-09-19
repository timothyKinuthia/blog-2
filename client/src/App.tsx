import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import PageRenderer from "./PageRenderer";
import { refreshToken } from "./store/actions/action-creators/authActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);
  
  return (
    <div className="">
      <Header />
      <Alert/>
      <Switch>
        <Route exact path="/" component={PageRenderer} />
        <Route exact path="/:page" component={PageRenderer} />
        <Route exact path="/:page/:slug" component={PageRenderer} />
      </Switch>
    </div>
  );
}

export default App;
