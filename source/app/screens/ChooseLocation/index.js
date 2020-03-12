import React, { Component } from "react";
import { View, FlatList, TextInput, TouchableOpacity } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Button } from "@components";
import styles from "./styles";

export default class ChooseLocation extends Component {
  constructor(props) {
    super(props);

    // Temp data define
    this.state = {
      country: "",
      location: [
        { id: 1, location: "Alabama" },
        { id: 2, location: "Columbia" },
        { id: 3, location: "Arkansas" },
        { id: 4, location: "Missouri" },
        { id: 5, location: "Texas" },
        { id: 6, location: "Utah" },
        { id: 7, location: "Washington" },
        { id: 8, location: "West Virginia" }
      ],
      loading: false
    };
  }

  /**
   * @description make selected old data
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {object} select
   */
  componentDidMount() {
    const { navigation } = this.props;
    const selectedLocation = navigation.getParam("selected");
    if (selectedLocation.length > 0) {
      this.setState({
        location: this.state.location.map(item => {
          return {
            ...item,
            checked: selectedLocation.some(check => check.id == item.id)
          };
        })
      });
    }
  }
  /**
   * @description Called when apply
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {object} select
   */
  onApply() {
    const { navigation } = this.props;
    const { location } = this.state;
    const onSave = navigation.getParam("onApply");
    this.setState(
      {
        loading: true
      },
      () => {
        setTimeout(() => {
          onSave(location.filter(item => item.checked));
          navigation.goBack();
        }, 500);
      }
    );
  }

  /**
   * @description Called when setting location is selected
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {object} select
   */
  onChange(select) {
    this.setState({
      location: this.state.location.map(item => {
        if (item.location == select.location) {
          return {
            ...item,
            checked: !item.checked
          };
        }
        return item;
      })
    });
  }

  render() {
    const { navigation } = this.props;
    let { location, loading } = this.state;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Location"
          renderLeft={() => {
            return (
              <Icon name="times" size={20} color={BaseColor.primaryColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.contain}>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={text => this.setState({ country: text })}
            autoCorrect={false}
            placeholder="Search..."
            placeholderTextColor={BaseColor.grayColor}
            value={this.state.country}
            selectionColor={BaseColor.primaryColor}
          />
          <View style={{ flex: 1, paddingTop: 10 }}>
            <FlatList
              data={location}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => this.onChange(item)}
                >
                  <Text
                    body1
                    style={
                      item.checked
                        ? {
                            color: BaseColor.primaryColor
                          }
                        : {}
                    }
                  >
                    {item.location}
                  </Text>
                  {item.checked && (
                    <Icon
                      name="check"
                      size={14}
                      color={BaseColor.primaryColor}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
          <Button full loading={loading} onPress={() => this.onApply()}>
            Apply
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
