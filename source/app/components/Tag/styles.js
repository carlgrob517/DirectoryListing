import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor, Typography, FontWeight } from "@config";

export default StyleSheet.create({
  default: {
    flexDirection: "row",
    borderWidth: 1
  },
  primary: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 17,
    backgroundColor: BaseColor.primaryColor,
    borderColor: BaseColor.primaryColor,
    alignItems: "center",
    justifyContent: "center"
  },
  textPrimary: StyleSheet.flatten([
    Typography.caption1,
    { color: BaseColor.whiteColor }
  ]),
  outline: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 17,
    backgroundColor: BaseColor.whiteColor,
    borderColor: BaseColor.primaryColor,
    alignItems: "center",
    justifyContent: "center"
  },
  textOutline: StyleSheet.flatten([
    Typography.caption1,
    { color: BaseColor.primaryColor }
  ]),
  outlineSecondary: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 17,
    backgroundColor: BaseColor.whiteColor,
    borderColor: BaseColor.accentColor,
    alignItems: "center",
    justifyContent: "center"
  },
  textOutlineSecondary: StyleSheet.flatten([
    Typography.caption1,
    { color: BaseColor.accentColor }
  ]),
  small: {
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: BaseColor.primaryColor,
    borderColor: BaseColor.primaryColor,
    alignItems: "center",
    justifyContent: "center"
  },
  textSmall: StyleSheet.flatten([
    Typography.caption2,
    { color: BaseColor.whiteColor }
  ]),
  light: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: BaseColor.primaryColor,
    borderColor: BaseColor.primaryColor,
    alignItems: "center",
    justifyContent: "center"
  },
  textLight: StyleSheet.flatten([
    Typography.caption2,
    { color: BaseColor.lightPrimaryColor }
  ]),
  gray: {
    padding: 5,
    backgroundColor: BaseColor.fieldColor,
    borderColor: BaseColor.fieldColor,
    alignItems: "center",
    justifyContent: "center"
  },
  textGray: StyleSheet.flatten([Typography.caption2]),
  chip: {
    padding: 4,
    borderRadius: 10,
    backgroundColor: BaseColor.fieldColor,
    borderColor: BaseColor.fieldColor,
    alignItems: "center",
    justifyContent: "center"
  },
  textChip: StyleSheet.flatten([
    Typography.overline,
    { color: BaseColor.accentColor }
  ]),
  status: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: BaseColor.primaryColor,
    borderColor: BaseColor.primaryColor,
    alignItems: "center",
    justifyContent: "center"
  },
  textStatus: StyleSheet.flatten([
    Typography.caption2,
    { color: BaseColor.whiteColor, fontWeight: FontWeight.bold }
  ]),
  rate: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: BaseColor.lightPrimaryColor,
    borderColor: BaseColor.lightPrimaryColor,
    alignItems: "center",
    justifyContent: "center"
  },

  textRate: StyleSheet.flatten([
    Typography.headline,
    { color: BaseColor.whiteColor, fontWeight: FontWeight.bold }
  ]),
  rateSmall: {
    borderRadius: 3,
    paddingHorizontal: 5,
    backgroundColor: BaseColor.lightPrimaryColor,
    borderColor: BaseColor.lightPrimaryColor,
    alignItems: "center",
    justifyContent: "center"
  },
  textRateSmall: StyleSheet.flatten([
    Typography.caption2,
    { color: BaseColor.whiteColor, fontWeight: FontWeight.bold }
  ]),
  sale: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: BaseColor.lightPrimaryColor,
    borderColor: BaseColor.lightPrimaryColor,
    alignItems: "center",
    justifyContent: "center"
  },
  textSale: StyleSheet.flatten([
    Typography.headline,
    { color: BaseColor.whiteColor, fontWeight: FontWeight.bold }
  ])
});
