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
  NetInfo,
  AsyncStorage,
  Alert
} from "react-native";
import Colors from "../Resource/Colors";
import CrewHeaderCompoment from "../Compoments/CrewHeaderCompoment";
import crewtabstyles from "../Resource/crewtabstyles";
import Icons from "../Resource/Icons";
import styles from "../Resource/Styles";
import ProgressCompoment from "../Compoments/ProgressCompoment";
import ApiUrl from "../Network/ApiUrl";
import Moment from "moment";
import { showSnackBar } from "@prince8verma/react-native-snackbar";

class MyCrewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: props => <CrewHeaderCompoment {...props} props={navigation} />
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      isProgress: true,
      isAllFriends: true,
      isMutualFriends: false,
      isFollowersActive: false,
      data: [],
     
    };
  }
  doRequestAction(status) {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        AsyncStorage.getItem("data")
          .then(data => {
            console.log("AsyncStorage");
            if (data != null) {
              const myData = JSON.parse(data);
                const bodyData = JSON.stringify({
                  status:status,
                  sender_id: myData.id
                });
                console.log('cancel',bodyData);
                
                this.openProgressbar();
                 try {
                  this.doRequestActionApi(bodyData, myData.token);
                 } catch (error) {
                   console.log(error);
                   this.hideProgressbar();
                   
                 }
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
  doRequestActionApi(bodyData, token) {
    fetch(ApiUrl.requestAction, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: bodyData
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);

        const message = responseJson.message;
        const status = responseJson.status;

        switch (status) {
          case 200: {
            //this.props.navigation.goBack(null);
            this.doShowSnackBar(message);
            this.hideProgressbar();
            break;
          }
          case 401: {
            this.doShowSnackBar(message);
            this.hideProgressbar();
            console.log(message);
            break;
          }
          case 400: {
            this.doShowSnackBar(message);
            this.hideProgressbar();
            console.log(message);
            break;
          }
        }
      })
      .catch(error => {
        this.hideProgressbar();
        console.log(error);
      });
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
  renderFriends(data,index) {
    if(data.hasOwnProperty('user_details')){
      const user_details=data.user_details;
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
                  source={user_details.profile_image==""?Icons.messi:{uri:user_details.profile_image}}
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
            <View style={{ flex: 3 }}>
              <Text
                style={{
                  color: Colors.black,
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 13
                }}
              >
                {user_details.full_name}
              </Text>
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
                {user_details.user_name}
              </Text>
              <View
                style={[
                  styles.row,
                  {
                    alignItems: "center"
                  }
                ]}
              >
                <TouchableOpacity style={{ flex: 1 }} onPress={()=>this.doRequestAction(3)}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontFamily: "OpenSans-SemiBold",
                      fontSize: 11
                    }}
                  >
                    Unfriend
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
                <TouchableOpacity style={{ flex: 1 }} onPress={()=>this.doFollowFriend(data,index)}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontFamily: "OpenSans-SemiBold",
                      fontSize: 11,
                      marginStart: 8,
                      marginEnd: 8
                    }}
                  >
                    {data.followstatus == 1
                      ? "Follow"
                      : data.followstatus == 2
                      ? "UnFollow"
                      : "Follow"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
      
    }else{
      console.log('nathi');
    }
   
  }
  renderSendFriends(data,index) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
                  source={data.profile_image==""?Icons.messi:{uri:data.profile_image}}
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
            <View style={{ flex: 3 }}>
              <Text
                style={{
                  color: Colors.black,
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 13
                }}
              >
                {data.full_name}
              </Text>
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
                {data.user_name}
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
                    Cancel Request
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
                <TouchableOpacity style={{ flex: 1 }} onPress={()=>this.doFollowFriend(data,index)}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontFamily: "OpenSans-SemiBold",
                      fontSize: 11,
                      marginStart: 8,
                      marginEnd: 8
                    }}
                  >
                    {data.followstatus == 1
                      ? "Follow"
                      : data.followstatus == 2
                      ? "UnFollow"
                      : "Follow"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  renderReceivedFriends(data,index) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
                  source={data.profile_image==""?Icons.messi:{uri:data.profile_image}}
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
            <View style={{ flex: 3 }}>
              <Text
                style={{
                  color: Colors.black,
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 13
                }}
              >
                {data.full_name}
              </Text>
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
                {data.user_name}
              </Text>
              <View
                style={[
                  styles.row,
                  {
                    alignItems: "center"
                  }
                ]}
              >
                <View  style={{ flex: 1 }}>
                <TouchableOpacity onPress={()=>this.doRequestAction(1)}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontFamily: "OpenSans-SemiBold",
                      fontSize: 11
                    }}
                  >
                    Confirm Request
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={()=>this.doRequestAction(2)} >
                  <Text
                    style={{
                      color: Colors.black,
                      fontFamily: "OpenSans-SemiBold",
                      fontSize: 11
                    }}
                  >
                    Cancel Request
                  </Text>
                </TouchableOpacity> */}
                </View>
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
                <TouchableOpacity style={{ flex: 1 }} onPress={()=>this.doFollowFriend(data,index)}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontFamily: "OpenSans-SemiBold",
                      fontSize: 11,
                      marginStart: 8,
                      marginEnd: 8
                    }}
                  >
                    {data.followstatus == 1
                      ? "Follow"
                      : data.followstatus == 2
                      ? "UnFollow"
                      : "Follow"}
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
        isAllFriends: true,
        isMutualFriends: false,
        isFollowersActive: false
      });
      this.doGetFriendList();
    } else if (tabName == "mutualfriends") {
      this.setState({
        isAllFriends: false,
        isMutualFriends: true,
        isFollowersActive: false
      });
      this.doGetReceivedRequestList();
    } else if (tabName == "followers") {
      this.setState({
        isAllFriends: false,
        isMutualFriends: false,
        isFollowersActive: true
      });
      this.doGetSendRequestList();
    }
  }
  componentDidMount() {
    this.doGetFriendList();
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
              this.setState({data:[] });
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
    fetch(ApiUrl.getCrewList, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.hideProgressbar();
        const message = responseJson.message;
        const status = responseJson.status;

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
            this.setState({ loading: false, refreshing: false,data:[] });
            break;
          }
          case 400: {
            console.log(message);
            this.doShowSnackBar(message);
            this.setState({ loading: false, refreshing: false,data:[] });
            break;
          }
          default: {
            this.setState({ loading: false, refreshing: false,data:[] });
            this.doShowSnackBar(message);
            break;
          }
        }
      })
      .catch(error => {
        this.hideProgressbar();
        console.log(error);
        alert(error);
      });
  }
  doGetSendRequestList() {
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
              this.setState({data:[] });
              this.openProgressbar();
              this.doGetSendRequestListApi(bodyData, myData.token);
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
   
  doGetSendRequestListApi(bodyData, token) {
    const { page, seed } = this.state;
    fetch(ApiUrl.getSendRequestList, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.hideProgressbar();
        const message = responseJson.message;
        const status = responseJson.status;

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
           
            this.setState({ loading: false, refreshing: false,data:[] });
            break;
          }
          case 400: {
            console.log(message);
           
            this.setState({ loading: false, refreshing: false,data:[] });
            break;
          }
          default: {
            console.log(message);
            this.setState({ loading: false, refreshing: false,data:[] });
            break;
          }
        }
      })
      .catch(error => {
        this.hideProgressbar();
        console.log(error);
        alert(error);
      });
  }
  doGetReceivedRequestList() {
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
              this.setState({data:[] });
              this.openProgressbar();
              this.doGetReceivedRequestListApi(bodyData, myData.token);
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
  doGetReceivedRequestListApi(bodyData, token) {
    const { page, seed } = this.state;
    fetch(ApiUrl.getReceivedRequestList, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.hideProgressbar();
        const message = responseJson.message;
        const status = responseJson.status;

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
            this.setState({ loading: false, refreshing: false,data:[] });
            break;
          }
          case 400: {
            console.log(message);
            this.doShowSnackBar(message);
            this.setState({ loading: false, refreshing: false,data:[] });
            break;
          }
          default: {
            this.setState({ loading: false, refreshing: false,data:[] });
            this.doShowSnackBar(message);
            break;
          }
        }
      })
      .catch(error => {
        this.hideProgressbar();
        console.log(error);
        alert(error);
      });
  }
  doFollowFriend(item,index){
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        AsyncStorage.getItem("data")
          .then(data => {
            if (data != null) {
              const myData = JSON.parse(data);

              const bodyData = JSON.stringify({
                user_id: item.id,
                page: 1
              });
              
              this.openProgressbar();
              this.doFollowFriendApi(bodyData, myData.token);
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
  doFollowFriendApi(bodyData,token){
    fetch(ApiUrl.followUser, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body:bodyData
    })
      .then(response => response.json())
      .then(responseJson => {
        this.hideProgressbar();
        const message = responseJson.message;
        const status = responseJson.status;
        console.log(responseJson);
        switch (status) {
          case 200: {
            const result = responseJson.result;

            this.doShowSnackBar(message);

            break;
          }
          case 401: {
            console.log(message);
            this.doShowSnackBar(message);
            
            break;
          }
          case 400: {
            console.log(message);
            this.doShowSnackBar(message);
           
            break;
          }
          default: {
            this.doShowSnackBar(message);
            break;
          }
        }
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
  renderEmpty() {
    return (
      <View>
        <Text
          style={{
            color: Colors.colorEdittext,
            fontFamily: "OpenSans-SemiBold",
            fontSize: 11,
            textAlign: "center"
          }}
        >
          No Data Found
        </Text>
      </View>
    );
  }
  render() {
    return (
      <View style={customstyles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: "#313131",
            height: 40,
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => this.doFriendsChangeTab("allfriends")}
          >
            <View
              style={
                this.state.isAllFriends
                  ? crewtabstyles.FriendsActiveTab
                  : crewtabstyles.FriendsInactiveTab
              }
            >
              <Text
                style={
                  this.state.isAllFriends
                    ? crewtabstyles.FriendsActiveTabText
                    : crewtabstyles.FriendsInactiveTabText
                }
              >
                My Crew
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.doFriendsChangeTab("mutualfriends")}
          >
            <View
              style={
                this.state.isMutualFriends
                  ? crewtabstyles.MutualFriendsActiveTab
                  : crewtabstyles.MutualFriendsInactiveTab
              }
            >
              <Text
                style={
                  this.state.isMutualFriends
                    ? crewtabstyles.MutualFriendsActiveTabText
                    : crewtabstyles.MutualFriendsInactiveTabText
                }
              >
                Received Requests
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.doFriendsChangeTab("followers")}
          >
            <View
              style={
                this.state.isFollowersActive
                  ? crewtabstyles.FollowersActiveTab
                  : crewtabstyles.FollowersInactiveTab
              }
            >
              <Text
                style={
                  this.state.isFollowersActive
                    ? crewtabstyles.FollowersActiveTabText
                    : crewtabstyles.FollowersInactiveTabText
                }
              >
                Sent Requests
              </Text>
            </View>
          </TouchableOpacity>
        </View>
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
        <FlatList
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          bounces={false}
          numColumns={1}
          style={{ marginTop: 8 }}
          data={this.state.data}
          renderItem={({ item, index }) => this.state.isFollowersActive ? this.renderSendFriends(item,index): this.state.isMutualFriends ? this.renderReceivedFriends(item,index): this.renderFriends(item,index)}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled={false}
          ListEmptyComponent={this.renderEmpty()}
        />
        <ProgressCompoment isProgress={this.state.isProgress} />
      </View>
    );
  }
}
const customstyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white }
});
export default MyCrewScreen;
