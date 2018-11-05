import React, { Component } from "react";
import {
  View,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,Dimensions
} from "react-native";
import { SafeAreaView } from "react-navigation";
import IconTab from "./IconTab";
import Colors from "../Resource/Colors";

class TabBarCompoment extends Component {
  render() {
    const { navigation, jumpToIndex } = this.props;
    const { routes } = navigation.state;
    return (
      <SafeAreaView style={{ zIndex: 10 }} forceInset={{ top: "always" }}>
        <View style={styles.tabbarcontainer}>
          
          <View style={styles.tabbar}>
            {routes &&
              routes.map((route, index) => {
                const focused = index === navigation.state.index;
                const tabKey = route.key;
                return (
                  <View key={route.key} style={{backgroundColor:Colors.navBg }}>
                    <IconTab
                      press={() => jumpToIndex(index)}
                      key={route.key}
                      index={index}
                      focused={focused}
                    />
                  </View>
                );
              })}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  tabbarcontainer: {
    width:Dimensions.get("screen").width,
    height: 44
  },
  bg: {
    position: "absolute",
    width: "100%",
    height: 44,
    alignSelf: "center"
  },
  tabbar: {
    
    height: 34,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "transparent",
    borderTopColor: "transparent"
  }
});

export default TabBarCompoment;
