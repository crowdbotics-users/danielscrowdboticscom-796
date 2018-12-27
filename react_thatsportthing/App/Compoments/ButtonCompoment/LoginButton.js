import React, { Component } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import PropTypes from "prop-types";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";
import styles from "../Resource/Styles";

class LoginButton extends Component {
  toggleDrawer(screen) {
    this.props.navigation.navigate(screen);
  }

  render() {
    return <View >
        
    </View>;
  }
}
LoginButton.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.object
};
export default LoginButton;
