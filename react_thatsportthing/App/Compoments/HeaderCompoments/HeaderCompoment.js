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


class HeaderComponent extends Component {
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
          <Text
            style={{
              flex: 1,
              color: Colors.white,
              textAlign: "center",
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
HeaderComponent.propTypes = {
  title: PropTypes.string,
  props: PropTypes.object,
};
export default HeaderComponent;
