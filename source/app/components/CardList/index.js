import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { BaseColor } from "@config";
import { Image, Text, StarRating, Tag } from "@components";
import styles from "./styles";
import PropTypes from "prop-types";

export default class CardList extends Component {
  render() {
    const {
      style,
      image,
      title,
      subtitle,
      rate,
      onPress,
      onPressTag
    } = this.props;
    return (
      <TouchableOpacity
        style={[styles.contain, style]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Image source={image} style={styles.image} />
        <View style={{ paddingHorizontal: 10 }}>
          <Text headline semibold>
            {title}
          </Text>
          <Text footnote semibold grayColor style={{ marginTop: 5 }}>
            {subtitle}
          </Text>
          <View style={styles.contentRate}>
            <Tag onPress={onPressTag} rateSmall style={{ marginRight: 5 }}>
              {rate}
            </Tag>
            <StarRating
              disabled={true}
              starSize={10}
              maxStars={5}
              rating={rate}
              selectedStar={onPressTag}
              fullStarColor={BaseColor.yellowColor}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

CardList.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  rate: PropTypes.number,
  onPress: PropTypes.func,
  onPressTag: PropTypes.func
};

CardList.defaultProps = {
  style: {},
  image: "",
  title: "",
  subtitle: "",
  rate: 4.5,
  onPress: () => {},
  onPressTag: () => {}
};
