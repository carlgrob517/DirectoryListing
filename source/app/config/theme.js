import { StyleSheet } from "react-native";
import { BaseColor } from "./color";

/**
 * Common basic style defines
 */
export const BaseStyle = StyleSheet.create({
  tabBar: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10
  },
  bodyPaddingDefault: {
    paddingHorizontal: 20
  },
  bodyMarginDefault: {
    marginHorizontal: 20
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    justifyContent: "center"
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "white"
  }
});
