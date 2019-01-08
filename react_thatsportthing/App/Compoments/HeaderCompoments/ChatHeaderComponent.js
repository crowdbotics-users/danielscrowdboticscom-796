import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView
} from "react-native";
import PropTypes from "prop-types";
import Colors from "../../Resource/Colors";
import Icons from "../../Resource/Icons";
import ProfilePictureComponent from "../ButtonCompoment/ProfilePictureComponent";


class ChatHeaderComponent extends Component {
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };
  constructor(props){
    super(props);
  
  }
  
  doBack() {
    this.props.navigation.goBack(null);
  }
  render() {
    return (
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: Colors.black,
            height: 40
          }}
        >
          <TouchableOpacity
            onPress={()=>this.doBack()}
          >
            <Image
              source={Icons.ic_back_arrow}
              style={{ width: 24, height: 21, margin: 10 }}
            />
          </TouchableOpacity>
          <ProfilePictureComponent
           circleWidth={34}
                circleHeight={34}
                circleRadius={17}
                imageWidth={32}
                imageHeight={32}
                imageRadius={16}
                profile_image=""
           />
          <Text
            style={{
              flex: 1,
              color: Colors.white,
              marginStart:5,
              fontFamily: "OpenSans-Bold",
              fontSize: 14
            }}
          >
            {this.props.title}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
ChatHeaderComponent.propTypes = {
  title: PropTypes.string,
  props: PropTypes.object,
};
export default ChatHeaderComponent;
