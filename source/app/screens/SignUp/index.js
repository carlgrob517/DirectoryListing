import React, { Component } from "react";
import { View, ScrollView, TextInput } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Button } from "@components";
import styles from "./styles";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      password:"",
      loading: false,
      success: {
        name: true,
        email: true,
        address: true,
        password:true,
      }
    };
  }

  onSignUp() {
    const { navigation } = this.props;
    let { name, email, address, password, success } = this.state;
    if (name == "" || email == "" || password == "") {      
      
      this.setState({
        success: {
          ...success,
          name: name != "" ? true : false,
          email: email != "" ? true : false,
          password: password != "" ? true : false
        }
      });

    } else {
      this.setState(
        {
          loading: true
        },
        () => {
          
          let credential = {   
            name:this.state.name,
            password: this.state.password,
            email:this.state.email
          }      
                             
          this.props.actions.authentication("register", credential, response => {                        
            console.log(response.response.id);
            if ( response.success ) {
              this.setState({
                loading: false
              });
              navigation.navigate("SignIn");
            } else {
              this.setState({
                loading: false
              });
            }
          });



        }
      );
    }
  }

  render() {
    const { navigation } = this.props;
    let { loading, name, email, password, success } = this.state;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Sign Up"
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
              onChangeText={text => this.setState({ name: text })}
              autoCorrect={false}
              placeholder="Name"
              placeholderTextColor={
                success.name ? BaseColor.grayColor : BaseColor.primaryColor
              }
              value={name}
            />
            <TextInput
              style={[BaseStyle.textInput, { marginTop: 10 }]}
              onChangeText={text => this.setState({ email: text })}
              autoCorrect={false}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor={
                success.email ? BaseColor.grayColor : BaseColor.primaryColor
              }
              value={email}
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
              placeholderTextColor={
                success.password
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }                          
              value={password}
              secureTextEntry={true}
            />

            <View style={{ width: "100%" }}>
              <Button
                full
                style={{ marginTop: 20 }}
                loading={loading}
                onPress={() => this.onSignUp()}
              >
                Sign Up
              </Button>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

