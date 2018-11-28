import React, { Component } from "react";
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
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";
import styles from "../Resource/Styles";
import HamburgerIcon from "../Compoments/HamburgerIcon";
import ListCompoment from "../Compoments/ListCompoment";
import { ViewPager, IndicatorViewPager } from "rn-viewpager";
import BannerCompoment from "../Compoments/BannerCompoment";
import hometabstyles from "../Resource/hometabstyles";
import WritePostCompoment from "../Compoments/WritePostCompoment";
import CollapseView from "react-native-collapse-view";
import searchtabstyles from "../Resource/searchtabstyles";
import ApiUrl from "../Network/ApiUrl";
import ProgressCompoment from "../Compoments/ProgressCompoment";
import StreamListComponent from "../Compoments/StreamListCompoment";
import PostListComponent from "../Compoments/PostListCompoment";
import TryAgainComponent from "../Compoments/TryAgainComponent";
import HomeBannerCompoment from "../Compoments/HomeBannerCompoment";

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class HomeTabScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: props => (
        <HamburgerIcon {...props} props={navigation} isProfile={false} />
      )
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      isProgress: false,
      noData: false,
      isError: false,
      full_name: "",
      profile_image: "",
      cover_image: "",
      follower_count: 0,
      crew_count: 0,
      post_count: 0,
      user_name: "",
      tabTitle: "Stream",
      columnCount: 1,
      isStreamActive: true,
      isFriendsPostActive: false,
      isSearchActive: false,
    
      activeColor: Colors.orange,
      activeTextColor: Colors.white,
      inactiveColor: Colors.white,
      inactiveTextColor: Colors.backgroundLogin,
      avatarSource: "",
      isPeopleActive: true,
      isPostActive: false,
      isSportActive: false,
      isPageActive: false,
      isLocationActive: false,
      dataSource: [
        {
          companyname: "ADIDAS",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "100 Points",
          image: Icons.ball5
        },
        {
          companyname: "NIKE",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "08 Points",
          image: Icons.ball2
        },
        {
          companyname: "THE BAY",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "20 Points",
          image: Icons.ball3
        },
        {
          companyname: "ZARA",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "06 Points",
          image: Icons.ball4
        },
        {
          companyname: "BEST BUY",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "15 Points",
          image: Icons.ball1
        }
      ],
      filteredData: [],
      postData: []
    };
  }

  componentWillMount() {
  
  }
  getPostList() {
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

              this.openProgressbar();
              this.getPostListApi(postData);
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
  getPostListApi(bodyData) {
    fetch(ApiUrl.getPosts, bodyData)
      .then(response => response.json())
      .then(responseJson => {
     

        this.hideProgressbar();
        const message = responseJson.message;
        const status = responseJson.status;

        switch (status) {
          case 200: {
            const result = responseJson.result;

            this.setState({
              postData: result.data
            });

            break;
          }
          case 401: {
            this.setState({
             isError: false
            });
            alert(message);
        
            break;
          }
          case 400: {
            this.setState({
              isError: false
            });
            alert(message);
         
            break;
          }
        }
      })
      .catch(error => {
        this.hideProgressbar();
        this.setState({
         isError: false
        });
      });
  }
  renderRow(data) {
    return (
      <View style={[styles.row, { alignItems: "center" }]}>
        <Image
          source={data.image}
          style={{ width: 50, height: 50, margin: 5 }}
        />
      </View>
    );
  }
  componentDidMount() {
    this.doGetUserInfo();
    this.getPostList();
  }
  openProgressbar = () => {
    this.setState({ isProgress: true });
  };
  hideProgressbar = () => {
    this.setState({ isProgress: false });
  };

  doGetUserInfo() {
    AsyncStorage.getItem("data")
      .then(data => {
        if (data != null) {
          const myData = JSON.parse(data);
          this.setState({
            full_name: myData.full_name,
            profilePicture: myData.profile_image,
            coverPicture: myData.cover_image,
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
  doSearchChangeTab(tabName) {
    if (tabName == "people") {
      this.setState({
        isPeopleActive: true,
        isPostActive: false,
        isSportActive: false,
        isPageActive: false,
        isLocationActive: false
      });
    } else if (tabName == "post") {
      this.setState({
        isPeopleActive: false,
        isPostActive: true,
        isSportActive: false,
        isPageActive: false,
        isLocationActive: false
      });
    } else if (tabName == "sport") {
      this.setState({
        isPeopleActive: false,
        isPostActive: false,
        isSportActive: true,
        isPageActive: false,
        isLocationActive: false
      });
    } else if (tabName == "page") {
      this.setState({
        isPeopleActive: false,
        isPostActive: false,
        isSportActive: false,
        isPageActive: true,
        isLocationActive: false
      });
    } else if (tabName == "location") {
      this.setState({
        isPeopleActive: false,
        isPostActive: false,
        isSportActive: false,
        isPageActive: false,
        isLocationActive: true
      });
    }
  }
  doChangeTab(tabName) {
    if (tabName == "stream") {
      this.setState({
        tabTitle: "Stream",
        columnCount: 1,
        isStreamActive: true,
        isFriendsPostActive: false,
        isSearchActive: false
      });
      this.refs.viewPager.setPage(0);
    } else if (tabName == "friendspost") {
      this.setState({
        tabTitle: "Friends's Post",
        columnCount: 1,
        isStreamActive: false,
        isFriendsPostActive: true,
        isSearchActive: false
      });
      this.refs.viewPager.setPage(1);
    } else if (tabName == "search") {
      this.setState({
        tabTitle: "Search",
        columnCount: 1,
        isStreamActive: false,
        isFriendsPostActive: false,
        isSearchActive: true
      });
      this.refs.viewPager.setPage(2);
    }
  }

  renderFooter(data) {
    return (
      <View style={[styles.row, { alignItems: "center" }]}>
        <Image
          source={Icons.ic_add}
          style={{ width: 50, height: 50, margin: 5 }}
        />
      </View>
    );
  }
  _renderView = collapse => {
    return (
      <View>
        <View
          style={{
            position: "relative",
            marginTop: 20,
            marginBottom: 15
          }}
        >
          <View style={{ position: "relative" }}>
            <View
              style={{
                height: 2,
                width: "100%",
                backgroundColor: Colors.bgHeader
              }}
            />
          </View>
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              bottom: -10,
              justifyContent: "center",
              alignContent: "center"
            }}
          >
            <View
              style={{
                backgroundColor: Colors.bgHeader,
                borderRadius: 10,
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Image
                source={
                  collapse ? Icons.ic_up_arrow_white : Icons.ic_down_arrow_white
                }
                style={{ width: 15, height: 9, margin: 3 }}
              />
              <Text
                style={{
                  color: Colors.white,
                  padding: 1,
                  margin: 1
                }}
              >
                Advanced Search
              </Text>
              <Image
                source={
                  collapse ? Icons.ic_up_arrow_white : Icons.ic_down_arrow_white
                }
                style={{ width: 15, height: 9, margin: 3 }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };
  _renderCollapseView = collapse => {
    return (
      <View style={customstyles.collapseView}>
        <Text style={{ color: Colors.white, fontFamily: "OpenSans-SemiBold" }}>
          Search for..
        </Text>
        <View style={[styles.row, { marginTop: 5 }]}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.doSearchChangeTab("people")}
          >
            <View
              style={
                this.state.isPeopleActive
                  ? searchtabstyles.PeopleActiveTab
                  : searchtabstyles.PeopleInactiveTab
              }
            >
              <Text
                style={
                  this.state.isPeopleActive
                    ? searchtabstyles.PeopleActiveTabText
                    : searchtabstyles.PeopleInactiveTabText
                }
              >
                People
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.doSearchChangeTab("post")}
          >
            <View
              style={
                this.state.isPostActive
                  ? searchtabstyles.PostActiveTab
                  : searchtabstyles.PostInactiveTab
              }
            >
              <Text
                style={
                  this.state.isPostActive
                    ? searchtabstyles.PostActiveTabText
                    : searchtabstyles.PostInactiveTabText
                }
              >
                Post
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.doSearchChangeTab("sport")}
          >
            <View
              style={
                this.state.isSportActive
                  ? searchtabstyles.SportActiveTab
                  : searchtabstyles.SportInactiveTab
              }
            >
              <Text
                style={
                  this.state.isSportActive
                    ? searchtabstyles.SportActiveTabText
                    : searchtabstyles.SportInactiveTabText
                }
              >
                Sport
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.doSearchChangeTab("page")}
          >
            <View
              style={
                this.state.isPageActive
                  ? searchtabstyles.PageActiveTab
                  : searchtabstyles.PageInactiveTab
              }
            >
              <Text
                style={
                  this.state.isPageActive
                    ? searchtabstyles.PageActiveTabText
                    : searchtabstyles.PageInactiveTabText
                }
              >
                Page
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.doSearchChangeTab("location")}
          >
            <View
              style={
                this.state.isLocationActive
                  ? searchtabstyles.LocationActiveTab
                  : searchtabstyles.LocationInactiveTab
              }
            >
              <Text
                style={
                  this.state.isLocationActive
                    ? searchtabstyles.LocationActiveTabText
                    : searchtabstyles.LocationInactiveTabText
                }
              >
                Location
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  searchText = e => {
    let text = e.toLowerCase();
    let trucks = this.state.postData;
    let filteredName = trucks.filter(item => {
      return item.name.toLowerCase().match(text);
    });
    if (!text || text === "") {
      this.setState({
        filteredData: this.state.postData
      });
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      this.setState({
        noData: true
      });
    } else if (Array.isArray(filteredName)) {
      this.setState({
        noData: false,
        filteredData: filteredName
      });
    }
  };
  render() {
    return (
      <SafeAreaView>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
        >
          <View style={{ flex: 1 }}>
            <HomeBannerCompoment
             
              navigation={this.props.navigation}
              full_name={this.state.full_name}
              profile_image={this.state.profile_image}
              cover_image={this.state.cover_image}
              user_name={this.state.user_name}
              follower_count={this.state.follower_count}
              crew_count={this.state.crew_count}
            />

            <ProgressCompoment isProgress={this.state.isProgress} />
            <TryAgainComponent
              shown={this.state.isError}
              navigation={this.props.navigation}
            />
          </View>
          <View>
            <View
              style={{
                height: 80
              }}
            >
              <ImageBackground
                source={Icons.bg_fav}
                style={{
                  width: "100%",
                  height: 80,
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center"
                }}
              >
                
                
                <ListView
                
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                  alwaysBounceVertical={false}
                  bounces={false}
                  dataSource={ds.cloneWithRows(this.state.dataSource)}
                  renderRow={this.renderRow.bind(this)}
                  renderFooter={this.renderFooter.bind(this)}
                />
                <Text
                  style={{
                    textAlign: "center",
                    color: Colors.black,
                    fontSize: 9,
                    fontFamily: "OpenSans-SemiBold"
                  }}
                >
                  FAVORITES
                </Text>
              </ImageBackground>
            </View>
          </View>

          <View style={{ backgroundColor: "#414141", flexDirection: "column" }}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                backgroundColor: Colors.bgHeader,
                padding: 3
              }}
            >
              <TouchableOpacity onPress={() => this.doChangeTab("stream")}>
                <View
                  style={
                    this.state.isStreamActive
                      ? hometabstyles.StreamActiveTab
                      : hometabstyles.StreamInactiveTab
                  }
                >
                  <Text
                    style={
                      this.state.isStreamActive
                        ? hometabstyles.StreamActiveTabText
                        : hometabstyles.StreamInactiveTabText
                    }
                  >
                    Stream
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.doChangeTab("friendspost")}>
                <View
                  style={
                    this.state.isFriendsPostActive
                      ? hometabstyles.FriendsPostActiveTab
                      : hometabstyles.FriendsPostInactiveTab
                  }
                >
                  <Text
                    style={
                      this.state.isFriendsPostActive
                        ? hometabstyles.FriendsPostActiveTabText
                        : hometabstyles.FriendsPostInactiveTabText
                    }
                  >
                    My Posts
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.doChangeTab("search")}>
                <View
                  style={
                    this.state.isSearchActive
                      ? hometabstyles.SearchActiveTab
                      : hometabstyles.SearchInactiveTab
                  }
                >
                  <Text
                    style={
                      this.state.isSearchActive
                        ? hometabstyles.SearchActiveTabText
                        : hometabstyles.SearchInactiveTabText
                    }
                  >
                    Search
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <ViewPager
                style={{ height: Dimensions.get("screen").height }}
                ref={"viewPager"}
                initialPage={this.state.currentTab}
              >
                <View>
                  <WritePostCompoment navigation={this.props.navigation} />
                  <StreamListComponent
                    streams={this.state.postData}
                    navigation={this.props.navigation}
                  />
                </View>
                <View>
                  <WritePostCompoment navigation={this.props.navigation} />
                  <PostListComponent
                    posts={this.state.postData}
                    navigation={this.props.navigation}
                  />
                </View>
                <View>
                  <View>
                    <View
                      style={{
                        alignItems: "center",
                        backgroundColor: "#313131",
                        flexDirection: "row",
                        padding: Platform.OS == "android" ? 0 : 10,
                        borderColor: Colors.colorSearch,
                        marginTop: 15,
                        margin: 10,
                        borderRadius: 5
                      }}
                    >
                      <Image
                        source={Icons.ic_search}
                        style={{
                          width: 24,
                          height: 24,
                          marginLeft: 10,
                          marginRight: 5
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
                        placeholderTextColor={Colors.colorSearch}
                        underlineColorAndroid={Colors.transparent}
                        onChangeText={text => this.searchText(text)}
                      />
                    </View>
                  </View>

                  <CollapseView
                    renderCollapseView={this._renderCollapseView}
                    renderView={this._renderView}
                  />
                  <ListCompoment
                    tabTitle={this.state.tabTitle}
                    columns={this.state.columnCount}
                    streams={this.state.postData}
                    data={
                      this.state.filteredData.length > 0
                        ? this.state.filteredData
                        : this.state.postData
                    }
                    noData={this.state.noData}
                    navigation={this.props.navigation}
                  />
                </View>
              </ViewPager>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const customstyles = StyleSheet.create({
  collapseView: {
    backgroundColor: Colors.black,
    paddingTop: 10,
    paddingStart: 10,
    paddingEnd: 10,
    height: 70
  }
});
export default HomeTabScreen;
