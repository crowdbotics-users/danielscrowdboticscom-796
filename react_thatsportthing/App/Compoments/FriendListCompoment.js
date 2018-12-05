import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import Colors from "../Resource/Colors";
import styles from "../Resource/Styles";
import Icons from "../Resource/Icons";
import GridView from "react-native-gridview";
import Moment from "moment";
class FriendListComponent extends Component {
  doRedirect(screen,data) {
    this.props.navigation.navigate(screen, { data: data });
  }
  doCommentList(data) {
    this.props.navigation.navigate("CommentListScreen", { data: data });
  }
  
  renderFriends(data) {
    return (
      <SafeAreaView>
        <View
          style={[
            styles.column,
            styles.card,
            { alignItems: "center", marginBottom: 0.5, borderRadius: 0 }
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
                      ? "Unfriend"
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
 

  render() {
    return (
      <View>
        <FlatList
          alwaysBounceVertical={false}
          bounces={false}
          numColumns={1}
          style={{ marginTop: 8 }}
          data={this.props.friendList}
          renderItem={({ item, index }) => this.renderFriends(item)}
          keyExtractor={ (item, index) => index.toString()}
          nestedScrollEnabled={false}
        />
      </View>
    );
  }
}
const Liststyles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 10,
    paddingTop: Platform.OS === "ios" ? 20 : 0
  },

  GridViewBlockStyle: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.transparent,
    margin: 2,
    overflow: "hidden"
  },
  GridViewInsideTextItemStyle: {
    color: "#fff",
    padding: 10,
    fontSize: 18,
    justifyContent: "center"
  }
});
FriendListComponent.propTypes = {
  friendList: PropTypes.array,
  navigation: PropTypes.object
};
export default FriendListComponent;
