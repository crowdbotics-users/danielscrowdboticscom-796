import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  AsyncStorage,
  TouchableOpacity,
  Dimensions,
  Linking,
  TextInput
} from "react-native";
import { NavigationActions } from "react-navigation";
import PropTypes from "prop-types";

import styles from "../Resource/Styles";
import Color from "../Resource/Colors";
import Icon from "../Resource/Icons";
import Icons from "../Resource/Icons";

class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      useremail: "",
      userimage: "",
      isActiveTab: false,
      isActiveHome: true,
      isActiveProfile: false,
      isActivePosts: false,
      isActivePhotos: false,
      isActiveVideos: false,
      isActiveFriends: false,
      isActiveAccountSettings: false,
      isActiveLogout: false
    };
  }
  componentDidMount() {}
  navigateToScreen = route => () => {
    const navigate = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigate);
    this.closeDrawer();
  };
  doLogout() {
    this.props.navigation.navigate("Login");
    this.closeDrawer();
  }
  doRateUs() {
    Linking.openURL("http://www.goodindiabadindia.com/terms-conditons.html");
    this.closeDrawer();
  }
  doHome = () => {
    this.setState({
      isActiveHome: true,
      isActiveProfile: false,
      isActivePosts: false,
      isActivePhotos: false,
      isActiveVideos: false,
      isActiveFriends: false,
      isActiveAccountSettings: false,
      isActiveLogout: false
    });
  };
  doProfile = () => {
    this.setState({
      isActiveHome: false,
      isActiveProfile: true,
      isActivePosts: false,
      isActivePhotos: false,
      isActiveVideos: false,
      isActiveFriends: false,
      isActiveAccountSettings: false,
      isActiveLogout: false
    });
  };
  doPosts = () => {
    this.setState({
      isActiveHome: false,
      isActiveProfile: false,
      isActivePosts: true,
      isActivePhotos: false,
      isActiveVideos: false,
      isActiveFriends: false,
      isActiveAccountSettings: false,
      isActiveLogout: false
    });
  };
  doPhotos = () => {
    this.setState({
      isActiveHome: false,
      isActiveProfile: false,
      isActivePosts: false,
      isActivePhotos: true,
      isActiveVideos: false,
      isActiveFriends: false,
      isActiveAccountSettings: false,
      isActiveLogout: false
    });
  };
  doVideos = () => {
    this.setState({
      isActiveHome: false,
      isActiveProfile: false,
      isActivePosts: false,
      isActivePhotos: false,
      isActiveVideos: true,
      isActiveFriends: false,
      isActiveAccountSettings: false,
      isActiveLogout: false
    });
  };
  doFriends = () => {
    this.setState({
      isActiveHome: false,
      isActiveProfile: false,
      isActivePosts: false,
      isActivePhotos: false,
      isActiveVideos: false,
      isActiveFriends: true,
      isActiveAccountSettings: false,
      isActiveLogout: false
    });
  };
  doAccountSetting = () => {
    this.setState({
      isActiveHome: false,
      isActiveProfile: false,
      isActivePosts: false,
      isActivePhotos: false,
      isActiveVideos: false,
      isActiveFriends: false,
      isActiveAccountSettings: true,
      isActiveLogout: false
    });
  };
  closeDrawer = () => {
    this.props.navigation.closeDrawer();
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: Color.navBg,
            justifyContent: "flex-start",
            marginTop: 20,
            height: 200
          }
        ]}
      >
        <View
          style={{
            backgroundColor: Color.bgHeader,
            height: 100,
            justifyContent: "center"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center"
            }}
          >
            <View
              style={{
                flex: 1,
                alignContent: "flex-start",
                justifyContent: "center"
              }}
            >
              <Image
                source={Icons.logo_white}
                style={{
                  margin: 10,
                  width: 90,
                  height: 59
                }}
              />
            </View>
            <View
              style={{
                margin: 10,
                width: 81,
                height: 81,
                borderRadius: 45,
                backgroundColor: "#F8F6F7",
                alignSelf: "flex-end",
                justifyContent: "flex-end",
                alignContent: "flex-end"
              }}
            >
              <Image
                source={Icons.messi}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  borderWidth: 1.5,
                  borderColor: "#D1D0D0",
                  alignSelf: "center"
                }}
              />
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              backgroundColor: "#313131",
              flexDirection: "row",
              padding: 10,
              borderColor: Color.colorSearch,
              margin: 10,
              borderRadius: 5
            }}
          >
            <Image
              source={Icons.ic_search}
              style={{ width: 24, height: 24, marginRight: 5 }}
            />
            <TextInput
              returnKeyType="done"
              placeholder="Search.."
              style={{
                color: Color.colorSearch,
                flex: 1,
                marginLeft: 5,
                fontSize: 14,
                fontFamily: "OpenSans-SemiBold"
              }}
              placeholderTextColor={Color.colorSearch}
            />
          </View>
        </View>
        <View
          style={{ height: 2, width: "100%", backgroundColor: Color.bgHeader }}
        />
        <View>
          <View style={{ backgroundColor: Color.navBg }}>
            <TouchableOpacity onPress={this.doHome.bind(this)}>
              <View
                style={{
                  backgroundColor: this.state.isActiveHome
                    ? "#313131"
                    : Color.transparent,
                  flexDirection: "row",
                  padding: 10,
                  borderColor: Color.colorSearch,
                  marginTop: 10
                }}
              >
                <Image
                  resizeMode="contain"
                  source={Icons.ic_home}
                  style={{
                    width: 24,
                    height: 24,
                    marginLeft: 10,
                    marginRight: 5
                  }}
                />
                <Text
                  style={{
                    color: Color.colorSearch,
                    flex: 1,
                    marginLeft: 5,
                    fontSize: 16,
                    fontFamily: "OpenSans-SemiBold"
                  }}
                >
                  Home
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={this.doProfile.bind(this)}>
              <View
                style={{
                  backgroundColor: this.state.isActiveProfile
                    ? "#313131"
                    : Color.navBg,
                  flexDirection: "row",
                  padding: 10,
                  borderColor: Color.colorSearch
                }}
              >
                <Image
                  source={Icons.ic_profile}
                  style={{
                    width: 24,
                    height: 24,
                    marginLeft: 10,
                    marginRight: 5
                  }}
                />
                <Text
                  style={{
                    color: Color.colorSearch,
                    flex: 1,
                    marginLeft: 5,
                    fontSize: 16,
                    fontFamily: "OpenSans-SemiBold"
                  }}
                >
                  My Profile
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={this.doPosts.bind(this)}>
              <View
                style={{
                  backgroundColor: this.state.isActivePosts
                    ? "#313131"
                    : Color.navBg,
                  flexDirection: "row",
                  padding: 10,
                  borderColor: Color.colorSearch
                }}
              >
                <Image
                  source={Icons.ic_posts}
                  style={{
                    width: 24,
                    height: 24,
                    marginLeft: 10,
                    marginRight: 5
                  }}
                />
                <Text
                  style={{
                    color: Color.colorSearch,
                    flex: 1,
                    marginLeft: 5,
                    fontSize: 16,
                    fontFamily: "OpenSans-SemiBold"
                  }}
                >
                  My Posts
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={this.doPhotos.bind(this)}>
              <View
                style={{
                  backgroundColor: this.state.isActivePhotos
                    ? "#313131"
                    : Color.navBg,
                  flexDirection: "row",
                  padding: 10,
                  borderColor: Color.colorSearch
                }}
              >
                <Image
                  resizeMode="contain"
                  source={Icons.ic_photos}
                  style={{
                    width: 24,
                    height: 24,
                    marginLeft: 10,
                    marginRight: 5
                  }}
                />
                <Text
                  style={{
                    color: Color.colorSearch,
                    flex: 1,
                    marginLeft: 5,
                    fontSize: 16,
                    fontFamily: "OpenSans-SemiBold"
                  }}
                >
                  Photos
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={this.doVideos.bind(this)}>
              <View
                style={{
                  backgroundColor: this.state.isActiveVideos
                    ? "#313131"
                    : Color.navBg,
                  flexDirection: "row",
                  padding: 10,
                  borderColor: Color.colorSearch
                }}
              >
                <Image
                  resizeMode="contain"
                  source={Icons.ic_videos}
                  style={{
                    width: 24,
                    height: 24,
                    marginLeft: 10,
                    marginRight: 5
                  }}
                />
                <Text
                  style={{
                    color: Color.colorSearch,
                    flex: 1,
                    marginLeft: 5,
                    fontSize: 16,
                    fontFamily: "OpenSans-SemiBold"
                  }}
                >
                  Videos
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={this.doFriends.bind(this)}>
              <View
                style={{
                  backgroundColor: this.state.isActiveFriends
                    ? "#313131"
                    : Color.navBg,
                  flexDirection: "row",
                  padding: 10,
                  borderColor: Color.colorSearch
                }}
              >
                <Image
                  resizeMode="contain"
                  source={Icons.ic_friends}
                  style={{
                    width: 24,
                    height: 24,
                    marginLeft: 10,
                    marginRight: 5
                  }}
                />
                <Text
                  style={{
                    color: Color.colorSearch,
                    flex: 1,
                    marginLeft: 5,
                    fontSize: 16,
                    fontFamily: "OpenSans-SemiBold"
                  }}
                >
                  Friends
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={this.doAccountSetting.bind(this)}>
              <View
                style={{
                  backgroundColor: this.state.isActiveAccountSettings
                    ? "#313131"
                    : Color.navBg,
                  flexDirection: "row",
                  padding: 10,
                  borderColor: Color.colorSearch
                }}
              >
                <Image
                  resizeMode="contain"
                  source={Icons.ic_account_settings}
                  style={{
                    width: 24,
                    height: 24,
                    marginLeft: 10,
                    marginRight: 5
                  }}
                />
                <Text
                  style={{
                    color: Color.colorSearch,
                    flex: 1,
                    marginLeft: 5,
                    fontSize: 16,
                    fontFamily: "OpenSans-SemiBold"
                  }}
                >
                  Account Setting
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={this.doLogout.bind(this)}>
              <View
                style={{
                  backgroundColor: this.state.isActiveLogout
                    ? "#313131"
                    : Color.navBg,
                  flexDirection: "row",
                  padding: 10,
                  borderColor: Color.colorSearch
                }}
              >
                <Image
                  resizeMode="contain"
                  source={Icons.ic_logout}
                  style={{
                    width: 24,
                    height: 24,
                    marginLeft: 10,
                    marginRight: 5
                  }}
                />
                <Text
                  style={{
                    color: Color.colorSearch,
                    flex: 1,
                    marginLeft: 5,
                    fontSize: 16,
                    fontFamily: "OpenSans-SemiBold"
                  }}
                >
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

DrawerContent.propTypes = {
  navigation: PropTypes.object
};
export default DrawerContent;
