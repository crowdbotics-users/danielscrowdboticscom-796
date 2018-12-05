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
class PictureListComponent extends Component {
  doRedirect(screen, data) {
    this.props.navigation.navigate(screen, { data: data });
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
      <View style={{backgroundColor:Colors.white}}>
        <GridView
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            bounces={false}
            itemsPerRow={3}
          
            data={this.props.pictures}
            renderItem={({ item, index }) => this.renderPictures(item)}
            key={"v"}
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
PictureListComponent.propTypes = {
  pictures: PropTypes.array,
  navigation: PropTypes.object
};
export default PictureListComponent;
