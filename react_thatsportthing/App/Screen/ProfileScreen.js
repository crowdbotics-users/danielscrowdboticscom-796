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
  FlatList
} from "react-native";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";
import styles from "../Resource/Styles";
import ImagePicker from "react-native-image-crop-picker";
import TabCompoment from "../Compoments/TabCompoment";
import HamburgerIcon from "../Compoments/DrawerIcon";
import ListCompoment from "../Compoments/ListCompoment";
import {
  PagerTabIndicator,
  PagerTitleIndicator,
  PagerDotIndicator,
  ViewPager
} from "rn-viewpager";
import BannerCompoment from "../Compoments/BannerCompoment";
import ProfileTabCompoment from "../Compoments/ProfileTabCompoment";
import PictureTabCompoment from "../Compoments/PictureTabCompoment";
import tabstyles from "../Resource/tabstyles";
import friendstabstyles from "../Resource/friendstabstyles";
import picturetabstyles from "../Resource/picturetabstyles";
import Strings from '../Resource/Strings';
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: props => <HamburgerIcon {...props} props={navigation} />
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      noData:false,
      tabTitle: "Posts",
      columnCount: 1,
      isAllFriends: true,
      isMutualFriends: false,
      isFollowersActive: false,
      isPostActive: true,
      isPicturesActive: false,
      isFriendsActive: false,
      isAllPhotosVideoActive: true,
      isPhotosActive: false,
      isVideoActive: false,
      isLoading: true,
      activeColor: Colors.orange,
      activeTextColor: Colors.white,
      inactiveColor: Colors.white,
      inactiveTextColor: Colors.backgroundLogin,
      avatarSource: "",
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
      filteredData:[],
      dataSource1: [
        {
          name: "Mason SCHUFFER",
          username: "@schufferj",
          location: "New york City,Newyork",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage: Icons.ic_player,
          friendstatus: 1,
          followstatus: 1
        },
        {
          name: "Jacob SCHUFFER",
          username: "@schufferj",
          location: "New york City,Newyork",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage: Icons.ic_player,
          friendstatus: 2,
          followstatus: 1
        },
        {
          name: "William SCHUFFER",
          username: "@schufferj",
          location: "New york City,Newyork",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage: Icons.ic_player,
          friendstatus: 1,
          followstatus: 1
        },
        {
          name: "Ethan SCHUFFER",
          username: "@schufferj",
          location: "New york City,Newyork",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage: Icons.ic_player,
          friendstatus: 1,
          followstatus: 1
        },
        {
          name: "James SCHUFFER",
          username: "@schufferj",
          location: "New york City,Newyork",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage: Icons.ic_player,
          friendstatus: 1
        },
        {
          name: "Alexander SCHUFFER",
          username: "@schufferj",
          location: "New york City,Newyork",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage: Icons.ic_player,
          friendstatus: 1,
          followstatus: 1
        },
        {
          name: "Michael SCHUFFER",
          username: "@schufferj",
          location: "New york City,Newyork",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage: Icons.ic_player,
          friendstatus: 1,
          followstatus: 1
        },
        {
          name: "Benjamin SCHUFFER",
          username: "@schufferj",
          location: "New york City,Newyork",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage: Icons.ic_player,
          friendstatus: 1,
          followstatus: 1
        },
        {
          name: "Elijah SCHUFFER",
          username: "@schufferj",
          location: "New york City,Newyork",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage: Icons.ic_player,
          friendstatus: 1,
          followstatus: 1
        },
        {
          name: "Daniel SCHUFFER",
          username: "@schufferj",
          location: "New york City,Newyork",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage: Icons.ic_player,
          friendstatus: 1,
          followstatus: 1
        }
      ]
    };
    this.setState({filteredData:this.state.dataSource1});
  }

  componentWillMount() {
    this.setState({
      isLoading: false
    });
  }
  renderRow(data) {
    return (
      <View style={[styles.row, { alignItems: "center" }]}>
        <Image
          source={data.image}
          style={{ width: 35, height: 35, marginLeft: 5, marginRight: 5 }}
        />
      </View>
    );
  }

  doPictureChangeTab(tabName) {
    if (tabName == "allphotosvideo") {
      this.setState({
        isAllPhotosVideoActive: true,
        isPhotosActive: false,
        isVideoActive: false
      });
    } else if (tabName == "photos") {
      this.setState({
        isAllPhotosVideoActive: false,
        isPhotosActive: true,
        isVideoActive: false
      });
    } else if (tabName == "videos") {
      this.setState({
        isAllPhotosVideoActive: false,
        isPhotosActive: false,
        isVideoActive: true
      });
    }
  }
  doFriendsChangeTab(tabName) {
    if (tabName == "allfriends") {
      this.setState({
        isAllFriends: true,
        isMutualFriends: false,
        isFollowersActive: false
      });
    } else if (tabName == "mutualfriends") {
      this.setState({
        isAllFriends: false,
        isMutualFriends: true,
        isFollowersActive: false
      });
    } else if (tabName == "followers") {
      this.setState({
        isAllFriends: false,
        isMutualFriends: false,
        isFollowersActive: true
      });
    }
  }
  doChangeTab(tabName) {
    if (tabName == "posts") {
      this.setState({
        tabTitle: "Posts",
        columnCount: 1,
        isPostActive: true,
        isPicturesActive: false,
        isFriendsActive: false
      });
      this.refs.viewPager.setPage(0);
    } else if (tabName == "pictures") {
      this.setState({
        
        tabTitle: "Pictures",
        columnCount: 3,
        isPostActive: false,
        isPicturesActive: true,
        isFriendsActive: false
      });
      this.refs.viewPager.setPage(1);
    } else if (tabName == "friends") {
      this.setState({
       
        tabTitle: "Crew",
        columnCount: 1,
        isPostActive: false,
        isPicturesActive: false,
        isFriendsActive: true
      });
      this.refs.viewPager.setPage(2);
    }
  }
  searchText = (e) => {
    let text = e.toLowerCase()
    let trucks = this.state.dataSource1
    let filteredName = trucks.filter((item) => {
      return item.name.toLowerCase().match(text)
    })
    if (!text || text === '') {
      this.setState({
        filteredData: this.state.dataSource1
      })
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      this.setState({
        noData: true
      })
    } else if (Array.isArray(filteredName)) {
      this.setState({
        noData: false,
        filteredData: filteredName
      })
    }
  }
  render() {
    return (
      <SafeAreaView>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
         
        >
          <View>
            <BannerCompoment
              tabTitle={this.state.tabTitle}
              profilePicture={this.state.avatarSource}
            />
          </View>
          <View>
            <View
              style={{
                height: 70,
                backgroundColor: "#4A4A4A",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center"
              }}
            >
              <ActivityIndicator
                color={Colors.white}
                style={{ display: this.state.isLoading ? "flex" : "none" }}
              />
              <ListView
                style={{ display: this.state.isLoading ? "none" : "flex" }}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                alwaysBounceVertical={false}
                bounces={false}
                dataSource={ds.cloneWithRows(this.state.dataSource)}
                renderRow={this.renderRow.bind(this)}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: Colors.white,
                  fontSize: 10,
                  fontFamily: "OpenSans-SemiBold",
                  marginBottom: 5
                }}
              >
                FAVORITE SPORTS
              </Text>
            </View>
          </View>
          <View>
            <View style={{ backgroundColor: "#414141" }}>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <TouchableOpacity onPress={() => this.doChangeTab("posts")}>
                  <View
                    style={
                      this.state.isPostActive
                        ? tabstyles.PostactiveTab
                        : tabstyles.PostInactiveTab
                    }
                  >
                    <Text
                      style={
                        this.state.isPostActive
                          ? tabstyles.PostactiveTabText
                          : tabstyles.PostInactiveTabText
                      }
                    >
                      Posts
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.doChangeTab("pictures")}>
                  <View
                    style={
                      this.state.isPicturesActive
                        ? tabstyles.PictureactiveTab
                        : tabstyles.PictureInactiveTab
                    }
                  >
                    <Text
                      style={
                        this.state.isPicturesActive
                          ? tabstyles.PictureactiveTabText
                          : tabstyles.PictureInactiveTabText
                      }
                    >
                      Pictures
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.doChangeTab("friends")}>
                  <View
                    style={
                      this.state.isFriendsActive
                        ? tabstyles.FriendsactiveTab
                        : tabstyles.FriendsInactiveTab
                    }
                  >
                    <Text
                      style={
                        this.state.isFriendsActive
                          ? tabstyles.FriendsactiveTabText
                          : tabstyles.FriendsInactiveTabText
                      }
                    >
                      Friends
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ flex: 1 }}>
                <ViewPager
                  ref={"viewPager"}
                  style={{ flex: 1, height: Dimensions.get("screen").height }}
                >
                  <View>
                    <ListCompoment
                      tabTitle={this.state.tabTitle}
                      columns={this.state.columnCount}
                      data={this.state.dataSource1}
                      navigation={this.props.navigation}
                    />
                  </View>
                  <View>
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
                        onPress={() =>
                          this.doPictureChangeTab("allphotosvideo")
                        }
                      >
                        <View
                          style={
                            this.state.isAllPhotosVideoActive
                              ? picturetabstyles.AllPhotosVideoActiveTab
                              : picturetabstyles.AllPhotosVideoInactiveTab
                          }
                        >
                          <Text
                            style={
                              this.state.isAllPhotosVideoActive
                                ? picturetabstyles.AllPhotosVideoActiveTabText
                                : picturetabstyles.AllPhotosVideoInactiveTabText
                            }
                          >
                            {Strings.allphotosvideo}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.doPictureChangeTab("photos")}
                      >
                        <View
                          style={
                            this.state.isPhotosActive
                              ? picturetabstyles.AlbumsActiveTab
                              : picturetabstyles.AlbumsInactiveTab
                          }
                        >
                          <Text
                            style={
                              this.state.isPhotosActive
                                ? picturetabstyles.AlbumsActiveTabText
                                : picturetabstyles.AlbumsInactiveTabText
                            }
                          >
                            {Strings.albums}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.doPictureChangeTab("videos")}
                      >
                        <View
                          style={
                            this.state.isVideoActive
                              ? picturetabstyles.TaggedActiveTab
                              : picturetabstyles.TaggedInactiveTab
                          }
                        >
                          <Text
                            style={
                              this.state.isVideoActive
                                ? picturetabstyles.TaggedActiveTabText
                                : picturetabstyles.TaggedInactiveTabText
                            }
                          >
                           {Strings.tagged}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <ListCompoment
                      tabTitle={this.state.tabTitle}
                      columns={this.state.columnCount}
                      data={this.state.dataSource1}
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
                          onChangeText={(text)=>this.searchText(text)}
                        />
                      </View>
                    </View>
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
                              ? friendstabstyles.FriendsActiveTab
                              : friendstabstyles.FriendsInactiveTab
                          }
                        >
                          <Text
                            style={
                              this.state.isAllFriends
                                ? friendstabstyles.FriendsActiveTabText
                                : friendstabstyles.FriendsInactiveTabText
                            }
                          >
                            All Friends
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.doFriendsChangeTab("mutualfriends")}
                      >
                        <View
                          style={
                            this.state.isMutualFriends
                              ? friendstabstyles.MutualFriendsActiveTab
                              : friendstabstyles.MutualFriendsInactiveTab
                          }
                        >
                          <Text
                            style={
                              this.state.isMutualFriends
                                ? friendstabstyles.MutualFriendsActiveTabText
                                : friendstabstyles.MutualFriendsInactiveTabText
                            }
                          >
                            Mutual Friends
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.doFriendsChangeTab("followers")}
                      >
                        <View
                          style={
                            this.state.isFollowersActive
                              ? friendstabstyles.FollowersActiveTab
                              : friendstabstyles.FollowersInactiveTab
                          }
                        >
                          <Text
                            style={
                              this.state.isFollowersActive
                                ? friendstabstyles.FollowersActiveTabText
                                : friendstabstyles.FollowersInactiveTabText
                            }
                          >
                            Followers
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <ListCompoment
                      tabTitle={this.state.tabTitle}
                      columns={this.state.columnCount}
                      data={this.state.filteredData.length>0?this.state.filteredData:this.state.dataSource1}
                      noData={this.state.noData}
                      navigation={this.props.navigation}
                    />
                  </View>
                </ViewPager>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default ProfileScreen;
