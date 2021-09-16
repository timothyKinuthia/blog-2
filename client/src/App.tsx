import { Route, Switch } from "react-router-dom";
import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import PageRenderer from "./PageRenderer";

function App() {
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
