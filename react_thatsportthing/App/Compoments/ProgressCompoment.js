import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  ActivityIndicator
} from "react-native";
import PropTypes from "prop-types";
import Colors from "../Resource/Colors";
import { BallIndicator } from "react-native-indicators";
class ProgressCompoment extends Component {
  render() {
    return (
      <View>
        <Modal
          onRequestClose={() => null}
          visible={this.props.isProgress}
          animationType="fade"
          transparent={true}
        >
          <View
            style={{backgroundColor: Colors.transparent,alignItems: "center",flex:1,justifyContent:'center'}}
          >
            <View
              style={{
                width:120,
                height:120,
                borderRadius: 5,
                backgroundColor: "rgba(0,0,0,0.5)"
              }}
            >
              <Text
                style={{
                  alignItems: "center",justifyContent:'center',marginTop:15,
                  textAlign:'center',
                  fontSize: 16,
                  fontWeight: "200",
                  fontFamily: "OpenSans-SemiBold",
                  color: Colors.white
                }}
              >
                Loading ...
              </Text>
              <BallIndicator color={Colors.white} animationDuration={800}  />
            </View>
          </View>
        </Modal>
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
ProgressCompoment.propTypes = {
  isProgress: PropTypes.bool
};
export default ProgressCompoment;
