import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  AsyncStorage,
  TouchableOpacity,
  Dimensions,
  Linking,
  TextInput,
  Platform,
  NetInfo,
  Alert,
  SafeAreaView,
  ScrollView
} from "react-native";
import { NavigationActions, StackActions } from "react-navigation";

import PropTypes from "prop-types";

import styles from "../Resource/Styles";
import Color from "../Resource/Colors";
import Icon from "../Resource/Icons";
import Icons from "../Resource/Icons";
import ApiUrl from "../Network/ApiUrl";
import ProgressCompoment from "./ProgressCompoment";
import { showSnackBar } from "@prince8verma/react-native-snackbar";
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import { GoogleSignin, GoogleSigninButton, statusCodes,User } from 'react-native-google-signin';

class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProgress: false,
      username: "",
      useremail: "",
      userimage: "",
      profile_image: "",
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
  componentDidMount() {
    if (this.props.activeDrawer == "home") {
      this.doHome();
    }
    this.doGetUserInfo();
  }
  doGetUserInfo() {
    AsyncStorage.getItem("data")
      .then(data => {
        if (data != null) {
          const myData = JSON.parse(data);
          this.setState({
            full_name: myData.full_name,
            profile_image: myData.profile_image,
            cover_image: myData.cover_image,
            post_status: myData.post_status,
            follower_count: myData.follower_count,
            crew_count: myData.crew_count,
            post_count: myData.post_count,
            user_name: myData.user_name
          });
        } else {
        }
      })
      .done();
  }
  navigateToScreen = route => () => {
    const navigate = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigate);
    this.closeDrawer();
  };
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  doLogout(screen) {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        AsyncStorage.getItem("data")
          .then(data => {
            if (data != null) {
              const myData = JSON.parse(data);
              if (myData.login_type == "facebook") {
                console.log("facebook");
                LoginManager.logOut();
              } else if (myData.login_type == "google") {
                console.log("google");
                this.signOut();
              }
              let postData = {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  Authorization: "Bearer " + myData.token,
                  "Content-Type": "multipart/form-data"
                }
              };
              this.closeDrawer();
              this.openProgressbar();
              this.doLogoutApi(postData, screen);
            } else {
              console.log(data);
            }
          })
          .done();
      } else {
        Alert.alert(
          "Internet Connection",
          "Kindly connect to internet then try again"
        );
      }
    });
  }
  doShowSnackBar(message) {
    showSnackBar({
      message: message,
      position: "top",
      backgroundColor: Color.bgHeader,
      buttonColor: "#fff",
      confirmText: "",
      onConfirm: () => {},
      duration: 1000
    });
  }
  openProgressbar = () => {
    this.setState({ isProgress: true });
  };
  hideProgressbar = () => {
    this.setState({ isProgress: false });
  };
  doLogoutApi(bodyData, screen) {
    const { navigate, dispatch } = this.props.navigation;
    fetch(ApiUrl.logoutUrl, bodyData)
      .then(response => response.json())
      .then(responseJson => {
        const message = responseJson.message;
        const status = responseJson.status;

        switch (status) {
          case 200: {
            AsyncStorage.clear();
            AsyncStorage.setItem("logged", "false");

            this.hideProgressbar();
            this.doFinish(screen);

            break;
          }
          case 401: {
            this.hideProgressbar();
            this.doShowSnackBar(message);
            console.log(message);
            break;
          }
          case 400: {
            this.hideProgressbar();
            this.doShowSnackBar(message);
            console.log(message);
            break;
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  doFinish(screen) {
    const { navigate, dispatch } = this.props.navigation;
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: screen })]
    });
    dispatch(resetAction);
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
    this.doRedirect("HomeTabScreen");
    this.closeDrawer();
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

    this.closeDrawer();
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
    this.closeDrawer();
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
    this.closeDrawer();
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
    this.closeDrawer();
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
    this.doRedirect("MyCrewScreen");
    this.closeDrawer();
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
    this.closeDrawer();
  };
  closeDrawer = () => {
    this.props.navigation.closeDrawer();
  };
  doRedirect(screen) {
    this.props.navigation.navigate(screen);
  }
  render() {
    return (
      <ScrollView>
        <SafeAreaView>
          <View
            style={[
              styles.container,
              {
                backgroundColor: Color.navBg,
                justifyContent: "flex-start"
              }
            ]}
          >
            <ProgressCompoment isProgress={this.state.isProgress} />
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
                    source={
                      this.state.profile_image == ""
                        ? Icons.messi
                        : { uri: this.state.profile_image }
                    }
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
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  backgroundColor: "#313131",
                  flexDirection: "row",
                  padding: Platform.OS == "android" ? 0 : 10,
                  borderColor: Color.colorSearch,
                  margin: 10,
                  borderRadius: 5
                }}
              >
                <Image
                  source={Icons.ic_search}
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: 5,
                    marginLeft: 10
                  }}
                />
                <TextInput
                  returnKeyType="done"
                  placeholder="Search.."
                  style={{
                    padding: Platform.OS == "android" ? 5 : 0,
                    color: Color.colorSearch,
                    flex: 1,
                    marginLeft: 5,
                    fontSize: 14,
                    fontFamily: "OpenSans-SemiBold"
                  }}
                  underlineColorAndroid={Color.transparent}
                  placeholderTextColor={Color.colorSearch}
                />
              </View>
            </View>
            <View
              style={{
                height: 2,
                width: "100%",
                backgroundColor: Color.bgHeader
              }}
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
                      Crew
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
                      borderColor: Color.colorSearch,
                      marginTop: 30
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
                <TouchableOpacity onPress={() => this.doLogout("LoginType")}>
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
        </SafeAreaView>
      </ScrollView>
    );
  }
}

DrawerContent.propTypes = {
  navigation: PropTypes.object,
  activeDrawer: PropTypes.string
};
export default DrawerContent;
