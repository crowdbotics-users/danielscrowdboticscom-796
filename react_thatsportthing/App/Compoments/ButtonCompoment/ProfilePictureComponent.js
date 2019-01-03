import React, { Component } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import PropTypes from "prop-types";
import Icons from "../../Resource/Icons";

class ProfilePictureComponent extends Component {
  toggleDrawer(screen) {
    this.props.navigation.navigate(screen);
  }

  render() {
    return (
      <View>
        <View
          style={{
            width: this.props.circleWidth,
            height: this.props.circleHeight,
            borderRadius: this.props.circleRadius,
            backgroundColor: "#F8F6F7",
            alignSelf: "center",
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          <Image
            source={
              this.props.profile_image == ""
                ? Icons.messi
                : { uri: this.props.profile_image }
            }
            style={{
              width: this.props.imageWidth,
              height: this.props.imageHeight,
              borderRadius: this.props.imageRadius,
              borderWidth: 1.5,
              borderColor: "#D1D0D0",
              alignSelf: "center"
            }}
          />
        </View>
      </View>
    );
  }
}
ProfilePictureComponent.propTypes = {
  title: PropTypes.string,
  profile_image: PropTypes.string,
  circleWidth: PropTypes.number,
  circleHeight: PropTypes.number,
  circleRadius: PropTypes.number,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  imageRadius: PropTypes.number,
  navigation: PropTypes.object
};
export default ProfilePictureComponent;
