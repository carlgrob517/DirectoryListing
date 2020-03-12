import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
  contain: {
    flexDirection: "row",
    height: Utils.scaleWithPixel(115),
    borderRadius: 8
  },
  contentIcon: {
    position: "absolute",
    padding: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BaseColor.lightPrimaryColor,
    alignItems: "center",
    justifyContent: "center"
  }
});
