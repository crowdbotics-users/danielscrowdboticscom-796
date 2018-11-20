import React, { Component } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import PropTypes from "prop-types";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";
import styles from "../Resource/Styles";

class EditProfileHeaderCompoment extends Component {
  toggleDrawer = () => {
    this.props.navigation.goBack(null);
  };

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.black,
          height: 40,
        }}
      >
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={Icons.ic_close}
            style={{ width: 18, height: 18 ,margin:10}}
          />
        </TouchableOpacity>
        <Text
          style={{
            flex:1,
            color:Colors.white,
            textAlign:'center',
            fontFamily: "OpenSans-SemiBold",
            fontSize: 14
          }}
        >
          Edit Profile
        </Text>
      </View>
    );
  }
}
EditProfileHeaderCompoment.propTypes = {
  title: PropTypes.string,
  props: PropTypes.object
};
export default EditProfileHeaderCompoment;