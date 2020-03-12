import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import Text from "@components/Text";
import styles from "./styles";

export default class Tag extends Component {
  render() {
    const {
      style,
      textStyle,
      icon,
      primary,
      primaryIcon,
      outline,
      outlineIcon,
      outlineSecondary,
      outlineSecondaryIcon,
      small,
      light,
      gray,
      chip,
      status,
      rate,
      rateSmall,
      sale,
      children,
      ...rest
    } = this.props;

    return (
      <TouchableOpacity
        {...rest}
        style={StyleSheet.flatten([
          styles.default,
          primary && styles.primary,
          primaryIcon && styles.primary,
          outline && styles.outline,
          outlineIcon && styles.outline,
          outlineSecondary && styles.outlineSecondary,
          outlineSecondaryIcon && styles.outlineSecondary,
          small && styles.small,
          light && styles.light,
          gray && styles.gray,
          chip && styles.chip,
          status && styles.status,
          rate && styles.rate,
          rateSmall && styles.rateSmall,
          sale && styles.sale,
          style
        ])}
        activeOpacity={0.9}
      >
        {icon ? icon : null}
        <Text
          style={StyleSheet.flatten([
            primary && styles.textPrimary,
            primaryIcon && styles.textPrimary,
            outline && styles.textOutline,
            outlineIcon && styles.textOutline,
            outlineSecondary && styles.textOutlineSecondary,
            outlineSecondaryIcon && styles.textOutlineSecondary,
            small && styles.textSmall,
            light && styles.textLight,
            gray && styles.textGray,
            chip && styles.textChip,
            status && styles.textStatus,
            rate && styles.textRate,
            rateSmall && styles.textRateSmall,
            sale && styles.textSale,
            textStyle
          ])}
          numberOfLines={1}
        >
          {children || "Tag"}
        </Text>
      </TouchableOpacity>
    );
  }
}

Tag.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.node,
  primary: PropTypes.bool,
  primaryIcon: PropTypes.bool,
  outline: PropTypes.bool,
  outlineIcon: PropTypes.bool,
  outlineSecondary: PropTypes.bool,
  outlineSecondaryIcon: PropTypes.bool,
  small: PropTypes.bool,
  light: PropTypes.bool,
  gray: PropTypes.bool,
  chip: PropTypes.bool,
  rate: PropTypes.bool,
  rateSmall: PropTypes.bool,
  status: PropTypes.bool,
  sale: PropTypes.bool
};

Tag.defaultProps = {
  style: {},
  textStyle: {},
  icon: null,
  primary: false,
  primaryIcon: false,
  outline: false,
  outlineIcon: false,
  outlineSecondary: false,
  outlineSecondaryIcon: false,
  small: false,
  light: false,
  gray: false,
  chip: false,
  status: false,
  rate: false,
  rateSmall: false,
  sale: false
};
