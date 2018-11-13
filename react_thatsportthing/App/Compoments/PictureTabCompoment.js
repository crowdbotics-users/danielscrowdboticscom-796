import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import Colors from "../Resource/Colors";

class PictureTabCompoment extends Component {
  render() {
    return (
      <View>
        <View
          style={
            this.props.tabActive
              ? picturetabstyles.activeTab
              : picturetabstyles.InactiveTab
          }
        >
          <Text
            style={
              this.props.tabActive
                ? picturetabstyles.activeTabText
                : picturetabstyles.InactiveTabText
            }
          >
            {this.props.tabTitle}
          </Text>
        </View>
      </View>
    );
  }
}

const picturetabstyles = StyleSheet.create({
  activeTab: {
    backgroundColor: Colors.bgHeader,
    // width: Dimensions.get("screen").width / 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 5
  },
  activeTabText: {
    padding: 5,
    color: Colors.white,
    fontSize: 14,
    fontFamily: "OpenSans-SemiBold"
  },
  InactiveTab: {
    backgroundColor: Colors.navBg,
    // width: Dimensions.get("screen").width / 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 5
  },
  InactiveTabText: {
    padding: 5,
    color: Colors.white,
    fontSize: 14,
    fontFamily: "OpenSans-SemiBold"
  }
});
PictureTabCompoment.propTypes = {
  tabActive: PropTypes.bool,
  tabTitle: PropTypes.string
};
export default PictureTabCompoment;
