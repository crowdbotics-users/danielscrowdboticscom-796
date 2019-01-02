import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
  SafeAreaView,
  FlatList,
  AsyncStorage,
  NetInfo,
  Alert
} from "react-native";
import Colors from "../Resource/Colors";
import FollowerHeaderCompoment from "../Compoments/FollowerHeaderCompoment";
import crewtabstyles from "../Resource/crewtabstyles";
import Icons from "../Resource/Icons";
import styles from "../Resource/Styles";
import { showSnackBar } from "@prince8verma/react-native-snackbar";
import ApiUrl from "../Network/ApiUrl";
import ProgressCompoment from "../Compoments/ProgressCompoment";
import Moment from "moment";

class MyFollowersScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: props => <FollowerHeaderCompoment {...props} props={navigation} />
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      isProgress: false,
      isAllFriends: true,
      isMutualFriends: false,
      isFollowersActive: false,
      data: []
    };
  }
  componentDidMount() {
    this.doGetFriendList();
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: Colors.colorLine
        }}
      />
    );
  };
  renderFriends(data) {
    return (
      <SafeAreaView>
        <View
          style={[
            styles.column,
            styles.card,
            { alignItems: "center", marginBottom: 1, borderRadius: 0 }
          ]}
        >
          <View
            style={[
              styles.row,
              { justifyContent: "center", alignItems: "center", flex: 1 }
            ]}
          >
            <View style={{ flex: 1 }}>
              <View
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 36,
                  backgroundColor: "#F8F6F7",
                  alignSelf: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  marginLeft: 8
                }}
              >
                <Image
                  source={
                    data.users.profile_image == ""
                      ? Icons.messi
                      : { uri: data.users.profile_image }
                  }
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: 34,
                    borderWidth: 1.5,
                    borderColor: "#D1D0D0",
                    alignSelf: "center"
                  }}
                />
              </View>
            </View>
            <View style={{ flex: 3, marginTop: 10 }}>
              <View style={styles.row}>
                <Text
                  style={{
                    flex: 1,
                    color: Colors.black,
                    fontFamily: "OpenSans-SemiBold",
                    fontSize: 13
                  }}
                >
                  {data.users.full_name}
                </Text>
                <Image
                  source={Icons.ic_follow_cancel}
                  style={[
                    styles.icon,
                    { marginEnd: 10, width: 20, height: 20 }
                  ]}
                />
              </View>
              <Text
                style={{
                  color: "#6C6C6C",
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 12
                }}
              >
                {Moment(data.created_at).format("DD/MM/YYYY hh:mm A")}
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 12
                }}
              >
                {data.users.user_name}
              </Text>
              <View
                style={[
                  styles.row,
                  {
                    alignItems: "center"
                  }
                ]}
              >
                <TouchableOpacity style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontFamily: "OpenSans-SemiBold",
                      fontSize: 11
                    }}
                  >
                    {data.friendstatus == 1
                      ? "+ Send Request"
                      : data.friendstatus == 2
                      ? "x Unfriend"
                      : "+ Send Request"}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    borderEndWidth: 1,
                    borderEndColor: Colors.black,
                    height: 10
                  }}
                />

                <TouchableOpacity style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontFamily: "OpenSans-SemiBold",
                      fontSize: 11,
                      marginStart: 8,
                      marginEnd: 8
                    }}
                  >
                    Send Message
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    borderEndWidth: 1,
                    borderEndColor: Colors.black,
                    height: 10
                  }}
                />
                <TouchableOpacity style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontFamily: "OpenSans-SemiBold",
                      fontSize: 11,
                      marginStart: 8,
                      marginEnd: 8
                    }}
                  >
                    {data.users.follow_status ? "UnFollow" : "Follow"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  doFriendsChangeTab(tabName) {
    if (tabName == "allfriends") {
      this.setState({
        data: [],
        isAllFriends: true,
        isMutualFriends: false,
        isFollowersActive: false
      });
    } else if (tabName == "mutualfriends") {
      this.setState({
        data: [],
        isAllFriends: false,
        isMutualFriends: true,
        isFollowersActive: false
      });
    } else if (tabName == "followers") {
      this.setState({
        data: [],
        isAllFriends: false,
        isMutualFriends: false,
        isFollowersActive: true
      });
    }
  }
  doGetFriendList() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        AsyncStorage.getItem("data")
          .then(data => {
            if (data != null) {
              const myData = JSON.parse(data);

              const bodyData = JSON.stringify({
                post_id: 1,
                page: 1
              });
              this.setState({ data: [] });
              this.openProgressbar();
              this.doGetFriendListApi(bodyData, myData.token);
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
  doGetFriendListApi(bodyData, token) {
    const { page, seed } = this.state;
    fetch(ApiUrl.getFollowerList, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        const message = responseJson.message;
        const status = responseJson.status;
        console.log(responseJson);

        switch (status) {
          case 200: {
            const result = responseJson.result;

            this.setState({
              data:
                page === 1 ? result.data : [...this.state.data, ...result.data],

              loading: false,
              refreshing: false,
              total: result.total
            });

            break;
          }
          case 401: {
            console.log(message);
            this.doShowSnackBar(message);
            this.setState({ loading: false, refreshing: false, data: [] });
            break;
          }
          case 400: {
            console.log(message);
            this.doShowSnackBar(message);
            this.setState({ loading: false, refreshing: false, data: [] });
            break;
          }
          default: {
            this.setState({ loading: false, refreshing: false, data: [] });
            this.doShowSnackBar(message);
            break;
          }
        }
        this.hideProgressbar();
      })
      .catch(error => {
        this.hideProgressbar();
        console.log(error);
        alert(error);
      });
  }
  openProgressbar = () => {
    this.setState({ isProgress: true });
  };
  hideProgressbar = () => {
    this.setState({ isProgress: false });
  };
  doShowSnackBar(message) {
    showSnackBar({
      message: message,
      position: "top",
      backgroundColor: Colors.bgHeader,
      buttonColor: "#fff",
      confirmText: "",
      onConfirm: () => {},
      duration: 1000
    });
  }
  render() {
    return (
      <View style={customstyles.container}>
        <View style={{ backgroundColor: Colors.navBg }}>
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              backgroundColor: "#313131",
              flexDirection: "row",
              padding: Platform.OS == "android" ? 0 : 10,
              borderColor: Colors.colorSearch,
              margin: 10,
              borderRadius: 5
            }}
          >
            <Image
              source={Icons.ic_search}
              style={{ width: 24, height: 24, marginRight: 5, marginLeft: 10 }}
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
        </View>
        <ProgressCompoment isProgress={this.state.isProgress} />
        <FlatList
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          bounces={false}
          numColumns={1}
          style={{ marginTop: 8 }}
          data={this.state.data}
          renderItem={({ item, index }) => this.renderFriends(item)}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled={false}
        />
      </View>
    );
  }
}
const customstyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white }
});
export default MyFollowersScreen;
