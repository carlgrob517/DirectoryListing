import React, { Component } from "react";
import { store, persistor } from "app/store";
import { StatusBar } from "react-native";
import { BaseColor } from "@config";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./navigation";

import memoize from "lodash.memoize";
import i18n from "i18n-js";
import * as RNLocalize from "react-native-localize";
import { I18nManager } from "react-native";

import {  
  Text
} from "@components";

console.disableYellowBox = true;

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)  
  en: () => require("./lang/en.json"),
  fr: () => require("./lang/fr.json")
};

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = { languageTag: "en", isRTL: false };

  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};

export default class index extends Component {
  constructor(props) {
    super(props);
    setI18nConfig();
  }

  componentDidMount() {
    StatusBar.setBackgroundColor(BaseColor.primaryColor, true);
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
  }
  
  componentWillUnmount() {
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };
///{/* <Text body1 grayColor style={{ flex: 1 }}>{translate("Search Location")}</Text> */}
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
