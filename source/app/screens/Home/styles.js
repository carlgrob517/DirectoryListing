import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
  imageBackground: {
    height: 140,
    width: "100%",
    position: "absolute"
  },
  contentPage: {
    bottom: 80
  },
  searchForm: {
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BaseColor.fieldColor,
    backgroundColor: BaseColor.whiteColor,
    shadowColor: "black",
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1
  },
  lineForm: {
    width: 1,
    height: "100%",
    backgroundColor: BaseColor.dividerColor,
    marginHorizontal: 10
  },
  contentLocation: {
    paddingTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  serviceItem: {
    flex: 1,
    alignItems: "center"
  },
  serviceCircleIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: BaseColor.lightPrimaryColor
  },
  btnPromotion: {
    height: 25,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  contentPopular: {
    marginHorizontal: 20,
    marginBottom: 10
  },
  promotionBanner: {
    height: Utils.scaleWithPixel(100),
    width: "100%",
    marginTop: 10
  },
  line: {
    height: 1,
    backgroundColor: BaseColor.textSecondaryColor,
    marginTop: 10,
    marginBottom: 20
  },
  popularItem: {
    borderRadius: 8,
    width: Utils.scaleWithPixel(135),
    height: Utils.scaleWithPixel(160)
  }
});
