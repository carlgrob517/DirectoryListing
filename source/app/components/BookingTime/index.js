import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Text } from "@components";
import styles from "./styles";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class BookingTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markedDates: {},
      checkinTime: "",
      checkoutTime: "",
      isDateTimePickerVisible: false
    };
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    this.hideDateTimePicker();
  };

  render() {
    const { style, checkInTime, checkOutTime, onCancel, onChange } = this.props;
    const { isDateTimePickerVisible } = this.state;
    return (
      <View style={[styles.contentPickDate, style]}>
        <DateTimePicker
          mode="time"
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
        <TouchableOpacity
          style={styles.itemPick}
          onPress={this.showDateTimePicker}
        >
          <Text caption1 light style={{ marginBottom: 5 }}>
            Check In
          </Text>
          <Text headline semibold>
            {checkInTime}
          </Text>
        </TouchableOpacity>
        <View style={styles.linePick} />
        <TouchableOpacity
          style={styles.itemPick}
          onPress={this.showDateTimePicker}
        >
          <Text caption1 light style={{ marginBottom: 5 }}>
            Check Out
          </Text>
          <Text headline semibold>
            {checkOutTime}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

BookingTime.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  checkInTime: PropTypes.string,
  checkOutTime: PropTypes.string,
  onCancel: PropTypes.func,
  onChange: PropTypes.func
};

BookingTime.defaultProps = {
  style: {},
  checkInTime: "09:00",
  checkOutTime: "18:00",
  onCancel: () => {},
  onChange: () => {}
};
