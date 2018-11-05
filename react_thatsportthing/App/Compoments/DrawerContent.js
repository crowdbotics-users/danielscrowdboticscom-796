import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  AsyncStorage,
  TouchableOpacity,
  Dimensions,
  Linking,
  TextInput
} from "react-native";
import { NavigationActions } from "react-navigation";
import PropTypes from "prop-types";

import styles from "../Resource/Styles";
import Color from "../Resource/Colors";
import Icon from "../Resource/Icons";
import Icons from "../Resource/Icons";

class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      useremail: "",
      userimage: ""
    };
  }
  componentDidMount() {}
  navigateToScreen = route => () => {
    const navigate = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigate);
    this.closeDrawer();
  };
  doLogout() {
    this.props.navigation.navigate("Login");
    this.closeDrawer();
  }
  doRateUs() {
    Linking.openURL("http://www.goodindiabadindia.com/terms-conditons.html");
    this.closeDrawer();
  }

  closeDrawer = () => {
    this.props.navigation.closeDrawer();
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: Color.navBg,
            justifyContent: "flex-start",
            marginTop: 20,
            height: 200
          }
        ]}
      >
        <View
          style={{
            backgroundColor: Color.bgHeader,
            height: 100,
            justifyContent: "center"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center"
            }}
          >
            <View style={{ flex: 1, alignContent: "flex-start",justifyContent:'center' }}>
              <Image
                source={Icons.logo_white}
                style={{
                  margin: 10,
                  width: 90,
                  height: 59
                }}
              />
            </View>
            <View
              style={{
                margin: 10,
                width: 81,
                height: 81,
                borderRadius: 45,
                backgroundColor: "#F8F6F7",
                alignSelf: "flex-end",
                justifyContent: "flex-end",
                alignContent: "flex-end"
              }}
            >
              <Image
                source={Icons.messi}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  borderWidth: 1.5,
                  borderColor: "#D1D0D0",
                  alignSelf: "center"
                }}
              />
            </View>
          </View>
        </View>
        <View>
            <View style={{backgroundColor:Color.navBg,flexDirection:'row',padding:10,borderColor:Color.colorSearch,margin:10}}>
                <Image source={Icons.ic_search} style={{width:24,height:24}} />
                <TextInput placeholder="Search" style={{color:Color.colorSearch,flex:1,marginLeft:5}} placeholderTextColor={Color.colorSearch}  />  
            </View>
          
        </View>
        {/* <TouchableOpacity onPress={this.navigateToScreen('EditProfileScreen')}>
                    <View style={[styles.row, { backgroundColor: Color.navHeaderBg }]}>
                        <Image source={this.state.userimage==''?Icon.ic_profile:{uri:this.state.userimage}} style={styles.imvProfile} />
                        <View style={[styles.column, { flex: 1, alignItems: 'flex-start' }]}>
                            <Text style={[styles.headerText, { fontSize: 14 }]}>{this.state.username}</Text>
                            <Text style={[styles.headerText, { fontSize: 12 }]}>{this.state.useremail}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.navigateToScreen('Home')}>
                    <View style={[styles.row, { alignItems: 'center' }]}>
                        <Image source={Icon.ic_home} style={[styles.icon, { marginLeft: 15, margin: 10 }]} />
                        <Text style={[styles.headerText, { marginLeft: 5, fontSize: 14, flex: 1 }]}>Home</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.navigateToScreen('AddNewPost')}
                >
                    <View style={[styles.row, { alignItems: 'center' }]}>
                        <Image source={Icon.ic_addpost} style={[styles.icon, { marginLeft: 15, margin: 10 }]} />
                        <Text style={[styles.headerText, { marginLeft: 5, fontSize: 14, flex: 1 }]}>Add New Post</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.navigateToScreen('MyPost')}>
                    <View style={[styles.row, { alignItems: 'center' }]}>
                        <Image source={Icon.ic_mypost} style={[styles.icon, { marginLeft: 15, margin: 10 }]} />
                        <Text style={[styles.headerText, { marginLeft: 5, fontSize: 14, flex: 1 }]}>My Post</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.navigateToScreen('Profile')}>
                    <View style={[styles.row, { alignItems: 'center' }]}>
                        <Image source={Icon.ic_profile} style={[styles.icon, { marginLeft: 15, margin: 10, tintColor: Color.white }]} />
                        <Text style={[styles.headerText, { marginLeft: 5, fontSize: 14, flex: 1 }]}>Profile</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.doRateUs()}>
                    <View style={[styles.row, { alignItems: 'center' }]}>
                        <Image source={Icon.ic_rate} style={[styles.icon, { marginLeft: 15, margin: 10 }]} />
                        <Text style={[styles.headerText, { marginLeft: 5, fontSize: 14, flex: 1 }]}>Rate Us</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.navigateToScreen('AboutUs')}>
                    <View style={[styles.row, { alignItems: 'center' }]}>
                        <Image source={Icon.ic_aboutus} style={[styles.icon, { marginLeft: 15, margin: 10 }]} />
                        <Text style={[styles.headerText, { marginLeft: 5, fontSize: 14, flex: 1 }]}>About Us</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.navigateToScreen('TermsAndConditions')}>
                    <View style={[styles.row, { alignItems: 'center' }]}>
                        <Image source={Icon.ic_terms} style={[styles.icon, { marginLeft: 15, margin: 10 }]} />
                        <Text style={[styles.headerText, { marginLeft: 5, fontSize: 14, flex: 1 }]}>Tersm and Conditions</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.navigateToScreen('Legal')}>
                    <View style={[styles.row, { alignItems: 'center' }]}>
                        <Image source={Icon.ic_legal} style={[styles.icon, { marginLeft: 15, margin: 10 }]} />
                        <Text style={[styles.headerText, { marginLeft: 5, fontSize: 14, flex: 1 }]}>Legal</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.doLogout()}>
                    <View style={[styles.row, { alignItems: 'center' }]}>
                        <Image source={Icon.ic_logout} style={[styles.icon, { marginLeft: 15, margin: 10 }]} />
                        <Text style={[styles.headerText, { marginLeft: 5, fontSize: 14, flex: 1 }]}>Logout</Text>
                    </View>
                </TouchableOpacity> */}
      </View>
    );
  }
}

DrawerContent.propTypes = {
  navigation: PropTypes.object
};
export default DrawerContent;
