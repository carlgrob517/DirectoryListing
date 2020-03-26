import React, { Component } from "react";
import { FlatList, RefreshControl, View, TextInput } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { CategoryAction } from "@actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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
import api from "../../config/api";

 class Category extends Component {
  constructor(props) {
    super(props);

    // Define list Category screens
    this.state = {
      refreshing: false,
      search: "",
      modeView: "icon",
      category: CategoryData
    };


    // initialize category part
    let credential = {      
      id: 'aHVycnlyMTI=',      
    }
    this.props.actions.categories(credential, response => {            
      console.log("categories");      
      if ( response.success ) {
        this.setState(
          { category: response.data.categories }
        );        
        console.log(response.categories);
      } else {
        this.setState({
          loading: false
        });
      }
    });

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
            image={api.URL + item.image}
            title={item.name}
            subtitle={item.subtitle}
            onPress={() => navigation.navigate("Place")}
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
          <CategoryIcon            
            image={api.URL + item.image}
            title={item.name}
            subtitle={item.subtitle}
            onPress={() => navigation.navigate("Place")}
            style={{
              marginBottom: 10,
              borderBottomWidth: 0.5,
              paddingBottom: 10,
              borderColor: BaseColor.textSecondaryColor
            }}
          />
        );

        // return (
        //   <CategoryFull
        //     image={api.URL + item.image}            
        //     title={item.name}
        //     subtitle={item.subtitle}
        //     onPress={() => navigation.navigate(item.screen)}
        //     style={{
        //       marginBottom: 10
        //     }}
        //   />
        // );
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
            // return (
            //   <Icon
            //     name={modeView == "full" ? "th-large" : "th-list"}
            //     size={20}
            //     color={BaseColor.grayColor}
            //   />
            // );
          }}
          onPressRight={() => this.onChangeView()}
        />
        <View style={{ padding: 20 }}>
          {/* <TextInput
            style={BaseStyle.textInput}
            onChangeText={text => this.setState({ search: text })}
            autoCorrect={false}
            placeholder="Search"
            placeholderTextColor={BaseColor.grayColor}
            value={search}
            selectionColor={BaseColor.primaryColor}
            onSubmitEditing={() => {}}
          /> */}
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


const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(CategoryAction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);

