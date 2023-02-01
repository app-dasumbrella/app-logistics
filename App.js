/** @format */

import React from "react";
import { ThemeProvider } from "@callstack/react-theme-provider";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import { initializeAndTestStore } from "@services/initializeStore";
import store from "@store/configureStore";
import { Color } from "@common";
import { LogBox } from 'react-native';
import RootRouter from "./src/Router";
import settingData from './src/data/json/site_1.0.json'

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const persistor = persistStore(store);

console.ignoredYellowBox = [
  "Warning: View.propTypes",
  "Require cycle:",
];

export default class App extends React.Component {
  state = {
    appIsReady: false,
    primaryColor: Color.primary,
    isNewStore: false,
  };

  componentDidMount() {

    console.log(settingData.settings)
  }

  initializeStore = () => {
    initializeAndTestStore()
      .then((store) => {
        this.setState({
          primaryColor: store.shopify.primaryColor,
          isNewStore: store.isNewStore,
          appIsReady: true,
        });
      })
      .catch((error) => {
        this.setState({ appIsReady: true });

      });
  };



  render() {


    const Theme = {
      primaryColor: settingData.theme.primaryColor,
    };

    console.log("Theme", Theme);

    return (
      <ThemeProvider theme={Theme}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <RootRouter persistor={persistor} />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    );
  }
}
