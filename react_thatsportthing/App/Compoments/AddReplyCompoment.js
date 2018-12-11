import React, { Component } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import PropTypes from "prop-types";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";
import styles from "../Resource/Styles";

class AddReplyCompoment extends Component {
  toggleDrawer(screen) {
    this.props.navigation.navigate(screen, { post_id: this.props.post_id,comment_id:this.props.comment_id });
  }

  render() {
    return (
      <View
        style={{
          margin: 5
        }}
      >
        <TouchableOpacity onPress={() => this.toggleDrawer("AddReplyScreen")}>
          <View
            style={[
              styles.row,
              {
                padding: 10,
                backgroundColor: "#f6f6f6",
                alignItems: "center",
                borderRadius: 8,
                margin: 5,
                elevation: 2
              }
            ]}
          >
            <Image
              source={Icons.ic_write_post}
              style={{ width: 30, height: 30 }}
            />
            <View>
              <Text
                style={{
                  color: Colors.colorEdittext,
                  textAlign: "center",
                  fontFamily: "OpenSans-Light",
                  fontSize: 14,
                  marginStart: 5
                }}
              >
                Add a Reply
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
AddReplyCompoment.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.object,
  post_id: PropTypes.number,
  comment_id: PropTypes.number
};
export default AddReplyCompoment;
