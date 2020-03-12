import React, { Component } from "react";
import {
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text } from "@components";
import styles from "./styles";

// Load sample language data list
import { LanguageData } from "@data";

export default class ChangeLanguage extends Component {
  constructor(props) {
    super(props);

    // Temp data define
    this.state = {
      country: "",
      language: LanguageData,
      loading: false
    };
  }

  /**
   * @description Called when setting language is selected
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {object} select
   */
  onChange(select) {
    this.setState({
      language: this.state.language.map(item => {
        if (item.language == select.language) {
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
    let { language } = this.state;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Change Language"
          renderLeft={() => {
            return (
              <Icon
                name="arrow-left"
                size={20}
                color={BaseColor.primaryColor}
              />
            );
          }}
          renderRight={() => {
            if (this.state.loading) {
              return (
                <ActivityIndicator
                  size="small"
                  color={BaseColor.primaryColor}
                />
              );
            } else {
              return (
                <Text headline primaryColor>
                  Save
                </Text>
              );
            }
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {
            this.setState(
              {
                loading: true
              },
              () => {
                setTimeout(() => {
                  navigation.goBack();
                }, 500);
              }
            );
          }}
        />
        <View style={styles.contain}>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={text => this.setState({ country: text })}
            autoCorrect={false}
            placeholder="Search Country"
            placeholderTextColor={BaseColor.grayColor}
            value={this.state.country}
            selectionColor={BaseColor.primaryColor}
          />
          <View style={{ width: "100%", height: "100%" }}>
            <FlatList
              data={language}
              keyExtractor={(item, index) => item.id}
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
                    {item.language}
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
        </View>
      </SafeAreaView>
    );
  }
}
