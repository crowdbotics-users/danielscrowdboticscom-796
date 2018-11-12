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
  IndicatorViewPager,
  PagerTitleIndicator,
  PagerDotIndicator,
  ViewPager
} from "rn-viewpager";
import BannerCompoment from "../Compoments/BannerCompoment";
import PictureTabCompoment from "../Compoments/PictureTabCompoment";

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class HomeTabScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: props => <HamburgerIcon {...props} props={navigation} />
    };
  };
  constructor(props) {
    super(props);
    StatusBar.setHidden(false);
    this.state = {
      currentTab: 0,
      tabTitle: "Stream",
      columnCount: 1,
      isStreamActive: true,
      isFriendsPostActive: false,
      isSearchActive: false,
      isPostActive: false,
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
      dataSource1: [
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage: Icons.ic_player
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage: Icons.ic_player
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage: Icons.ic_player
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage: Icons.ic_player
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage: Icons.ic_player
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage: Icons.ic_player
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage: Icons.ic_player
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage: Icons.ic_player
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage: Icons.ic_player
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage: Icons.ic_player
        }
      ],
      pictures: [
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi
        }
      ]
    };
  }
  pickSingle(cropit, circular = true) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 640,
      compressImageQuality: 0.5,
      includeExif: true
    })
      .then(image => {
        this.setState({
          avatarSource: image.path
        });
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime
          },
          images: null
        });
      })
      .catch(e => {
        console.log(e);
        alert(e.message ? e.message : e);
      });
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
          style={{ width: 50, height: 50, margin: 5 }}
        />
      </View>
    );
  }
  changeButtonColor() {}
  _renderTabIndicator() {
    let tabs = [
      {
        text: "Home",
        iconSource: Icons.ic_home,
        selectedIconSource: Icons.ic_home
      },
      {
        text: "Message",
        iconSource: Icons.ic_home,
        selectedIconSource: Icons.ic_home
      },
      {
        text: "Profile",
        iconSource: Icons.ic_home,
        selectedIconSource: Icons.ic_home
      }
    ];
    return <PagerTabIndicator tabs={tabs} />;
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
  doChangeTab(tabName) {
    if (tabName == "stream") {
      this.setState({
        tabTitle: "Stream",
        columnCount: 1,
        isStreamActive: true,
        isFriendsPostActive: false,
        isSearchActive: false,
        isPostActive: false,
        isPicturesActive: false,
        isFriendsActive: false
      });
      this.refs.viewPager.setPage(0);
    } else if (tabName == "friendspost") {
      this.setState({
        tabTitle: "Friends's Post",
        columnCount: 1,
        isStreamActive: false,
        isFriendsPostActive: true,
        isSearchActive: false,
        isPostActive: false,
        isPicturesActive: false,
        isFriendsActive: false
      });
      this.refs.viewPager.setPage(1);
    } else if (tabName == "search") {
      this.setState({
        tabTitle: "Search",
        columnCount: 1,
        isStreamActive: false,
        isFriendsPostActive: false,
        isSearchActive: true,
        isPostActive: false,
        isPicturesActive: false,
        isFriendsActive: false
      });
      this.refs.viewPager.setPage(2);
    } else if (tabName == "posts") {
      this.setState({
        tabTitle: "Posts",
        columnCount: 1,
        isStreamActive: false,
        isFriendsPostActive: false,
        isSearchActive: false,
        isPostActive: true,
        isPicturesActive: false,
        isFriendsActive: false
      });
      this.refs.viewPager.setPage(3);
    } else if (tabName == "pictures") {
      this.setState({
        currentTab: 4,
        tabTitle: "Pictures",
        columnCount: 3,
        isStreamActive: false,
        isFriendsPostActive: false,
        isSearchActive: false,
        isPostActive: false,
        isPicturesActive: true,
        isFriendsActive: false
      });
      this.refs.viewPager.setPage(4);
    } else if (tabName == "friends") {
      this.setState({
        currentTab: 5,
        tabTitle: "Crew",
        columnCount: 1,
        isStreamActive: false,
        isFriendsPostActive: false,
        isSearchActive: false,
        isPostActive: false,
        isPicturesActive: false,
        isFriendsActive: true
      });
      this.refs.viewPager.setPage(5);
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
  render() {
    return (
      <SafeAreaView>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          nestedScrollEnabled={true}
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
                height: 80,
                backgroundColor: "#BABABA",
                justifyContent: "center",
                alignContent: "center"
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
                renderFooter={this.renderFooter.bind(this)}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: Colors.white,
                  fontSize: 11,
                  fontFamily: "OpenSans-SemiBold"
                }}
              >
                FAVORITE SPORTS
              </Text>
            </View>
          </View>
          <View>
            <View style={{ backgroundColor: "#414141" }}>
              <ScrollView horizontal={true}>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <TouchableOpacity onPress={() => this.doChangeTab("stream")}>
                    <TabCompoment
                      tabTitle="Stream"
                      tabActive={this.state.isStreamActive}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.doChangeTab("friendspost")}
                  >
                    <TabCompoment
                      tabTitle="Friends's Post"
                      tabActive={this.state.isFriendsPostActive}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.doChangeTab("search")}>
                    <TabCompoment
                      tabTitle="Search"
                      tabActive={this.state.isSearchActive}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.doChangeTab("posts")}>
                    <TabCompoment
                      tabTitle="Posts"
                      tabActive={this.state.isPostActive}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.doChangeTab("pictures")}
                  >
                    <TabCompoment
                      tabTitle="Pictures"
                      tabActive={this.state.isPicturesActive}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.doChangeTab("friends")}>
                    <TabCompoment
                      tabTitle="Crew"
                      tabActive={this.state.isFriendsActive}
                    />
                  </TouchableOpacity>
                </View>
              </ScrollView>
              <View style={{ flex: 1 }}>
                <ViewPager
                  scrollEnabled={false}
                  ref={"viewPager"}
                  initialPage={this.state.currentTab}
                  style={{ flex: 1, height: Dimensions.get("screen").height }}
                >
                  <View>
                    <ListCompoment
                      tabTitle={this.state.tabTitle}
                      columns={this.state.columnCount}
                      data={this.state.dataSource1}
                    />
                  </View>
                  <View>
                    <ListCompoment
                      tabTitle={this.state.tabTitle}
                      columns={this.state.columnCount}
                      data={this.state.dataSource1}
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
                        />
                      </View>
                    </View>
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
                            source={Icons.ic_down_arrow_white}
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
                            source={Icons.ic_down_arrow_white}
                            style={{ width: 15, height: 9, margin: 3 }}
                          />
                        </View>
                      </View>
                    </View>
                    <ListCompoment
                      tabTitle={this.state.tabTitle}
                      columns={this.state.columnCount}
                      data={this.state.dataSource1}
                    />
                  </View>
                  <View>
                    <ListCompoment
                      tabTitle={this.state.tabTitle}
                      columns={this.state.columnCount}
                      data={this.state.dataSource1}
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
                        <PictureTabCompoment
                          tabTitle="All Photos and Videos"
                          tabActive={this.state.isAllPhotosVideoActive}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.doPictureChangeTab("photos")}
                      >
                        <PictureTabCompoment
                          tabTitle="Albums"
                          tabActive={this.state.isPhotosActive}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.doPictureChangeTab("videos")}
                      >
                        <PictureTabCompoment
                          tabTitle="Tagged"
                          tabActive={this.state.isVideoActive}
                        />
                      </TouchableOpacity>
                    </View>
                    <ListCompoment
                      tabTitle={this.state.tabTitle}
                      columns={this.state.columnCount}
                      data={this.state.dataSource1}
                    />
                  </View>
                  <View>
                    
                    <ListCompoment
                      tabTitle={this.state.tabTitle}
                      columns={this.state.columnCount}
                      data={this.state.dataSource1}
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
const customstyles = StyleSheet.create({
  buttonView: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    marginTop: 10
  },
  button: {
    flex: 1,
    backgroundColor: Colors.white,

    alignItems: "center",
    width: Dimensions.get("screen").width / 3,

    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  centerbutton: {
    flex: 1,
    backgroundColor: Colors.white,

    alignItems: "center",
    width: Dimensions.get("screen").width / 3,

    justifyContent: "center",
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5
  },
  backbutton: {
    flex: 1,

    backgroundColor: "#F49C20",
    width: Dimensions.get("screen").width / 3,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  backbuttonText: {
    textAlign: "center",
    fontSize: 15,
    color: Colors.white
  },

  centerbuttonText: {
    textAlign: "center",
    fontSize: 15,
    color: Colors.backgroundLogin
  },
  buttonText: {
    textAlign: "center",
    fontSize: 15,
    color: Colors.backgroundLogin
  },
  editText: { color: Colors.white, fontSize: 18 },
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
export default HomeTabScreen;
