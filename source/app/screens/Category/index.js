import React, { Component } from "react";
import { FlatList, RefreshControl, View, TextInput } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  CategoryFull,
  CategoryIcon
} from "@components";
import * as Utils from "@utils";
import { CategoryData } from "@data";
import styles from "./styles";

export default class Category extends Component {
  constructor(props) {
    super(props);

    // Define list Category screens
    this.state = {
      refreshing: false,
      search: "",
      modeView: "full",
      category: CategoryData
    };
  }

  onChangeView() {
    let { modeView } = this.state;
    Utils.enableExperimental();
    switch (modeView) {
      case "full":
        this.setState({
          modeView: "icon"
        });
        break;
      case "icon":
        this.setState({
          modeView: "full"
        });
        break;
    }
  }

  renderItem(item, index) {
    const { navigation } = this.props;
    const { modeView } = this.state;
    switch (modeView) {
      case "icon":
        return (
          <CategoryIcon
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            onPress={() => navigation.navigate(item.screen)}
            style={{
              marginBottom: 10,
              borderBottomWidth: 0.5,
              paddingBottom: 10,
              borderColor: BaseColor.textSecondaryColor
            }}
          />
        );
      case "full":
        return (
          <CategoryFull
            image={item.image}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            onPress={() => navigation.navigate(item.screen)}
            style={{
              marginBottom: 10
            }}
          />
        );
      default:
        break;
    }
  }
  render() {
    const { navigation } = this.props;
    let { search, category, modeView } = this.state;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Category"
          renderRight={() => {
            return (
              <Icon
                name={modeView == "full" ? "th-large" : "th-list"}
                size={20}
                color={BaseColor.grayColor}
              />
            );
          }}
          onPressRight={() => this.onChangeView()}
        />
        <View style={{ padding: 20 }}>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={text => this.setState({ search: text })}
            autoCorrect={false}
            placeholder="Search"
            placeholderTextColor={BaseColor.grayColor}
            value={search}
            selectionColor={BaseColor.primaryColor}
            onSubmitEditing={() => {}}
          />
        </View>
        <FlatList
          contentContainerStyle={{
            marginHorizontal: 20
          }}
          refreshControl={
            <RefreshControl
              colors={[BaseColor.primaryColor]}
              tintColor={BaseColor.primaryColor}
              refreshing={this.state.refreshing}
              onRefresh={() => {}}
            />
          }
          data={category}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => this.renderItem(item, index)}
        />
      </SafeAreaView>
    );
  }
}
