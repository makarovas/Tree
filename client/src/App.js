import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Layout from "./Story/Layout";
import DeviceTree from "./pages/device-tree";
import store from "./store/store";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Redirect from="/" exact to="/main" />
          <Route path="/main" exact component={DeviceTree} />
        </Switch>
      </Layout>
    </BrowserRouter>
  </Provider>
);

export default App;
