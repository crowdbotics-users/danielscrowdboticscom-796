import { StyleSheet, Dimensions } from "react-native";
import Colors from "./Colors";

const friendstabstyles = StyleSheet.create({
  FriendsActiveTab: {
    backgroundColor: Colors.bgHeader,
    width: Dimensions.get("screen").width / 3.3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 3
  },
  FriendsActiveTabText: {
    padding: 5,
    color: Colors.white,
    fontSize: 14,
    fontFamily: "OpenSans-SemiBold"
  },
  FriendsInactiveTab: {
    backgroundColor: Colors.navBg,
    width: Dimensions.get("screen").width / 3.3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 3
  },
  FriendsInactiveTabText: {
    padding: 5,
    color: Colors.white,
    fontSize: 14,
    fontFamily: "OpenSans-SemiBold"
  },
  MutualFriendsActiveTab: {
    backgroundColor: Colors.bgHeader,
    width: Dimensions.get("screen").width / 3.3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 5
  },
  MutualFriendsActiveTabText: {
    padding: 5,
    color: Colors.white,
    fontSize: 14,
    fontFamily: "OpenSans-SemiBold"
  },
  MutualFriendsInactiveTab: {
    backgroundColor: Colors.navBg,
    width: Dimensions.get("screen").width / 3.3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 5
  },
  MutualFriendsInactiveTabText: {
    padding: 5,
    color: Colors.white,
    fontSize: 14,
    fontFamily: "OpenSans-SemiBold"
  },
  FollowersActiveTab: {
    backgroundColor: Colors.bgHeader,
    width: Dimensions.get("screen").width / 3.3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginLeft: 3,
    marginRight: 5
  },
  FollowersActiveTabText: {
    padding: 5,
    color: Colors.white,
    fontSize: 14,
    fontFamily: "OpenSans-SemiBold"
  },
  FollowersInactiveTab: {
    backgroundColor: Colors.navBg,
    width: Dimensions.get("screen").width / 3.3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginLeft: 3,
    marginRight: 5
  },
  FollowersInactiveTabText: {
    padding: 5,
    color: Colors.white,
    fontSize: 14,
    fontFamily: "OpenSans-SemiBold"
  }
});
export default friendstabstyles;
