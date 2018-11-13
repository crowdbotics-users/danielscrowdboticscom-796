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
import tabstyles from "../Resource/tabstyles";

class ProfileTabCompoment extends Component {
  render() {
    return (
      <View>
        <View style={this.props.tabActive?tabstyles.activeTab:tabstyles.InactiveTab}>
          <Text style={this.props.tabActive?tabstyles.activeTabText:tabstyles.InactiveTabText}>{this.props.tabTitle}</Text>
        </View>
      </View>
    );
  }
}


ProfileTabCompoment.propTypes = {
  tabActive: PropTypes.bool,
  tabTitle: PropTypes.string
};
export default ProfileTabCompoment;
