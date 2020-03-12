import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  contain: {
    flexDirection: "row"
  },
  iconContent: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: BaseColor.lightPrimaryColor,
    alignItems: "center",
    justifyContent: "center"
  }
});
