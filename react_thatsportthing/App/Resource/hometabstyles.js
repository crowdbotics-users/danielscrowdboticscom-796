import { StyleSheet, Dimensions } from "react-native";
import Colors from "./Colors";

const hometabstyles = StyleSheet.create({
  StreamActiveTab: {
    backgroundColor: "#af4300",
    width: Dimensions.get("screen").width / 3.2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    marginLeft: 4,
    marginRight: 2,
    borderColor: Colors.black,
    borderWidth: 0.5
  },
  StreamActiveTabText: {
    padding: 10,
    color: Colors.white,
    fontSize: 15,
    fontFamily: "OpenSans-SemiBold"
  },
  StreamInactiveTab: {
    backgroundColor: Colors.bgHeader,
    width: Dimensions.get("screen").width / 3.2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    marginLeft: 4,
    marginRight: 2,
    borderColor: Colors.black,
    borderWidth: 0.5
  },
  StreamInactiveTabText: {
    padding: 10,
    color: Colors.white,
    fontSize: 15,
    fontFamily: "OpenSans-SemiBold"
  },
  FriendsPostActiveTab: {
    backgroundColor: "#af4300",
    width: Dimensions.get("screen").width / 3.2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    marginLeft: 3,
    marginRight: 3,
    borderColor: Colors.black,
    borderWidth: 0.5
  },
  FriendsPostActiveTabText: {
    padding: 10,
    color: Colors.white,
    fontSize: 15,
    fontFamily: "OpenSans-SemiBold"
  },
  FriendsPostInactiveTab: {
    backgroundColor: Colors.bgHeader,
    width: Dimensions.get("screen").width / 3.2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    marginLeft: 3,
    marginRight: 3,
    borderColor: Colors.black,
    borderWidth: 0.5
  },
  FriendsPostInactiveTabText: {
    padding: 10,
    color: Colors.white,
    fontSize: 15,
    fontFamily: "OpenSans-SemiBold"
  },
  SearchActiveTab: {
    backgroundColor: "#af4300",
    width: Dimensions.get("screen").width / 3.2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    marginLeft: 2,
    marginRight: 3,

    borderColor: Colors.black,
    borderWidth: 0.5
  },
  SearchActiveTabText: {
    padding: 10,
    color: Colors.white,
    fontSize: 15,
    fontFamily: "OpenSans-SemiBold"
  },
  SearchInactiveTab: {
    backgroundColor: Colors.bgHeader,
    width: Dimensions.get("screen").width / 3.2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    marginLeft: 2,
    marginRight: 3,
    borderColor: Colors.black,
    borderWidth: 0.5
  },
  SearchInactiveTabText: {
    padding: 10,
    color: Colors.white,
    fontSize: 15,
    fontFamily: "OpenSans-SemiBold"
  }
});
export default hometabstyles;
