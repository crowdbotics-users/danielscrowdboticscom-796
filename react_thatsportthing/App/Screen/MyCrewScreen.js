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
  FlatList
} from "react-native";
import Colors from "../Resource/Colors";
import CrewHeaderCompoment from "../Compoments/CrewHeaderCompoment";
import crewtabstyles from "../Resource/crewtabstyles";
import Icons from "../Resource/Icons";
import styles from "../Resource/Styles";
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
      isAllFriends: true,
      isMutualFriends: false,
      isFollowersActive: false,
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
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: Colors.colorLine,
          
        }}
      />
    );
  };
  renderFriends(data) {
    return (
      <SafeAreaView style={{flex:1}}>
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
                  source={data.image}
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
                {data.name}
              </Text>
              <Text
                style={{
                  color: "#6C6C6C",
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 12
                }}
              >
                {data.location}
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 12
                }}
              >
                {data.username}
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
          data={this.state.dataSource1}
          renderItem={({ item, index }) => this.renderFriends(item)}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={item => item}
          nestedScrollEnabled={false}
        />
      </View>
    );
  }
}
const customstyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white }
});
export default MyCrewScreen;
