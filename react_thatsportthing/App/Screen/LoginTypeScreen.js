import React, { Component } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  StatusBar,
  Platform
} from "react-native";
import Icons from "../Resource/Icons";
import Colors from "../Resource/Colors";
import ProgressCompoment from "../Compoments/ProgressCompoment";

class LoginTypeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  doRedirect(screen) {
    const { navigate } = this.props.navigation;
    navigate(screen);
  }

  render() {
    const width = Dimensions.get("screen").width;
    const height = Dimensions.get("screen").height;
    return (
      <View>
        <StatusBar
          backgroundColor={Colors.bgHeader}
          barStyle="light-content"
          translucent={true}
        />
        <ImageBackground
          imageStyle={{ resizeMode: "cover" }}
          style={{ width: width, height: height, justifyContent: "center" }}
          source={Icons.ic_login_bg}
        >
          <Image
            source={Icons.logo}
            style={{ width: 370, height: 250, alignSelf: "center" }}
          />

          <View style={styles.mainView}>
            <View style={styles.buttonTopView}>
              <TouchableOpacity onPress={this.doRedirect.bind(this, "Login")}>
                <View style={styles.buttonLogin}>
                  <Text
                    style={[
                      styles.buttonText,
                      { fontFamily: "JosefinSans-Bold" }
                    ]}
                  >
                    LOGIN
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.doRedirect.bind(this, "SignUp1")}>
                <View style={styles.buttonSignUp}>
                  <Text
                    style={[
                      styles.buttonText,
                      { fontFamily: "JosefinSans-Bold" }
                    ]}
                  >
                    SIGN UP
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
    shadowOffset: {
      height: 1,
      width: 0.3
    }
  },
  background: { height: "100%", width: "100%" },
  mainView: {
    position: "absolute",
    backgroundColor: Colors.white,
    width: Dimensions.get("screen").width,
    marginBottom: Platform.OS == "android" ? 30 : 0,
    bottom: "5%"
  },
  buttonTopView: {
    flexDirection: "row",
    flex: 1,
    alignContent: "center"
  },
  buttonLogin: {
    marginRight: 5,
    width: Dimensions.get("screen").width / 2,

    marginTop: 10,
    marginBottom: 10,
    backgroundColor: Colors.backgroundLogin,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignContent: "center",
    justifyContent: "center"
  },
  buttonSignUp: {
    marginLeft: 5,
    width: Dimensions.get("screen").width / 2,

    marginTop: 10,
    marginBottom: 10,
    backgroundColor: Colors.orange,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignContent: "center",
    justifyContent: "center"
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 25,
    paddingTop: 25,
    paddingLeft: "15%",
    paddingRight: "15%",
    color: Colors.white
  },
  TouchableOpacityView: {
    flex: 1
  },
  row: { flexDirection: "row" },
  column: { flexDirection: "column" }
});

export default LoginTypeScreen;
