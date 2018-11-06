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

class TabCompoment extends Component {
  render() {
    return (
      <View>
        <View style={this.props.tabActive?customstyles.activeTab:customstyles.InactiveTab}>
          <Text style={this.props.tabActive?customstyles.activeTabText:customstyles.InactiveTabText}>{this.props.tabTitle}</Text>
        </View>
      </View>
    );
  }
}

const customstyles = StyleSheet.create({
  activeTab: {
    backgroundColor: Colors.bgHeader,
    width: Dimensions.get("screen").width / 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5
  },
  activeTabText: {
    padding: 10,
    color: Colors.white,
    fontSize: 15,
    fontFamily: "OpenSans-SemiBold"
  },
  InactiveTab: {
    backgroundColor: Colors.white,
    width: Dimensions.get("screen").width / 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5
  },
  InactiveTabText: {
    padding: 10,
    color: Colors.bgHeader,
    fontSize: 15,
    fontFamily: "OpenSans-SemiBold"
  }
});
TabCompoment.propTypes = {
  tabActive: PropTypes.bool,
  tabTitle: PropTypes.string
};
export default TabCompoment;
