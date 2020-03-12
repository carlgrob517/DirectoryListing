import React, { Component } from "react";
import { store, persistor } from "app/store";
import { StatusBar } from "react-native";
import { BaseColor } from "@config";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./navigation";

console.disableYellowBox = true;

export default class index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    StatusBar.setBackgroundColor(BaseColor.primaryColor, true);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    );
  }
}
