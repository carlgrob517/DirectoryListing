import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Text, Icon, StarRating, Tag } from "@components";
import { BaseColor } from "@config";
import PropTypes from "prop-types";
import styles from "./styles";

export default class PlaceItem extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Display place item as block
   */
  renderBlock() {
    const {
      style,
      image,
      title,
      subtitle,
      location,
      phone,
      rate,
      status,
      rateStatus,
      numReviews,
      onPress,
      onPressTag
    } = this.props;
    return (
      <View style={style}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.blockImage} />
          <Tag status style={styles.tagStatus}>
            {status}
          </Tag>
          <Icon
            name="heart"
            color={BaseColor.whiteColor}
            size={24}
            style={styles.iconLike}
          />
          <View style={styles.blockContentRate}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Tag rate onPress={onPressTag}>
                {rate}
              </Tag>
              <View style={{ marginLeft: 10 }}>
                <Text caption1 whiteColor semibold style={{ marginBottom: 5 }}>
                  {rateStatus}
                </Text>
                <StarRating
                  disabled={true}
                  starSize={10}
                  maxStars={5}
                  rating={rate}
                  selectedStar={rating => {}}
                  fullStarColor={BaseColor.yellowColor}
                />
              </View>
            </View>
            <Text caption1 semibold whiteColor style={{ marginTop: 5 }}>
              {numReviews} Reviews
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 5,
            paddingBottom: 15
          }}
        >
          <Text headline semibold grayColor>
            {subtitle}
          </Text>
          <Text title2 semibold style={{ marginTop: 5 }}>
            {title}
          </Text>
          <View style={styles.blockLineMap}>
            <Icon
              name="map-marker-alt"
              color={BaseColor.lightPrimaryColor}
              size={12}
              style={{ marginRight: 3 }}
            />
            <Text caption1 grayColor>
              {location}
            </Text>
          </View>
          <View style={styles.blockLinePhone}>
            <Icon
              name="phone"
              color={BaseColor.lightPrimaryColor}
              size={12}
              style={{ marginRight: 3 }}
            />
            <Text caption1 grayColor>
              {phone}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  /**
   * Display place item as list
   */
  renderList() {
    const {
      style,
      image,
      title,
      subtitle,
      location,
      phone,
      rate,
      status,
      onPress,
      onPressTag
    } = this.props;
    return (
      <View style={[styles.listContent, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.listImage} />
          <Tag status style={styles.listTagStatus}>
            {status}
          </Tag>
        </TouchableOpacity>
        <View style={styles.listContentRight}>
          <Text headline semibold grayColor>
            {subtitle}
          </Text>
          <Text title2 semibold style={{ marginTop: 5 }}>
            {title}
          </Text>
          <View style={styles.lineRate}>
            <Tag onPress={onPressTag} rateSmall style={{ marginRight: 5 }}>
              {rate}
            </Tag>
            <StarRating
              disabled={true}
              starSize={10}
              maxStars={5}
              rating={rate}
              selectedStar={rating => {}}
              fullStarColor={BaseColor.yellowColor}
            />
          </View>
          <Text caption1 grayColor style={{ marginTop: 10 }}>
            {location}
          </Text>
          <Text caption1 grayColor style={{ marginTop: 5 }}>
            {phone}
          </Text>
          <Icon
            name="heart"
            color={BaseColor.lightPrimaryColor}
            size={18}
            style={styles.iconListLike}
          />
        </View>
      </View>
    );
  }

  /**
   * Display place item as grid
   */
  renderGrid() {
    const {
      style,
      image,
      title,
      subtitle,
      location,
      rate,
      status,
      onPress,
      onPressTag
    } = this.props;
    return (
      <View style={[styles.girdContent, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.girdImage} />
          <Tag status style={styles.tagGirdStatus}>
            {status}
          </Tag>
          <Icon
            name="heart"
            color={BaseColor.whiteColor}
            size={18}
            style={styles.iconGirdLike}
          />
        </TouchableOpacity>
        <Text footnote semibold grayColor style={{ marginTop: 5 }}>
          {subtitle}
        </Text>
        <Text subhead semibold style={{ marginTop: 5 }}>
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5
          }}
        >
          <Tag onPress={onPressTag} rateSmall style={{ marginRight: 5 }}>
            {rate}
          </Tag>
          <StarRating
            disabled={true}
            starSize={10}
            maxStars={5}
            rating={rate}
            selectedStar={rating => {}}
            fullStarColor={BaseColor.yellowColor}
          />
        </View>
        <Text caption2 grayColor style={{ marginTop: 10 }} numberOfLines={1}>
          {location}
        </Text>
      </View>
    );
  }

  render() {
    let { block, grid } = this.props;
    if (grid) return this.renderGrid();
    else if (block) return this.renderBlock();
    else return this.renderList();
  }
}

PlaceItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  list: PropTypes.bool,
  block: PropTypes.bool,
  grid: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  location: PropTypes.string,
  phone: PropTypes.string,
  rate: PropTypes.number,
  status: PropTypes.string,
  rateStatus: PropTypes.string,
  numReviews: PropTypes.number,
  onPress: PropTypes.func,
  onPressTag: PropTypes.func
};

PlaceItem.defaultProps = {
  style: {},
  image: "",
  list: true,
  block: false,
  grid: false,
  title: "",
  subtitle: "",
  location: "",
  phone: "",
  rate: 4.5,
  status: "",
  rateStatus: "",
  numReviews: 99,
  onPress: () => {},
  onPressTag: () => {}
};
