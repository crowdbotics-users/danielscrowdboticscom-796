import React, { Component } from 'react';
import { View, TouchableOpacity, Image,Text } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../Resource/Colors';

class HamburgerIcon extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  }

  render() {
    return (
      <View style={{ flexDirection: 'row',alignItems:'center',backgroundColor:Colors.bgHeader,height:90 }}>
        
      </View>

    );
  }
}
HamburgerIcon.propTypes = {
  title: PropTypes.string
};
export default HamburgerIcon