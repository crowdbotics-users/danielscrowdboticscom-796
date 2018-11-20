import { StyleSheet, Dimensions } from "react-native";
import Colors from "./Colors";

const editscreenstyle = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white
  },
  activeEveryone: {
    backgroundColor: Colors.bgHeader,
    borderColor: Colors.transparent,
    borderRadius: 5,
    borderWidth: 1,
    color: Colors.white,
    padding: 3,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 13
  },
  InActiveEveryone: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.black,
    borderRadius: 5,
    borderWidth: 1,
    color: Colors.black,
    padding: 3,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 13
  },
  activeYourCrew: {
    backgroundColor: Colors.bgHeader,
    borderColor: Colors.transparent,
    borderRadius: 5,
    borderWidth: 1,
    color: Colors.white,
    padding: 3,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 13
  },
  InActiveYourCrew: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.black,
    borderRadius: 5,
    borderWidth: 1,
    color: Colors.black,
    padding: 3,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 13
  },
  activeYourCrewFollower: {
    backgroundColor: Colors.bgHeader,
    borderColor: Colors.transparent,
    borderRadius: 5,
    borderWidth: 1,
    color: Colors.white,
    padding: 3,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 13
  },
  InActiveYourCrewFollower: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.black,
    borderRadius: 5,
    borderWidth: 1,
    color: Colors.black,
    padding: 3,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 13
  }
});

export default editscreenstyle;