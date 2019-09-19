import React, { Fragment } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//api
import { otherStuff } from "./api/shorts";

//redux
import { Provider } from "react-redux";
import store from "./store";

//components
import Lobby from "./components/lobby/Lobby";
import Game from "./components/game/Game";

const App = props => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div
            className="main"
            style={{
              background: `url(${otherStuff.background}) no-repeat center`
            }}
          >
            <Switch>
              <Route exact path="/" component={Lobby} />
              <Route exact path="/game" component={Game} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
