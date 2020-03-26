import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { View, ScrollView, TouchableOpacity, TextInput, ToastAndroid } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Button } from "@components";
import styles from "./styles";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "Aa@aa.com",
      password: "aa",
      loading: false,
      success: {
        id: true,
        password: true
      }
    };
  }

  onLogin() {
    const { id, password, success } = this.state;
    const { navigation } = this.props;
    const { dispatch } = this.props;

    if (id == "" || password == "") {
      this.setState({
        success: {
          ...success,
          id: false,
          password: false
        }
      });
    } else {
      this.setState(
        {
          loading: true
        },
        () => {
          let credential = {            
            password: password,
            email:id
          }      
                             
          this.props.actions.authentication("login", credential, response => {            
            console.log("oks");
            console.log(response.response.id);
            if ( response.success ) {
              // this.setState({
              //   id:response.response.first_name
              // });
              navigation.navigate("Home");
            } else {

              this.setState({
                loading: false
              });
              ToastAndroid.show('Failed', ToastAndroid.SHORT);


            }
          });

        }
      );
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Sign In"
          renderLeft={() => {
            return (
              <Icon
                name="arrow-left"
                size={20}
                color={BaseColor.primaryColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <ScrollView>
          <View style={styles.contain}>
            <TextInput
              style={[BaseStyle.textInput, { marginTop: 65 }]}
              onChangeText={text => this.setState({ id: text })}
              onFocus={() => {
                this.setState({
                  success: {
                    ...this.state.success,
                    id: true
                  }
                });
              }}
              autoCorrect={false}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor={
                this.state.success.id
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }
              value={this.state.id}
              selectionColor={BaseColor.primaryColor}
            />
            <TextInput
              style={[BaseStyle.textInput, { marginTop: 10 }]}
              onChangeText={text => this.setState({ password: text })}
              onFocus={() => {
                this.setState({
                  success: {
                    ...this.state.success,
                    password: true
                  }
                });
              }}
              autoCorrect={false}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={
                this.state.success.password
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }
              value={this.state.password}
              selectionColor={BaseColor.primaryColor}
            />

            
            <View style={{ width: "100%" }}>
              <Button
                full
                loading={this.state.loading}
                style={{ marginTop: 20 }}
                onPress={() => {
                  this.onLogin();
                }}
              >
                Sign In
              </Button>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text body1 grayColor style={{ marginTop: 25 }}>
                Create a new user 
                {/* Forgot your password? */}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
