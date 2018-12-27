import { StyleSheet,Dimensions } from "react-native";
import Colors from "./Colors";

const picturetabstyles = StyleSheet.create({
  AllPhotosVideoActiveTab: {
    backgroundColor: Colors.bgHeader,
    width: Dimensions.get("screen").width / 2.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginRight:3
  },
  AllPhotosVideoActiveTabText: {
    padding: 5,
    color: Colors.white,
    fontSize: 12,
    fontFamily: "OpenSans-SemiBold"
  },
  AllPhotosVideoInactiveTab: {
    backgroundColor: Colors.navBg,
    width: Dimensions.get("screen").width / 2.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginRight:3
  },
  AllPhotosVideoInactiveTabText: {
    padding: 5,
    color: Colors.white,
    fontSize: 12,
    fontFamily: "OpenSans-SemiBold"
  },
  AlbumsActiveTab: {
    backgroundColor: Colors.bgHeader,
    width: Dimensions.get("screen").width / 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 5
  },
  AlbumsActiveTabText: {
    padding: 5,
    color: Colors.white,
    fontSize: 12,
    fontFamily: "OpenSans-SemiBold"
  },
  AlbumsInactiveTab: {
    backgroundColor: Colors.navBg,
    width: Dimensions.get("screen").width / 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 5
  },
  AlbumsInactiveTabText: {
    padding: 5,
    color: Colors.white,
    fontSize: 12,
    fontFamily: "OpenSans-SemiBold"
  },
  TaggedActiveTab: {
    backgroundColor: Colors.bgHeader,
    width: Dimensions.get("screen").width / 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginLeft: 3,
    
  },
  TaggedActiveTabText: {
    padding: 5,
    color: Colors.white,
    fontSize: 12,
    fontFamily: "OpenSans-SemiBold"
  },
  TaggedInactiveTab: {
    backgroundColor: Colors.navBg,
    width: Dimensions.get("screen").width /4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginLeft: 3,
  },
  TaggedInactiveTabText: {
    padding: 5,
    color: Colors.white,
    fontSize: 12,
    fontFamily: "OpenSans-SemiBold"
  }
});
export default picturetabstyles
