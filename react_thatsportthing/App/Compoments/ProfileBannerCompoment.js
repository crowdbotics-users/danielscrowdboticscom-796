import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground
} from "react-native";
import PropTypes from "prop-types";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";
import styles from "../Resource/Styles";

class ProfileBannerCompoment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: ""
    };
  }
  doRedirect(screen) {
    this.props.navigation.navigate(screen);
  }
  render() {
    return (
      <View>
        <ImageBackground
          source={
            this.props.cover_image == ""
              ? Icons.toolbarbg
              : { uri: this.props.cover_image }
          }
          style={{ height: 180 }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center"
            }}
          >
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: "#F8F6F7",
                alignSelf: "center",
                justifyContent: "center",
                alignContent: "center"
              }}
            >
              <Image
                source={
                  this.props.profile_image == ""
                    ? Icons.messi
                    : { uri: this.props.profile_image }
                }
                style={{
                  width: 98,
                  height: 98,
                  borderRadius: 49,
                  borderWidth: 1.5,
                  borderColor: "#D1D0D0",
                  alignSelf: "center"
                }}
              />
            </View>
            <View>
              <ImageBackground
                source={Icons.bg_username}
                style={{ height: 80, justifyContent: "center" }}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 18,
                    fontFamily: "OpenSans-Bold",
                    textAlign: "center"
                  }}
                >
                  {this.props.full_name}
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 14,
                    fontFamily: "OpenSans-SemiBold",
                    textAlign: "center"
                  }}
                >
                  {"@" + this.props.user_name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center"
                  }}
                >
                  <TouchableOpacity>
                    <Text
                      style={{
                        textAlign: "center",
                        color: Colors.white,
                        fontSize: 14,
                        fontFamily: "OpenSans-SemiBold",
                        width: Dimensions.get("screen").width / 2,
                        padding: 10
                      }}
                    >
                      +Send Request
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      borderEndWidth: 1,
                      borderEndColor: Colors.white,
                      marginTop: 10,
                      marginBottom: 10
                    }}
                  />
                  <TouchableOpacity>
                    <Text
                      style={{
                        textAlign: "center",
                        color: Colors.white,
                        fontSize: 14,
                        fontFamily: "OpenSans-SemiBold",
                        width: Dimensions.get("screen").width / 2,
                        padding: 10
                      }}
                    >
                      Send Message
                    </Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </View>
        </ImageBackground>
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
ProfileBannerCompoment.propTypes = {
  tabActive: PropTypes.bool,
  tabTitle: PropTypes.string,
  full_name: PropTypes.string,
  profile_image: PropTypes.string,
  cover_image: PropTypes.string,
  user_name: PropTypes.string,
  follower_count: PropTypes.number,
  crew_count: PropTypes.number,
  navigation: PropTypes.object
};
export default ProfileBannerCompoment;
