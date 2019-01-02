import React, { PureComponent } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  Modal,
  Platform,
  Button
} from "react-native";
import PropTypes from "prop-types";
import Colors from "../Resource/Colors";
import { NavigationActions, StackActions } from "react-navigation";

class TryAgainComponent extends PureComponent {
  doFinish(screen) {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: screen })]
    });
    this.props.navigation.dispatch(resetAction);
  }
  render() {
    return (
      <View>
        <Modal
          onRequestClose={() => null}
          visible={this.props.shown}
          animationType="fade"
          transparent={true}
        >
          <View
            style={{
              backgroundColor: Colors.transparent,
              alignItems: "center",
              flex: 1,
              justifyContent: "center"
            }}
          >
            <View
              style={{
                width: "85%",
                height: 150,
                borderRadius: 5,
                backgroundColor: Colors.white
              }}
            >
              <Text
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 15,
                  textAlign: "center",
                  fontSize: 16,

                  fontFamily: "OpenSans-Bold",
                  color: Colors.bgHeader
                }}
              >
                Authentication.!!
              </Text>
              <Text
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  marginStart: 10,
                  marginEnd: 10,
                  textAlign: "center",
                  fontSize: 14,
                  fontFamily: "OpenSans-SemiBold",
                  color: Colors.colorEdittext
                }}
              >
                Authentication failed,Please try to Login Again.
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 5,
                  marginBottom: 5
                }}
              >
                <TouchableOpacity onPress={()=>this.doFinish("LoginType")}>
                  <View
                    style={{
                      backgroundColor: Colors.white,
                      borderRadius: 5,
                      borderColor: Colors.bgHeader,
                      borderWidth: 1
                    }}
                  >
                    <Text
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: 100,
                        textAlign: "center",
                        fontSize: 14,
                        padding: 8,
                        fontFamily: "OpenSans-Bold",
                        color: Colors.bgHeader
                      }}
                    >
                      Login Again
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
TryAgainComponent.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  shown: PropTypes.bool,
  navigation: PropTypes.object
};
export default TryAgainComponent;
