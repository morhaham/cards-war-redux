import Game from "./components/game/Game";
import Main from "./components/main/Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex justify-center h-3/5 w-2/4 border-4 border-blue-800 m-auto mt-8 p-6">
      <Router>
        <Switch>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
