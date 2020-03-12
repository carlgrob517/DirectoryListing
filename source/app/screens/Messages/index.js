import React, { Component } from "react";
import { View } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Header, SafeAreaView, Icon } from "@components";
import { GiftedChat } from "react-native-gifted-chat";
import styles from "./styles";

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: Images.avata3
          }
        },
        {
          _id: 3,
          text: "Where are you?",
          createdAt: new Date(),
          user: {
            _id: 1,
            name: "Developer"
          }
        },
        {
          _id: 2,
          text: "Yes!",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: Images.avata3
          },
          sent: true,
          received: true
        },
        {
          _id: 1,
          text: "Are you building a chat app?",
          createdAt: new Date(),
          user: {
            _id: 1,
            name: "Developer"
          }
        }
      ]
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Messages"
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
        <View style={{ flex: 1 }}>
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
