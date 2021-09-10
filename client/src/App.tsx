import { Route, Switch } from "react-router-dom";
import PageRenderer from "./PageRenderer";

function App() {
  return (
    <div className="">
      <Switch>
        <Route exact path="/" component={PageRenderer} />
        <Route exact path="/:page" component={PageRenderer} />
        <Route exact path="/:page/:slug" component={PageRenderer} />
      </Switch>
    </div>
  );
};

export default App;
