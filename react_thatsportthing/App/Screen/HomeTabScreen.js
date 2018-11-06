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
      tabTitle:'',
      columnCount:1,
      isStreamActive: true,
      isFriendsPostActive: false,
      isSearchActive: false,
      isPostActive: false,
      isPicturesActive: false,
      isFriendsActive: false,
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
          playerImage:Icons.ic_player,
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage:Icons.ic_player,
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage:Icons.ic_player,
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage:Icons.ic_player,
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage:Icons.ic_player,
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage:Icons.ic_player,
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage:Icons.ic_player,
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage:Icons.ic_player,
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage:Icons.ic_player,
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi,
          playerImage:Icons.ic_player,
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

  doChangeTab(tabName) {
    if (tabName == "stream") {
      this.setState({
        tabTitle:'Stream',
        columnCount:1,
        isStreamActive: true,
        isFriendsPostActive: false,
        isSearchActive: false,
        isPostActive: false,
        isPicturesActive: false,
        isFriendsActive: false
      });
    } else if (tabName == "friendspost") {
      this.setState({
        tabTitle:"Friends's Post",
        columnCount:1,
        isStreamActive: false,
        isFriendsPostActive: true,
        isSearchActive: false,
        isPostActive: false,
        isPicturesActive: false,
        isFriendsActive: false
      });
    } else if (tabName == "search") {
      this.setState({
        tabTitle:'Search',
        columnCount:1,
        isStreamActive: false,
        isFriendsPostActive: false,
        isSearchActive: true,
        isPostActive: false,
        isPicturesActive: false,
        isFriendsActive: false
      });
    } else if (tabName == "posts") {
      this.setState({
        tabTitle:'Posts',
        columnCount:1,
        isStreamActive: false,
        isFriendsPostActive: false,
        isSearchActive: false,
        isPostActive: true,
        isPicturesActive: false,
        isFriendsActive: false
      });
    } else if (tabName == "pictures") {
      this.setState({
        tabTitle:'Pictures',
        columnCount:3,
        isStreamActive: false,
        isFriendsPostActive: false,
        isSearchActive: false,
        isPostActive: false,
        isPicturesActive: true,
        isFriendsActive: false
      });
    } else if (tabName == "friends") {
      this.setState({
        tabTitle:'Crew',
        columnCount:1,
        isStreamActive: false,
        isFriendsPostActive: false,
        isSearchActive: false,
        isPostActive: false,
        isPicturesActive: false,
        isFriendsActive: true
      });
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
            <ImageBackground
              source={Icons.toolbarbg}
              style={{ height: 180, backgroundColor: Colors.black }}
            >
              <View
                style={{
                  backgroundColor: Colors.black,
                  flexDirection: "row",
                  flex: 1
                }}
              >
                <View style={{ flex: 1, backgroundColor: Colors.bgHeader }}>
                  <ImageBackground
                    resizeMode="cover"
                    source={Icons.toolbarbg}
                    style={{ height: 180, justifyContent: "center" }}
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
                          this.state.avatarSource == ""
                            ? Icons.messi
                            : { uri: this.state.avatarSource }
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
                  </ImageBackground>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center"
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                      borderBottomColor: "#707070",
                      paddingBottom: 5,
                      marginStart: 10,
                      marginEnd: 10,
                      marginTop: 10,
                      borderBottomWidth: 1
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: Colors.white,
                        fontFamily: "OpenSans-SemiBold",
                        fontSize: 16
                      }}
                    >
                      JOHN SCHUFFER
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        color: Colors.white,
                        fontSize: 11,
                        fontFamily: "OpenSans-SemiBold"
                      }}
                    >
                      @schufferj
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                      borderBottomColor: "#707070",
                      paddingBottom: 5,
                      marginTop: 10,
                      marginStart: 10,
                      marginEnd: 10,
                      borderBottomWidth: 1,
                      flexDirection: "row"
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          textAlign: "center",
                          color: Colors.white,
                          fontFamily: "OpenSans-SemiBold",
                          fontSize: 16
                        }}
                      >
                        199
                      </Text>
                      <Text
                        style={{
                          textAlign: "center",
                          color: Colors.white,
                          fontSize: 11,
                          fontFamily: "OpenSans-SemiBold"
                        }}
                      >
                        posts
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          textAlign: "center",
                          color: Colors.white,
                          fontFamily: "OpenSans-SemiBold",
                          fontSize: 16
                        }}
                      >
                        109
                      </Text>
                      <Text
                        style={{
                          textAlign: "center",
                          color: Colors.white,
                          fontSize: 11,
                          fontFamily: "OpenSans-SemiBold"
                        }}
                      >
                        friends
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          textAlign: "center",
                          color: Colors.white,
                          fontFamily: "OpenSans-SemiBold",
                          fontSize: 16
                        }}
                      >
                        199
                      </Text>
                      <Text
                        style={{
                          textAlign: "center",
                          color: Colors.white,
                          fontSize: 11,
                          fontFamily: "OpenSans-SemiBold"
                        }}
                      >
                        followers
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <View
                      style={{
                        justifyContent: "center",
                        alignContent: "center",
                        flexDirection: "row",
                        marginTop: 10,
                        alignItems: "center"
                      }}
                    >
                      <Image
                        source={Icons.ic_edit_profile}
                        style={styles.icon}
                      />
                      <Text
                        style={{
                          textAlign: "center",
                          color: Colors.white,
                          fontSize: 14,
                          fontFamily: "OpenSans-SemiBold",
                          marginStart: 5
                        }}
                      >
                        Edit Profile
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
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
              <ListCompoment
                tabTitle={this.state.tabTitle}
                columns={this.state.columnCount}
                data={this.state.dataSource1}
              />
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
