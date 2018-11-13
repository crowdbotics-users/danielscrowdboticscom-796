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

class ListCompoment extends Component {
  doRedirect(data){
    this.props.navigation.navigate("ProfileScreen",{data:data});
  }
  renderStream(data) {
    return (
      <SafeAreaView>
        <View
          style={[
            styles.column,
            styles.card,
            { alignItems: "center", marginBottom: 8, borderRadius: 10 }
          ]}
        >
          <View
            style={[
              styles.row,
              { justifyContent: "center", alignItems: "center" }
            ]}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
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
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  borderWidth: 1.5,
                  borderColor: "#D1D0D0",
                  alignSelf: "center"
                }}
              />
            </View>
            <TouchableOpacity onPress={()=>this.doRedirect(data)} style={{flex: 1,}}>
              <Text
                style={{
                  
                  color: Colors.black,
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 13
                }}
              >
                {data.name}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.black,
                fontFamily: "OpenSans-SemiBold",
                fontSize: 13,
                marginRight: 8
              }}
            >
              {data.time}
            </Text>
          </View>
          <Text
            style={{
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 8,
              marginRight: 8,
              color: "#6C6C6C",

              fontSize: 12
            }}
          >
            {data.description}
          </Text>
          <View
            style={[
              styles.row,
              { justifyContent: "center", alignItems: "center", marginLeft: 8 }
            ]}
          >
            <Image
              source={Icons.ic_like}
              style={{
                width: 20,
                height: 20
              }}
            />

            <Text
              style={{
                marginLeft: 5,
                color: Colors.black,
                fontFamily: "OpenSans-SemiBold",
                fontSize: 12
              }}
            >
              Like ({data.likes})
            </Text>
            <Image
              source={Icons.ic_comment}
              style={{
                width: 20,
                height: 20,
                marginLeft: 10,
                margin: 8
              }}
            />

            <Text
              style={{
                flex: 1,

                color: Colors.black,
                fontFamily: "OpenSans-SemiBold",
                fontSize: 12
              }}
            >
              Comment ({data.commnets})
            </Text>
            <Image
              source={Icons.ic_share}
              style={{
                width: 20,
                height: 20,
                margin: 8,
                marginRight: 8
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
  renderPost(data) {
    return (
      <SafeAreaView>
        <View
          style={[
            styles.column,
            styles.card,
            { alignItems: "center", marginBottom: 8, borderRadius: 10 }
          ]}
        >
          <View
            style={[
              styles.row,
              { justifyContent: "center", alignItems: "center" }
            ]}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
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
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  borderWidth: 1.5,
                  borderColor: "#D1D0D0",
                  alignSelf: "center"
                }}
              />
            </View>
            <TouchableOpacity style={{flex:1}}>
              <Text
                style={{
                  
                  color: Colors.black,
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 13
                }}
              >
                {data.name}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.black,
                fontFamily: "OpenSans-SemiBold",
                fontSize: 13,
                marginRight: 8
              }}
            >
              {data.time}
            </Text>
          </View>
          <Text
            style={{
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 8,
              marginRight: 8,
              color: "#6C6C6C",

              fontSize: 12
            }}
          >
            {data.description}
          </Text>
          <View
            style={[
              styles.row,
              { justifyContent: "center", alignItems: "center", marginLeft: 8 }
            ]}
          >
            <Image
              source={Icons.ic_like}
              style={{
                width: 20,
                height: 20
              }}
            />

            <Text
              style={{
                marginLeft: 5,
                color: Colors.black,
                fontFamily: "OpenSans-SemiBold",
                fontSize: 12
              }}
            >
              Like ({data.likes})
            </Text>
            <Image
              source={Icons.ic_comment}
              style={{
                width: 20,
                height: 20,
                marginLeft: 10,
                margin: 8
              }}
            />

            <Text
              style={{
                flex: 1,

                color: Colors.black,
                fontFamily: "OpenSans-SemiBold",
                fontSize: 12
              }}
            >
              Comment ({data.commnets})
            </Text>
            <Image
              source={Icons.ic_share}
              style={{
                width: 20,
                height: 20,
                margin: 8,
                marginRight: 8
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
  renderFriends(data) {
    return (
      <SafeAreaView>
        <View
          style={[
            styles.column,
            styles.card,
            { alignItems: "center", marginBottom: 8, borderRadius: 10 }
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
                  width: 80,
                  height: 80,
                  borderRadius: 40,
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
                    width: 74,
                    height: 74,
                    borderRadius: 37,
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

                <TouchableOpacity>
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
                <TouchableOpacity>
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
                <Image
                  source={Icons.ic_share}
                  style={{
                    width: 20,
                    height: 20,
                    marginStart: 8,
                    marginEnd: 8
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  renderPictures(data) {
    return (
      <View style={Liststyles.GridViewBlockStyle}>
        <Image
          resizeMode="contain"
          resizeMethod="scale"
          style={{
            width: Dimensions.get("screen").width / 3,
            height: Dimensions.get("screen").width / 3
          }}
          source={Icons.ic_player}
        />
      </View>
    );
  }
  render() {
    if (this.props.tabTitle == "Stream" || this.props.tabTitle == "Friends's Post" || this.props.tabTitle == "Search") {
      return (
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            bounces={false}
            nestedScrollEnabled={false}
            numColumns={this.props.columns}
            style={{ marginTop: 8, marginLeft: 8, marginRight: 8 }}
            data={this.props.data}
            renderItem={({ item, index }) => this.renderStream(item)}
            keyExtractor={item => item}
          />
        </View>
      );
    } else if (this.props.tabTitle == "Pictures") {
      return (
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            bounces={false}
            nestedScrollEnabled={false}
            numColumns={this.props.columns}
            style={{ marginTop: 8, marginLeft: 8, marginRight: 8 }}
            data={this.props.data}
            renderItem={({ item, index }) => this.renderPictures(item)}
            key={"v"}
          />
        </View>
      );
    } else if (this.props.tabTitle == "Crew") {
      return (
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            bounces={false}
            nestedScrollEnabled={false}
            numColumns={this.props.columns}
            style={{ marginTop: 8, marginLeft: 8, marginRight: 8 }}
            data={this.props.data}
            renderItem={({ item, index }) => this.renderFriends(item)}
            keyExtractor={item => item}
          />
        </View>
      );
    } else {
      return (
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            bounces={false}
            nestedScrollEnabled={false}
            numColumns={this.props.columns}
            style={{ marginTop: 8, marginLeft: 8, marginRight: 8 }}
            data={this.props.data}
            renderItem={({ item, index }) => this.renderPost(item)}
            keyExtractor={item => item}
          />
        </View>
      );
    }
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
    marginStart: 5,
    backgroundColor: Colors.transparent
  },
  GridViewInsideTextItemStyle: {
    color: "#fff",
    padding: 10,
    fontSize: 18,
    justifyContent: "center"
  }
});
ListCompoment.propTypes = {
  tabTitle: PropTypes.string,
  columns: PropTypes.number,
  data: PropTypes.object,
  navigation:PropTypes.object
};
export default ListCompoment;
