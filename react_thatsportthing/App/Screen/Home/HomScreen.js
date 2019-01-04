import React, { PureComponent } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  ListView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  FlatList,
  AsyncStorage,
  NetInfo,
  Alert
} from "react-native";
import NestedScrollView from "react-native-nested-scroll-view";
import HeaderMenuComponent from "../../Compoments/HeaderCompoments/HeaderMenuComponent";
import Colors from "../../Resource/Colors";
import Icons from "../../Resource/Icons";
import WritePostCompoment from "../../Compoments/WritePostCompoment";
import HomeListComponent from "../../Compoments/ListComponents/HomeListComponent";
import ApiUrl from "../../Network/ApiUrl";

class HomScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: props => (
        <HeaderMenuComponent {...props} props={navigation} title="STREAM" />
      )
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      conversation_count: 0,
      notification_count: 0,
      isProgress: false,
      loading: false,
      refreshing: false,
      filteredData: [],
      postData: [],
      originalPostData: [],
      myPostData: [],
      originalMyPostData: []
    };
  }
  componentDidMount() {
    try {
      this.getPostList(false);
      this.doGetUserInfo();
    } catch (error) {
      console.log(error);
    }
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
            conversation_count:myData.conversation_count,
            notification_count:myData.notification_count,
            post_count: myData.post_count,
            user_name: myData.user_name
          });
        } else {
        }
      })
      .done();
  }
  getPostList(showProgress) {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        AsyncStorage.getItem("data")
          .then(data => {
            if (data != null) {
              const myData = JSON.parse(data);

              let postData = {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  Authorization: "Bearer " + myData.token,
                  "Content-Type": "multipart/form-data"
                }
              };

              if (showProgress) {
                this.setState({
                  isProgress: true,
                  postData: [],
                  myPostData: []
                });
                this.getPostListApi(postData, showProgress);
              } else {
                this.setState({
                  isProgress: false,
                  postData: [],
                  myPostData: []
                });
                this.getPostListApi(postData, showProgress);
              }
            } else {
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
  getPostListApi(bodyData, showProgress) {
    fetch(ApiUrl.getPosts + `?page=` + this.state.page, bodyData)
      .then(response => response.json())
      .then(responseJson => {
        const message = responseJson.message;
        const status = responseJson.status;

        switch (status) {
          case 200: {
            const result = responseJson.result;

            this.setState({
              originalPostData: result.data,
              postData: result.data
            });

            break;
          }
          case 401: {
            console.log(message);

            break;
          }
          case 400: {
            console.log(message);

            break;
          }
        }
        if (showProgress) {
          this.setState({ isProgress: false });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  doRedirect(screen) {
    this.props.navigation.navigate(screen);
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NestedScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: Colors.navBg }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    backgroundColor: Colors.colorImageBg,
                    flexDirection: "row",
                    padding: Platform.OS == "android" ? 0 : 10,
                    borderColor: Colors.colorSearch,
                    margin: 10,
                    borderRadius: 5,
                    flex: 1
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
                      color: Colors.colorSearch,
                      flex: 1,
                      marginLeft: 5,
                      fontSize: 14,
                      fontFamily: "OpenSans-SemiBold"
                    }}
                    underlineColorAndroid={Colors.transparent}
                    placeholderTextColor={Colors.colorSearch}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => this.doRedirect("MessageListScreen")}
                >
                  <View style={{ position: "relative" }}>
                    <View style={{ position: "relative" }}>
                      <View
                        style={{
                          backgroundColor: Colors.colorImageBg,
                          padding: 6,
                          borderRadius: 5
                        }}
                      >
                        <Image
                          source={Icons.ic_message}
                          style={{
                            width: 24,
                            height: 24,
                            marginStart: 5,
                            marginEnd: 5,
                            tintColor: "#949494"
                          }}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        position: "absolute",
                        top: 0,
                        alignItems: "center",
                        end: 0
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: Colors.bgHeader,
                          height: 15,
                          width: 15,
                          borderRadius: 7.5,
                          alignItems: "center",
                          borderColor: Colors.white,
                          borderWidth: 1
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: 9,
                            fontFamily: "OpenSans-SemiBold"
                          }}
                        >
                          {this.state.conversation_count}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.doRedirect("MessageListScreen")}
                >
                  <View style={{ position: "relative" }}>
                    <View style={{ position: "relative" }}>
                      <View
                        style={{
                          backgroundColor: Colors.colorImageBg,
                          padding: 6,
                          borderRadius: 5,
                          marginStart: 5,
                          marginEnd: 5
                        }}
                      >
                        <Image
                          source={Icons.ic_notification_home}
                          style={{
                            width: 24,
                            height: 24,
                            marginStart: 5,
                            marginEnd: 5,
                            tintColor: "#949494"
                          }}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        position: "absolute",
                        top: 0,
                        alignItems: "center",
                        end: 10
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: Colors.bgHeader,
                          height: 15,
                          width: 15,
                          borderRadius: 7.5,
                          alignItems: "center",
                          borderColor: Colors.white,
                          borderWidth: 1
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: 9,
                            fontFamily: "OpenSans-SemiBold"
                          }}
                        >
                          {this.state.notification_count}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginLeft: 5,
                  marginRight: 5,
                  marginBottom: 5,
                  marginTop: 0
                }}
              >
                <WritePostCompoment navigation={this.props.navigation} />
              </View>
              <HomeListComponent
                streams={this.state.postData}
                updateStreams={this.state.originalPostData}
                navigation={this.props.navigation}
              />
            </View>
          </View>
        </NestedScrollView>
      </SafeAreaView>
    );
  }
}
export default HomScreen;
