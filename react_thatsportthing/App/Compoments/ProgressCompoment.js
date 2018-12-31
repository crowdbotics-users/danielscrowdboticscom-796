import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Colors from "../Resource/Colors";
import { BallIndicator } from "react-native-indicators";
import Spinner from "react-native-loading-spinner-overlay";

class ProgressCompoment extends Component {
  render() {
    return (
      <View>
        <Spinner
          visible={this.props.isProgress}
          textContent={"Loading ..."}
          animation="fade"
          customIndicator={<BallIndicator color={Colors.white} />}
          size="large"
          textStyle={styles.spinnerTextStyle}
        />
        {/* <Modal
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
        </Modal> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
    fontFamily: "OpenSans-SemiBold"
  }
});

ProgressCompoment.propTypes = {
  isProgress: PropTypes.bool
};
export default ProgressCompoment;
