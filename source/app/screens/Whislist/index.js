import React, { Component } from "react";
import { FlatList, RefreshControl } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, CardList } from "@components";
import { WhislistData } from "@data";
import styles from "./styles";

export default class Whislist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      whislist: WhislistData
    };
  }

  render() {
    const { navigation } = this.props;
    let { whislist } = this.state;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header title="Whislist" />
        <FlatList
          contentContainerStyle={{
            margin: 20
          }}
          refreshControl={
            <RefreshControl
              colors={[BaseColor.primaryColor]}
              tintColor={BaseColor.primaryColor}
              refreshing={this.state.refreshing}
              onRefresh={() => {}}
            />
          }
          data={whislist}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => (
            <CardList
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              rate={item.rate}
              style={{ marginBottom: 20 }}
              onPress={() => navigation.navigate("PlaceDetail")}
            />
          )}
        />
      </SafeAreaView>
    );
  }
}
