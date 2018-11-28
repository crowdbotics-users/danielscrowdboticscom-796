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

class HomeBannerCompoment extends Component {
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
          style={{ height: 180, backgroundColor: Colors.black }}
        >
          <View
            style={{
              position: "relative",

              flex: 1
            }}
          >
            <View
              style={{
                position: "relative",

                flex: 1
              }}
            />
            <View
              style={{
                position: "absolute",

                bottom: 0,
                width: "100%"
              }}
            >
              <View style={{ position: "relative", flex: 1 }}>
                <View style={{ position: "relative" }}>
                  <View style={{ flexDirection: "column", width: "100%" }}>
                    <View style={{ backgroundColor: "#00000060" }}>
                      <Text
                        style={{
                          textAlign: "center",
                          color: Colors.white,
                          fontFamily: "OpenSans-SemiBold",
                          fontSize: 16,
                          marginTop: 5,
                          marginBottom: 5
                        }}
                      >
                        {this.props.full_name}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignContent: "center",
                        backgroundColor: Colors.black,
                        flexDirection: "row"
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          padding: 5,
                          alignItems: "flex-end",
                          alignContent: "flex-end",
                          justifyContent: "flex-end"
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            color: Colors.white,
                            fontSize: 11,
                            fontFamily: "OpenSans-SemiBold"
                          }}
                        >
                          {"@" + this.props.user_name}
                        </Text>
                      </View>
                      <View style={{ flex: 1, padding: 5 }}>
                        <TouchableOpacity
                          onPress={() => this.doRedirect("MyCrewScreen")}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              color: Colors.white,
                              fontFamily: "OpenSans-SemiBold",
                              fontSize: 16
                            }}
                          >
                            {this.props.crew_count}
                          </Text>

                          <Text
                            style={{
                              textAlign: "center",
                              color: Colors.white,
                              fontSize: 11,
                              fontFamily: "OpenSans-SemiBold"
                            }}
                          >
                            Crew
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ flex: 1, padding: 5 }}>
                        <TouchableOpacity
                          onPress={() => this.doRedirect("MyFollowersScreen")}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              color: Colors.white,
                              fontFamily: "OpenSans-SemiBold",
                              fontSize: 16
                            }}
                          >
                            {this.props.follower_count}
                          </Text>
                          <Text
                            style={{
                              textAlign: "center",
                              color: Colors.white,
                              fontSize: 11,
                              fontFamily: "OpenSans-SemiBold"
                            }}
                          >
                            Followers
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ flex: 1, padding: 5 }}>
                        <TouchableOpacity
                          style={{ alignItems: "center" }}
                          onPress={() => this.doRedirect("EditProfileScreen")}
                        >
                          <Image
                            style={[styles.icon, { width: 20, height: 20 }]}
                            source={Icons.ic_setting}
                          />

                          <Text
                            style={{
                              textAlign: "center",
                              color: Colors.white,
                              fontSize: 11,
                              fontFamily: "OpenSans-SemiBold",
                              marginTop: 2
                            }}
                          >
                            Edit Profile
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{ position: "absolute", width: "100%", bottom: 25 }}
                >
                  <View
                    style={{
                      width: 95,
                      height: 95,
                      borderRadius: 47.5,
                      backgroundColor: "#F8F6F7",
                      marginStart: 20,
                      margin: 10,
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
                        width: 91,
                        height: 91,
                        borderRadius: 45.5,
                        borderWidth: 1.5,
                        borderColor: "#D1D0D0",
                        alignSelf: "center"
                      }}
                    />
                  </View>
                </View>
              </View>
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
HomeBannerCompoment.propTypes = {
  
  full_name: PropTypes.string,
  profile_image: PropTypes.string,
  cover_image: PropTypes.string,
  user_name: PropTypes.string,
  follower_count: PropTypes.number,
  crew_count: PropTypes.number,
  navigation: PropTypes.object
};
export default HomeBannerCompoment;
