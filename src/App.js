import { useEffect, memo } from "react";
import Game from "./Game";
import Main from "./Main";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
