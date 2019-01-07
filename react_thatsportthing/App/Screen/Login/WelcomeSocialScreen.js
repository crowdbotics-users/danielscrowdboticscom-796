import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from "react-native";
import Colors from "../../Resource/Colors";
import ProfilePictureComponent from "../../Compoments/ButtonCompoment/ProfilePictureComponent";
import Icons from "../../Resource/Icons";
import { NavigationActions, StackActions } from "react-navigation";

class WelcomeSocialScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      profile_image: "",
      full_name: "",
      loginType: ""
    };
  }

  componentDidMount() {
    const { loginData } = this.props.navigation.state.params;

    console.log(loginData);
    if (loginData.login_type == "facebook") {
      this.setState({ loginType: "Facebook" });
    } else {
      if (loginData.login_type == "google") {
        this.setState({ loginType: "Google+" });
      }
    }
    this.setState({
      full_name: loginData.full_name,
      profile_image: loginData.profile_image
    });
  }
  doRedirect(screen) {
    const { navigate } = this.props.navigation;
    navigate(screen);
  }
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
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          <View style={{ marginStart: "5%", marginEnd: "5%" }}>
            <Image style={customstyles.logoImage} source={Icons.logo} />
            <View
              style={{ flexDirection: "row", marginStart: "5%", marginTop: 20 }}
            >
              <ProfilePictureComponent
                circleWidth={100}
                circleHeight={100}
                circleRadius={50}
                imageWidth={98}
                imageHeight={98}
                imageRadius={49}
                profile_image={this.state.profile_image}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignContent: "flex-start",
                  marginStart: "5%"
                }}
              >
                <Text
                  style={{
                    fontFamily: "OpenSans-Bold",
                    fontSize: 14,
                    color: Colors.colorEdittext
                  }}
                >
                  HI, {this.state.full_name}!
                </Text>
                <Text
                  style={{
                    fontFamily: "OpenSans-SemiBold",
                    fontSize: 13,
                    color: Colors.colorSearch
                  }}
                >
                  You are logged in with your {this.state.loginType} account.
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontFamily: "OpenSans-SemiBold",
                fontSize: 13,
                color: Colors.colorSearch,
                marginTop: 20
              }}
            >
              The 'That Sports Thing' app will use your {this.state.loginType}{" "}
              name, e-mail, profile picture, cover picture and details.
            </Text>
            <Text
              style={{
                fontFamily: "OpenSans-SemiBold",
                fontSize: 13,
                color: Colors.colorSearch,
                marginTop: 20
              }}
            >
              You can change all these details later in settings.
            </Text>

            <TouchableOpacity
              onPress={() => this.doFinish("HomePage")}
              style={{ margin: 20, marginTop: 50 }}
            >
              <View
                style={{
                  alignContent: "flex-end",
                  backgroundColor: Colors.bgHeader,
                  alignItems: "center",
                  borderRadius: 15
                }}
              >
                <Text
                  style={{
                    fontFamily: "OpenSans-Bold",
                    fontSize: 16,
                    color: Colors.white,
                    paddingTop: 20,
                    paddingBottom: 20
                  }}
                >
                  GO TO YOUR PROFILE
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const customstyles = StyleSheet.create({
  logoImage: {
    height: 100,
    width: 152,
    marginTop: 15,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginStart: "5%"
  },
  editText: { color: Colors.colorEdittext, fontSize: 14, padding: 0 },
  labelName: { fontSize: 14, marginTop: 5, color: Colors.colorEdittext }
});
export default WelcomeSocialScreen;
