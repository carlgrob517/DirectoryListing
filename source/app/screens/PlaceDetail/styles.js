import React from "react";
import { StyleSheet, Platform } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
  imgBanner: {
    width: "100%",
    height: 250,
    position: "absolute"
  },
  lineSpace: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  rateLine: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20
  },
  contentIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BaseColor.textSecondaryColor,
    alignItems: "center",
    justifyContent: "center"
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    marginRight: 5
  },
  tabbar: {
    backgroundColor: "white",
    height: 40
  },
  tab: {
    width: 130
  },
  indicator: {
    backgroundColor: BaseColor.primaryColor,
    height: 1
  },
  label: {
    fontWeight: "400"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  contentInforAction: {
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1
  },
  lineWorkHours: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: BaseColor.textSecondaryColor
  },
  wrapContent: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: BaseColor.textSecondaryColor,
    paddingBottom: 20
  },
  contentDescription: {
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: BaseColor.textSecondaryColor,
    paddingBottom: 20
  }
});
