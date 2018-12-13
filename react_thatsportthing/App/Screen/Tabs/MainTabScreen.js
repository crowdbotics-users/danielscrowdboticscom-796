import React from "react";

import {  createMaterialTopTabNavigator,createAppContainer} from "react-navigation";
import StreamScreen from "../StreamScreen";
import MyPostsScreen from "../MyPostsScreen";
import SearchScreen from "../SearchScreen";


const Tabs = createMaterialTopTabNavigator({
  Stream: StreamScreen,
  "My Posts": MyPostsScreen,
  Search: SearchScreen
},{
  tabBarPosition:'top',
  initialRouteName:'Stream'
});
const MainTabScreen=createAppContainer(Tabs);
export default MainTabScreen;
