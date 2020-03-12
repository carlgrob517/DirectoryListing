import React, { Component } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Animated,
  TouchableOpacity,
  Linking,
  Alert
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  StarRating,
  Tag,
  Image,
  PlaceItem,
  CardList
} from "@components";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Utils from "@utils";
import styles from "./styles";

// Load sample data
import { PlaceListData, ReviewData } from "@data";

export default class PlaceDetail extends Component {
  constructor(props) {
    super(props);

    // Temp data define
    this.state = {
      collapseHour: true,
      index: 0,
      routes: [
        { key: "information", title: "Information" },
        { key: "review", title: "Review" },
        { key: "feedback", title: "Feedback" },
        { key: "map", title: "Map" }
      ],
      heightHeader: Utils.heightHeader(),
      information: [
        {
          id: "1",
          icon: "map-marker-alt",
          title: "Address",
          type: "map",
          information: "667 Wiegand Gardens Suite, United States"
        },
        {
          id: "2",
          icon: "mobile-alt",
          title: "Tel",
          type: "phone",
          information: "+903 9802-7892"
        },
        {
          id: "3",
          icon: "envelope",
          title: "Email",
          type: "email",
          information: "liststar@passionui.com"
        },
        {
          id: "4",
          icon: "globe",
          title: "Website",
          type: "web",
          information: "http://passionui.com"
        }
      ],
      workHours: [
        { id: "1", date: "Monday", hour: "09:0 AM - 18:00 PM" },
        { id: "2", date: "Tuesday", hour: "09:0 AM - 18:00 PM" },
        { id: "3", date: "Wednesday", hour: "09:0 AM - 18:00 PM" },
        { id: "4", date: "Thursday", hour: "09:0 AM - 18:00 PM" },
        { id: "5", date: "Friday", hour: "09:0 AM - 18:00 PM" },
        { id: "6", date: "Saturday", hour: "Close" },
        { id: "7", date: "Sunday", hour: "Close" }
      ],
      list: PlaceListData,
      relate: PlaceListData.slice(2, 4),
      facilities: [
        { id: "1", icon: "wifi", name: "Free Wifi", checked: true },
        { id: "2", icon: "bath", name: "Shower" },
        { id: "3", icon: "paw", name: "Pet Allowed" },
        { id: "4", icon: "bus", name: "Shuttle Bus" },
        { id: "5", icon: "cart-plus", name: "Supper Market" },
        { id: "6", icon: "clock", name: "Open 24/7" }
      ],
      region: {
        latitude: 1.352083,
        longitude: 103.819839,
        latitudeDelta: 0.009,
        longitudeDelta: 0.004
      }
    };
    this._deltaY = new Animated.Value(0);
  }

