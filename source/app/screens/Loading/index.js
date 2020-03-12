import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { ActivityIndicator, View } from "react-native";
import { bindActionCreators } from "redux";
import { Images, BaseColor, BaseSetting } from "@config";
import SplashScreen from "react-native-splash-screen";
import { Image, Text } from "@components";
import styles from "./styles";

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    SplashScreen.hide();
    setTimeout(() => {
      this.props.navigation.navigate("Main");
    }, 500);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={Images.logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text title1 style={{ marginTop: 10 }}>
            Listar
          </Text>
          <Text headline primaryColor style={{ marginTop: 10 }}>
            LIST DIRECTORY
          </Text>
        </View>
        <ActivityIndicator
          size="large"
          color={BaseColor.textPrimaryColor}
          style={{
            position: "absolute",
            top: 260,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center"
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
