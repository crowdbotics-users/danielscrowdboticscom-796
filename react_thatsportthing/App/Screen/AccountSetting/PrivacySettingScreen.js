import React, { PureComponent } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import Icons from "../../Resource/Icons";
import styles from "../../Resource/Styles";
import Colors from "../../Resource/Colors";
import HeaderComponent from "../../Compoments/HeaderCompoments/HeaderCompoment";
class PrivacySettingScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: props => (
        <HeaderComponent {...props} props={navigation} title="PRIVACY" />
      )
    };
  };
  doRedirect(screen) {
    this.props.navigation.navigate(screen);
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          <TouchableOpacity
            style={{ marginStart: 10, marginTop: 10, marginEnd: 10 }}
            onPress={() => this.doRedirect("AccountPrivateScreen")}
          >
            <View
              style={{ flexDirection: "row", margin: 5, alignItems: "center" }}
            >
              <Text
                style={{
                  color: Colors.colorEdittext,
                  fontSize: 14,
                  fontFamily: "OpenSans-SemiBold",
                  flex: 1,
                  marginStart: 5
                }}
              >
                Account Privacy
              </Text>
              <Image
                source={Icons.ic_right_arrow}
                style={[styles.icon, { width: 15, height: 15, marginEnd: 10 }]}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginStart: 10, marginTop: 5, marginEnd: 10 }}
            onPress={() => this.doRedirect("BlockedAccountScreen")}
          >
            <View
              style={{ flexDirection: "row", margin: 5, alignItems: "center" }}
            >
              <Text
                style={{
                  color: Colors.colorEdittext,
                  fontSize: 14,
                  fontFamily: "OpenSans-SemiBold",
                  flex: 1,
                  marginStart: 5
                }}
              >
                Blocked Accounts
              </Text>
              <Image
                source={Icons.ic_right_arrow}
                style={[styles.icon, { width: 15, height: 15, marginEnd: 10 }]}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginStart: 10, marginTop: 5, marginEnd: 10 }}
            onPress={() => this.doRedirect("PhotoVideosPrivacyScreen")}
          >
            <View
              style={{ flexDirection: "row", margin: 5, alignItems: "center" }}
            >
              <Text
                style={{
                  color: Colors.colorEdittext,
                  fontSize: 14,
                  fontFamily: "OpenSans-SemiBold",
                  flex: 1,
                  marginStart: 5
                }}
              >
                Photos and Videos of You
              </Text>
              <Image
                source={Icons.ic_right_arrow}
                style={[styles.icon, { width: 15, height: 15, marginEnd: 10 }]}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginStart: 10, marginTop: 5, marginEnd: 10 }}
          >
            <View
              style={{ flexDirection: "row", margin: 5, alignItems: "center" }}
            >
              <Text
                style={{
                  color: Colors.colorEdittext,
                  fontSize: 14,
                  fontFamily: "OpenSans-SemiBold",
                  flex: 1,
                  marginStart: 5
                }}
              >
                Comment Controls
              </Text>
              <Image
                source={Icons.ic_right_arrow}
                style={[styles.icon, { width: 15, height: 15, marginEnd: 10 }]}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginStart: 10, marginTop: 5, marginEnd: 10 }}
            onPress={() => this.doRedirect("ActivityStatusScreen")}
          >
            <View
              style={{ flexDirection: "row", margin: 5, alignItems: "center" }}
            >
              <Text
                style={{
                  color: Colors.colorEdittext,
                  fontSize: 14,
                  fontFamily: "OpenSans-SemiBold",
                  flex: 1,
                  marginStart: 5
                }}
              >
                Activity Status
              </Text>
              <Image
                source={Icons.ic_right_arrow}
                style={[styles.icon, { width: 15, height: 15, marginEnd: 10 }]}
              />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default PrivacySettingScreen;
