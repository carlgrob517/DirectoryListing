import React, { Component } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Tag,
  BookingTime,
  StarRating
} from "@components";
import RangeSlider from "rn-range-slider";
import * as Utils from "@utils";
import styles from "./styles";

export default class Filter extends Component {
  constructor(props) {
    super(props);

    // Temp data define
    this.state = {
      priceBegin: 0,
      priceEnd: 100,
      rate: 5,
      search: "",
      category: [
        { id: "1", name: "Architecture", checked: true },
        { id: "2", name: "Insurance" },
        { id: "3", name: "Beauty" },
        { id: "4", name: "Artists" },
        { id: "5", name: "Outdoors" },
        { id: "6", name: "Clothing" },
        { id: "7", name: "Jewelry" }
      ],
      facilities: [
        { id: "1", icon: "wifi", name: "Free Wifi", checked: true },
        { id: "2", icon: "bath", name: "Shower" },
        { id: "3", icon: "paw", name: "Pet Allowed" },
        { id: "4", icon: "bus", name: "Shuttle Bus" },
        { id: "5", icon: "cart-plus", name: "Supper Market" },
        { id: "6", icon: "clock", name: "Open 24/7" }
      ],
      interio: [
        { id: "1", name: "1", color: "#FD5739", checked: true },
        { id: "2", name: "2", color: "#C31C0D" },
        { id: "3", name: "3", color: "#FF8A65" },
        { id: "4", name: "4", color: "#4A90A4" },
        { id: "5", name: "5", color: "#212121" }
      ],
      location: [],
      area: [],
      scrollEnabled: true
    };
  }

  /**
   * @description export text location
   * @author Passion UI <passionui.com>
   * @date 2020-02-01
   * @param {*} select
   */
  renderTextFromList(list) {
    let listString = [];
    listString = list.map(item => {
      return item.location;
    });
    return listString.join(",");
  }

  /**
   * @description Called when filtering option > location
   * @author Passion UI <passionui.com>
   * @date 2020-02-01
   * @param {*} select
   */
  onNavigateLocation() {
    const { navigation } = this.props;
    const { location } = this.state;
    navigation.navigate("ChooseLocation", {
      onApply: data => {
        this.setState({
          location: data
        });
      },
      selected: location
    });
  }

  /**
   * @description Called when filtering option > area
   * @author Passion UI <passionui.com>
   * @date 2020-02-01
   * @param {*} select
   */
  onNavigateArea() {
    const { navigation } = this.props;
    const { area } = this.state;
    navigation.navigate("ChooseLocation", {
      onApply: data => {
        this.setState({
          area: data
        });
      },
      selected: area
    });
  }
  /**
   * @description Called when filtering option > category
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   * @param {*} select
   */
  onSelectCategory(select) {
    this.setState({
      category: this.state.category.map(item => {
        if (item.name == select.name) {
          return {
            ...item,
            checked: true
          };
        } else {
          return {
            ...item,
            checked: false
          };
        }
      })
    });
  }

  /**
   * @description Called when filtering option > Facilities
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   * @param {*} select
   */
  onSelectFacilities(select) {
    this.setState({
      facilities: this.state.facilities.map(item => {
        if (item.name == select.name) {
          return {
            ...item,
            checked: true
          };
        } else {
          return {
            ...item,
            checked: false
          };
        }
      })
    });
  }

  /**
   * @description Called when filtering option > Interio
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   * @param {*} select
   */
  onSelectInterio(select) {
    this.setState({
      interio: this.state.interio.map(item => {
        if (item.name == select.name) {
          return {
            ...item,
            checked: true
          };
        } else {
          return {
            ...item,
            checked: false
          };
        }
      })
    });
  }