  onOpen(item) {
    Alert.alert(
      "Listar",
      "Do you want to open " + item.title + " ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            switch (item.type) {
              case "web":
                Linking.openURL(item.information);
                break;
              case "phone":
                Linking.openURL("tel://" + item.information);
                break;
              case "email":
                Linking.openURL("mailto:" + item.information);
                break;
              case "map":
                Linking.openURL(
                  "http://maps.apple.com/?ll=37.484847,-122.148386"
                );
                break;
            }
          }
        }
      ],
      { cancelable: true }
    );
  }

  onCollapse() {
    Utils.enableExperimental();
    this.setState({
      collapseHour: !this.state.collapseHour
    });
  }

  render() {
    const { navigation } = this.props;
    const {
      heightHeader,
      information,
      workHours,
      collapseHour,
      list,
      relate,
      facilities,
      region
    } = this.state;
    const heightImageBanner = Utils.scaleWithPixel(250, 1);
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Animated.View
          style={[
            styles.imgBanner,
            {
              height: this._deltaY.interpolate({
                inputRange: [
                  0,
                  Utils.scaleWithPixel(140),
                  Utils.scaleWithPixel(140)
                ],
                outputRange: [heightImageBanner, heightHeader, heightHeader]
              })
            }
          ]}
        >
          <Image source={Images.location7} style={{ flex: 1 }} />
          <Animated.View
            style={{
              position: "absolute",
              bottom: 15,
              left: 20,
              flexDirection: "row",
              opacity: this._deltaY.interpolate({
                inputRange: [
                  0,
                  Utils.scaleWithPixel(140),
                  Utils.scaleWithPixel(140)
                ],
                outputRange: [1, 0, 0]
              })
            }}
          >
            <Image source={Images.profile2} style={styles.userIcon} />
            <View>
              <Text headline semibold whiteColor>
                Steve Garrett
              </Text>
              <Text footnote whiteColor>
                5 hours ago | 100k views
              </Text>
            </View>
          </Animated.View>
        </Animated.View>
        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
          {/* Header */}
          <Header
            title=""
            renderLeft={() => {
              return (
                <Icon
                  name="arrow-left"
                  size={20}
                  color={BaseColor.whiteColor}
                />
              );
            }}
            renderRight={() => {
              return (
                <Icon name="images" size={20} color={BaseColor.whiteColor} />
              );
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
            onPressRight={() => {
              navigation.navigate("PreviewImage");
            }}
          />
          <ScrollView
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: { y: this._deltaY }
                }
              }
            ])}
            onContentSizeChange={() => {
              this.setState({
                heightHeader: Utils.heightHeader()
              });
            }}
            scrollEventThrottle={8}
          >
            <View style={{ height: 255 - heightHeader }} />
            <View
              style={{
                paddingHorizontal: 20,
                marginBottom: 20
              }}
            >
              <View style={styles.lineSpace}>
                <Text title1 semibold>
                  Lounge Coffee Bar
                </Text>
                <Icon
                  name="heart"
                  color={BaseColor.lightPrimaryColor}
                  size={24}
                />
              </View>
              <View style={styles.lineSpace}>
                <View>
                  <Text caption1 grayColor>
                    Arts & Humanities
                  </Text>
                  <TouchableOpacity
                    style={styles.rateLine}
                    onPress={() => navigation.navigate("Review")}
                  >
                    <Tag
                      rateSmall
                      style={{ marginRight: 5 }}
                      onPress={() => navigation.navigate("Review")}
                    >
                      4.5
                    </Tag>
                    <StarRating
                      disabled={true}
                      starSize={10}
                      maxStars={5}
                      rating={4.5}
                      fullStarColor={BaseColor.yellowColor}
                      on
                    />
                    <Text footnote grayColor style={{ marginLeft: 5 }}>
                      (609)
                    </Text>
                  </TouchableOpacity>
                </View>
                <Tag status>Featured</Tag>
              </View>
              {information.map(item => {
                return (
                  <TouchableOpacity
                    style={styles.line}
                    key={item.id}
                    onPress={() => this.onOpen(item)}
                  >
                    <View style={styles.contentIcon}>
                      <Icon
                        name={item.icon}
                        size={16}
                        color={BaseColor.whiteColor}
                      />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <Text caption2 grayColor>
                        {item.title}
                      </Text>
                      <Text footnote semibold style={{ marginTop: 5 }}>
                        {item.information}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity
                style={styles.line}
                onPress={() => this.onCollapse()}
              >
                <View style={styles.contentIcon}>
                  <Icon name="clock" size={16} color={BaseColor.whiteColor} />
                </View>
                <View style={styles.contentInforAction}>
                  <View>
                    <Text caption2 grayColor>
                      Open Hours
                    </Text>
                    <Text footnote semibold style={{ marginTop: 5 }}>
                      09:00 AM - 18:00 PM
                    </Text>
                  </View>
                  <Icon
                    name={collapseHour ? "angle-up" : "angle-down"}
                    size={24}
                    color={BaseColor.grayColor}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  paddingLeft: 40,
                  paddingRight: 20,
                  marginTop: 5,
                  height: collapseHour ? 0 : null,
                  overflow: "hidden"
                }}
              >
                {workHours.map(item => {
                  return (
                    <View style={styles.lineWorkHours} key={item.id}>
                      <Text body2 grayColor>
                        {item.date}
                      </Text>
                      <Text body2 accentColor semibold>
                        {item.hour}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={styles.contentDescription}>
              <Text body2 style={{ lineHeight: 20 }}>
                Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor
                eget felis porttitor volutpat. Sed porttitor lectus nibh. Nulla
                quis lorem ut libero malesuada feugiat. Quisque velit nisi,
                pretium ut lacinia in, elementum id enim.
              </Text>
              <View
                style={{
                  paddingVertical: 20,
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderColor: BaseColor.textSecondaryColor
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text caption1 grayColor>
                    Date Established
                  </Text>
                  <Text headline style={{ marginTop: 5 }}>
                    Sep 26, 2009
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text caption1 grayColor>
                    Price Range
                  </Text>
                  <Text headline style={{ marginTop: 5 }}>
                    $46.00 to $93.00
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: 180,
                  paddingVertical: 20
                }}
              >
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  region={region}
                  onRegionChange={() => {}}
                >
                  <Marker
                    coordinate={{
                      latitude: 1.352083,
                      longitude: 103.819839
                    }}
                  />
                </MapView>
              </View>
            </View>
            <Text
              title3
              semibold
              style={{
                paddingHorizontal: 20,
                paddingTop: 15,
                paddingBottom: 5
              }}
            >
              Facilities
            </Text>
            <View style={styles.wrapContent}>
              {facilities.map(item => {
                return (
                  <Tag
                    icon={
                      <Icon
                        name={item.icon}
                        size={12}
                        color={BaseColor.accentColor}
                        solid
                        style={{ marginRight: 5 }}
                      />
                    }
                    chip
                    key={item.id}
                    style={{
                      marginTop: 10,
                      marginRight: 10
                    }}
                  >
                    {item.name}
                  </Tag>
                );
              })}
            </View>
            <Text
              title3
              semibold
              style={{
                paddingHorizontal: 20,
                paddingVertical: 15
              }}
            >
              Featured
            </Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={list}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <PlaceItem
                  grid
                  image={item.image}
                  title={item.title}
                  subtitle={item.subtitle}
                  location={item.location}
                  phone={item.phone}
                  rate={item.rate}
                  status={item.status}
                  rateStatus={item.rateStatus}
                  numReviews={item.numReviews}
                  onPress={() =>
                    navigation.navigate({
                      routeName: "PlaceDetail",
                      key: new Date().toUTCString()
                    })
                  }
                  onPressTag={() => navigation.navigate("Review")}
                  style={{ marginLeft: 20 }}
                />
              )}
            />
            <Text
              title3
              semibold
              style={{
                paddingHorizontal: 20,
                paddingVertical: 15
              }}
            >
              Related
            </Text>
            <FlatList
              contentContainerStyle={{
                marginHorizontal: 20
              }}
              data={relate}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <CardList
                  image={item.image}
                  title={item.title}
                  subtitle={item.subtitle}
                  rate={item.rate}
                  style={{ marginBottom: 20 }}
                  onPress={() =>
                    navigation.navigate({
                      routeName: "PlaceDetail",
                      key: new Date().toUTCString()
                    })
                  }
                  onPressTag={() => navigation.navigate("Review")}
                />
              )}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
