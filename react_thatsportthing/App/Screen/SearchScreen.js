import React, { Component } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  ListView,
  Platform,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";
import styles from "../Resource/Styles";
import ImagePicker from "react-native-image-crop-picker";
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class SearchScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      activeColor: Colors.orange,
      activeTextColor: Colors.white,
      inactiveColor: Colors.white,
      inactiveTextColor: Colors.backgroundLogin,
      avatarSource: "",
      dataSource: [
        {
          companyname: "ADIDAS",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "100 Points",
          image: Icons.ball5
        },
        {
          companyname: "NIKE",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "08 Points",
          image: Icons.ball2
        },
        {
          companyname: "THE BAY",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "20 Points",
          image: Icons.ball3
        },
        {
          companyname: "ZARA",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "06 Points",
          image: Icons.ball4
        },
        {
          companyname: "BEST BUY",
          outletname: "Outlets name",
          time: "09/02/2018 11:10 am",
          points: "15 Points",
          image: Icons.ball1
        }
      ],
      dataSource1: [
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi
        },
        {
          name: "JOHN SCHUFFER",
          description:
            "As Messi maintained his goalscoring form into the second half of the season, the year 2012 saw him break several longstanding records. On 7 March, two weeks after scoring four goals in a league fixture against Valencia, he scored five times in a Champions League last 16-round match against Bayer Leverkusen, an unprecedented achievement in the history of the competition.",
          time: "1:32 PM ",
          likes: "123",
          commnets: "12",
          image: Icons.messi
        }
      ]
    };
  }
  pickSingle(cropit, circular = true) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 640,
      compressImageQuality: 0.5,
      includeExif: true
    })
      .then(image => {
        this.setState({
          avatarSource: image.path
        });
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime
          },
          images: null
        });
      })
      .catch(e => {
        console.log(e);
        alert(e.message ? e.message : e);
      });
  }
  componentWillMount() {
    this.setState({
      isLoading: false
    });
  }
  renderRow(data) {
    return (
      <View style={[styles.row, { alignItems: "center" }]}>
        <Image
          source={data.image}
          style={{ width: 50, height: 50, margin: 5 }}
        />
      </View>
    );
  }
  changeButtonColor() {}
  renderRow2(data) {
    return (
      <SafeAreaView>
        <View
          style={[
            styles.column,
            styles.card,
            { alignItems: "center", marginBottom: 8, borderRadius: 10 }
          ]}
        >
          <View
            style={[
              styles.row,
              { justifyContent: "center", alignItems: "center" }
            ]}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#F8F6F7",
                alignSelf: "center",
                justifyContent: "center",
                alignContent: "center",
                marginLeft: 8
              }}
            >
              <Image
                source={data.image}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  borderWidth: 1.5,
                  borderColor: "#D1D0D0",
                  alignSelf: "center"
                }}
              />
            </View>
            <Text
              style={{
                flex: 1,
                color: Colors.black,
                fontFamily: "JosefinSans-Bold",
                fontSize: 13
              }}
            >
              {data.name}
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontFamily: "OpenSans-SemiBold",
                fontSize: 13,
                marginRight: 8
              }}
            >
              {data.time}
            </Text>
          </View>
          <Text
            style={{
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 8,
              marginRight: 8,
              color: "#6C6C6C",

              fontSize: 12
            }}
          >
            {data.description}
          </Text>
          <View
            style={[
              styles.row,
              { justifyContent: "center", alignItems: "center", marginLeft: 8 }
            ]}
          >
            <Image
              source={Icons.ic_like}
              style={{
                width: 20,
                height: 20
              }}
            />

            <Text
              style={{
                marginLeft: 5,
                color: Colors.black,
                fontFamily: "OpenSans-SemiBold",
                fontSize: 12
              }}
            >
              Like ({data.likes})
            </Text>
            <Image
              source={Icons.ic_comment}
              style={{
                width: 20,
                height: 20,
                marginLeft: 10,
                margin: 8
              }}
            />

            <Text
              style={{
                flex: 1,

                color: Colors.black,
                fontFamily: "OpenSans-SemiBold",
                fontSize: 12
              }}
            >
              Comment ({data.commnets})
            </Text>
            <Image
              source={Icons.ic_share}
              style={{
                width: 20,
                height: 20,
                margin: 8,
                marginRight: 8
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
  renderFooter(data) {
    return (
      <View style={[styles.row, { alignItems: "center" }]}>
        <Image
          source={Icons.ic_add}
          style={{ width: 50, height: 50, margin: 5 }}
        />
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          nestedScrollEnabled={true}
        >
          <View>
            <ImageBackground source={Icons.toolbarbg} style={{ height: 200 }}>
              <View
                style={{
                  backgroundColor: "#00000050",
                  height: 50,
                  position: "relative"
                }}
              />
              <Image
                source={Icons.logo_white}
                style={{
                  width: 46,
                  height: 30,
                  margin: 15,
                  position: "absolute"
                }}
              />
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: "#F8F6F7",
                  alignSelf: "center",
                  justifyContent: "center",
                  alignContent: "center"
                }}
              >
                <Image
                  source={
                    this.state.avatarSource == ""
                      ? Icons.messi
                      : { uri: this.state.avatarSource }
                  }
                  style={{
                    width: 98,
                    height: 98,
                    borderRadius: 49,
                    borderWidth: 1.5,
                    borderColor: "#D1D0D0",
                    alignSelf: "center"
                  }}
                />
              </View>
              <View
                style={{
                  backgroundColor: "#00000050",
                  height: 45,
                  marginTop: 5,
                  justifyContent: "center"
                }}
              >
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignContent: "center"
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: Colors.white,
                        fontFamily: "JosefinSans-Bold",
                        fontSize: 18
                      }}
                    >
                      JOHN SCHUFFER
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        color: Colors.white,
                        fontSize: 11,
                        fontFamily: "OpenSans-SemiBold"
                      }}
                    >
                      FOOTBALL PLAYER
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => this.pickSingle(true)}>
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: Colors.white,
                        borderRadius: 15,
                        margin: 5,
                        alignSelf: "center",
                        justifyContent: "center",
                        alignContent: "center"
                      }}
                    >
                      <Image
                        source={Icons.ic_pencil}
                        style={{ width: 15, height: 15, alignSelf: "center" }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View>
            <View
              style={{
                height: 80,
                backgroundColor: "#BABABA",
                justifyContent: "center",
                alignContent: "center"
              }}
            >
              <ActivityIndicator
                color={Colors.white}
                style={{ display: this.state.isLoading ? "flex" : "none" }}
              />
              <ListView
                style={{ display: this.state.isLoading ? "none" : "flex" }}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                alwaysBounceVertical={false}
                bounces={false}
                dataSource={ds.cloneWithRows(this.state.dataSource)}
                renderRow={this.renderRow.bind(this)}
                renderFooter={this.renderFooter.bind(this)}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: Colors.white,
                  fontSize: 11,
                  fontFamily: "OpenSans-SemiBold"
                }}
              >
                FAVORITE SPORTS
              </Text>
            </View>
          </View>
          <View>
            <View style={{ backgroundColor: "#414141" }}>
              <View>
                <View
                  style={{
                    backgroundColor: "#313131",
                    flexDirection: "row",
                    padding: 10,
                    borderColor: Colors.colorSearch,
                    margin: 10,
                    borderRadius: 5
                  }}
                >
                  <Image
                    source={Icons.ic_search}
                    style={{ width: 24, height: 24, marginRight: 5 }}
                  />
                  <TextInput
                    returnKeyType="done"
                    placeholder="Search.."
                    style={{
                      color: Colors.colorSearch,
                      flex: 1,
                      marginLeft: 5,
                      fontSize: 14,
                      fontFamily: "OpenSans-SemiBold"
                    }}
                    placeholderTextColor={Colors.colorSearch}
                  />
                </View>
              </View>
              <View style={{ position: "relative" ,marginBottom:10}}>
                <View style={{ position: "relative" }}>
                  <View
                    style={{
                      height: 2,
                      width: "100%",
                      backgroundColor: Colors.bgHeader
                    }}
                  />
                </View>
                <View style={{ position: "absolute",alignSelf:'center',bottom:-10,justifyContent:'center',alignContent:'center' }}>
                  <View style={{backgroundColor:Colors.bgHeader,borderRadius:10,justifyContent:'center',alignContent:'center',flexDirection:'row',alignItems:'center'}}>
                  <Image source={Icons.ic_down_arrow_white} style={{width:15,height:9,margin:3}}/>
                  <Text style={{color:Colors.white,padding:1,margin:1}}>Advanced Search</Text>
                  <Image source={Icons.ic_down_arrow_white} style={{width:15,height:9,margin:3}}/>
                  </View>
                </View>
              </View>

              <ListView
                showsVerticalScrollIndicator={false}
                alwaysBounceVertical={false}
                bounces={false}
                style={{ marginTop: 8,marginStart:8,marginEnd:8 }}
                dataSource={ds.cloneWithRows(this.state.dataSource1)}
                renderRow={this.renderRow2.bind(this)}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const customstyles = StyleSheet.create({
  buttonView: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    marginTop: 10
  },
  button: {
    flex: 1,
    backgroundColor: Colors.white,

    alignItems: "center",
    width: Dimensions.get("screen").width / 3,

    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  centerbutton: {
    flex: 1,
    backgroundColor: Colors.white,

    alignItems: "center",
    width: Dimensions.get("screen").width / 3,

    justifyContent: "center",
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5
  },
  backbutton: {
    flex: 1,

    backgroundColor: "#F49C20",
    width: Dimensions.get("screen").width / 3,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  backbuttonText: {
    textAlign: "center",
    fontSize: 15,
    color: Colors.white
  },

  centerbuttonText: {
    textAlign: "center",
    fontSize: 15,
    color: Colors.backgroundLogin
  },
  buttonText: {
    textAlign: "center",
    fontSize: 15,
    color: Colors.backgroundLogin
  },
  editText: { color: Colors.white, fontSize: 18 }
});
export default SearchScreen;