  render() {
    const { navigation } = this.props;
    const {
      search,
      category,
      facilities,
      interio,
      priceBegin,
      priceEnd,
      rate,
      scrollEnabled,
      location,
      area
    } = this.state;
    return (
      <SafeAreaView
        style={[
          BaseStyle.safeAreaView,
          { backgroundColor: BaseColor.whiteColor }
        ]}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Filtering"
          renderLeft={() => {
            return (
              <Icon name="times" size={20} color={BaseColor.primaryColor} />
            );
          }}
          renderRight={() => {
            return (
              <Text headline primaryColor numberOfLines={1}>
                Apply
              </Text>
            );
          }}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => navigation.goBack()}
        />
        <ScrollView
          scrollEnabled={scrollEnabled}
          onContentSizeChange={(contentWidth, contentHeight) =>
            this.setState({
              scrollEnabled: Utils.scrollEnabled(contentWidth, contentHeight)
            })
          }
        >
          <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20
              }}
            >
              <TextInput
                style={BaseStyle.textInput}
                onChangeText={text => this.setState({ search: text })}
                autoCorrect={false}
                placeholder="Search..."
                placeholderTextColor={BaseColor.grayColor}
                value={search}
                selectionColor={BaseColor.primaryColor}
                onSubmitEditing={() => {}}
              />
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    search: ""
                  });
                }}
                style={styles.btnClearSearch}
              >
                <Icon name="times" size={18} color={BaseColor.grayColor} />
              </TouchableOpacity>
            </View>
            <Text headline semibold>
              CATEGORY
            </Text>
            <View style={styles.wrapContent}>
              {category.map(item => {
                return (
                  <Tag
                    primary={item.checked}
                    outline={!item.checked}
                    key={item.id}
                    style={{
                      marginTop: 10,
                      marginRight: 10
                    }}
                    onPress={() => this.onSelectCategory(item)}
                  >
                    {item.name}
                  </Tag>
                );
              })}
            </View>
            <Text headline semibold style={{ marginTop: 20 }}>
              FACILITIES
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
            <TouchableOpacity
              style={styles.locationContent}
              onPress={() => this.onNavigateLocation()}
            >
              <View>
                <Text headline semibold>
                  LOCATION
                </Text>
                {location.length > 0 ? (
                  <Text footnote primaryColor style={{ marginTop: 5 }}>
                    {this.renderTextFromList(location)}
                  </Text>
                ) : (
                  <Text footnote grayColor style={{ marginTop: 5 }}>
                    Please Select
                  </Text>
                )}
              </View>
              <Icon name="angle-right" size={18} color={BaseColor.grayColor} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.locationContent}
              onPress={() => this.onNavigateArea()}
            >
              <View>
                <Text headline semibold>
                  AREA
                </Text>
                {area.length > 0 ? (
                  <Text footnote primaryColor style={{ marginTop: 5 }}>
                    {this.renderTextFromList(area)}
                  </Text>
                ) : (
                  <Text footnote grayColor style={{ marginTop: 5 }}>
                    Please Select
                  </Text>
                )}
              </View>
              <Icon name="angle-right" size={18} color={BaseColor.grayColor} />
            </TouchableOpacity>
            <Text headline semibold style={{ marginTop: 20 }}>
              PRICE
            </Text>
            <View style={styles.contentRange}>
              <Text caption1 grayColor>
                $0
              </Text>
              <Text caption1 grayColor>
                $100
              </Text>
            </View>
            <RangeSlider
              style={{
                width: "100%",
                height: 40
              }}
              thumbRadius={12}
              lineWidth={5}
              gravity={"center"}
              labelStyle="none"
              min={0}
              max={100}
              step={1}
              selectionColor={BaseColor.primaryColor}
              blankColor={BaseColor.textSecondaryColor}
              onValueChanged={(low, high, fromUser) => {
                this.setState({
                  priceBegin: low,
                  priceEnd: high
                });
              }}
              onTouchStart={() => {
                this.setState({
                  scrollEnabled: false
                });
              }}
              onTouchEnd={() => {
                this.setState({
                  scrollEnabled: true
                });
              }}
            />
            <View style={styles.contentResultRange}>
              <Text caption1>AVG Price</Text>
              <Text caption1>
                ${priceBegin} - ${priceEnd}
              </Text>
            </View>
          </View>
          <Text
            headline
            semibold
            style={{
              paddingHorizontal: 20,
              marginTop: 20
            }}
          >
            BUSINESS COLOR
          </Text>
          <FlatList
            contentContainerStyle={{ paddingTop: 10 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={interio}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[styles.circleIcon, { backgroundColor: item.color }]}
                onPress={() => this.onSelectInterio(item)}
              >
                {item.checked && (
                  <Icon name="check" size={16} color={BaseColor.whiteColor} />
                )}
              </TouchableOpacity>
            )}
          />
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <Text headline semibold style={{ marginBottom: 10 }}>
              OPEN TIME
            </Text>
            <BookingTime />
          </View>
          <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
            <Text headline semibold>
              RATING
            </Text>
            <View style={{ width: 160, marginTop: 10 }}>
              <StarRating
                starSize={26}
                maxStars={5}
                rating={rate}
                selectedStar={rate => this.setState({ rate })}
                fullStarColor={BaseColor.yellowColor}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
