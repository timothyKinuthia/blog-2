import { Route, Switch } from "react-router-dom";
import Header from "./components/header/Header";
import PageRenderer from "./PageRenderer";

function App() {
  return (
    <div className="">
      <Header />
      <Switch>
        <Route exact path="/" component={PageRenderer} />
        <Route exact path="/:page" component={PageRenderer} />
        <Route exact path="/:page/:slug" component={PageRenderer} />
      </Switch>
    </div>
  );
}

export default App;
