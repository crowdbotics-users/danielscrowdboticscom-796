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
import Moment from "moment";
class PostListComponent extends Component {
  doRedirect(screen, data) {
    this.props.navigation.navigate("ProfileScreen", { data: data });

  }
  doCommentList(data) {
    this.props.navigation.navigate("CommentListScreen", { commentdata: data });
  }
  renderStream(data) {
    return (
      <SafeAreaView>
        <View
          style={[
            styles.column,
            styles.card,
            { alignItems: "flex-start", marginBottom: 1, borderRadius: 0 }
          ]}
        >
          <View
            style={[
              styles.row,
              { justifyContent: "center", alignItems: "center", marginTop: 8 }
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
                alignItems: "center",
                marginLeft: 10
              }}
            >
              <Image
                source={
                  data.users.profile_image == ""
                    ? Icons.messi
                    : { uri: data.users.profile_image }
                }
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
            <TouchableOpacity
              onPress={() => this.doRedirect("ProfileScreen", data)}
              style={{ flex: 1 }}
            >
              <Text
                style={{
                  color: Colors.black,
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 13,
                  marginStart: 5
                }}
              >
                {data.users.full_name}
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
              {Moment(data.created_at).format("hh:mm A")}
            </Text>
          </View>
          <Text
            style={{
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 15,
              marginRight: 8,
              color: "#6C6C6C",

              fontSize: 12
            }}
          >
            {data.description}
          </Text>
          <Image
            resizeMode="contain"
            style={{
              flexWrap: "wrap",
              height: data.post_image != "" ?Dimensions.get("window").height / 2:0,
              width: data.post_image != "" ?Dimensions.get("window").width:0
            }}
            source={data.post_image != "" ? { uri: data.post_image } : ""}
          />
          <View
            style={[
              styles.row,
              {
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
                marginBottom: 5
              }
            ]}
          >
            <Image
              source={data.is_like ? Icons.ic_like : Icons.ic_dislike}
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
              Like ({data.likes_count})
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
            <TouchableOpacity
              onPress={() => this.doCommentList(data)}
              style={{ flex: 1 }}
            >
              <Text
                style={{
                  color: Colors.black,
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 12
                }}
              >
                Comment ({data.comment_count})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  renderEmpty() {
    return (
      <View>
        <Text
          style={{
            color: Colors.white,
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
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          bounces={false}
          numColumns={1}
          style={{ marginTop: 5 }}
          data={this.props.posts}
          renderItem={({ item, index }) => this.renderStream(item)}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={this.renderEmpty()}
          
        />
      </View>
    );
  }
}

PostListComponent.propTypes = {
  posts: PropTypes.array,
  navigation: PropTypes.object
};
export default PostListComponent;
