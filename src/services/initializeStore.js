/**
 * Initialize store
 *
 * @format
 */

import { Alert } from "react-native";
import storage from "redux-persist/es/storage";
import { getStoredState } from "redux-persist";
 import { Constants, AppConfig } from "@common";

export const getCurrentStore = () => {};

export const compareStore = () => {
  return getStoredState({ key: "app", storage, serialize: true }).then(
    (store) => {
      return store;
    }
  );
};

export const initializeAndTestStore = () => {
  return compareStore().then((store) => {
    const { shopify, isNewStore } = store;
    //console.log("shopify", shopify);
    
  });
};
