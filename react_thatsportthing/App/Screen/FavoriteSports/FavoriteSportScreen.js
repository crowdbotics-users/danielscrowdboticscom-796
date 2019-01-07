import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
  Platform
} from "react-native";
import Icons from "../../Resource/Icons";
import HeaderComponent from "../../Compoments/HeaderCompoments/HeaderCompoment";
import Colors from "../../Resource/Colors";




class FavoriteSportScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: props => (
        <HeaderComponent
          {...props}
          props={navigation}
          title="FAVORITE SPORTS"
        />
      )
    };
  };
  constructor(props) {
    super(props);
    
    this.state = {
      selected:0,
      SelectedFakeContactList: [],
      data: [
        {
          id:1,
          name: "Hockey",
          image: Icons.ball1,
          check:false
        },
        {
          id:2,
          name: "Hockey",
          image: Icons.ball2,
          check:false
        },
        {
          id:3,
          name: "Hockey",
          image: Icons.ball3,
          check:false
        },
        {
          id:4,
          name: "Hockey",
          image: Icons.ball4,
          check:false
        },
        {
          id:5,
          name: "Hockey",
          image: Icons.ball5,
          check:false
        },
        {
          id:6,
          name: "Hockey",
          image: Icons.ball6,
          check:false
        },
        {
          id:7,
          name: "Hockey",
          image: Icons.ball7,
          check:false
        },
        {
          id:8,
          name: "Hockey",
          image: Icons.ball8,
          check:false
        },
        {
          id:9,
          name: "Hockey",
          image: Icons.ball9,
          check:false
        },
        {
          id:10,
          name: "Hockey",
          image: Icons.ball10,
          check:false
        },
        {
          id:11,
          name: "Hockey",
          image: Icons.ball11,
          check:false
        }
      ],
      
    };
   
  }
  onPressAction = (key: number) => {
    this.state.data.map((item) => {
      if (item.id == key) {
        item.check = !item.check
        if (item.check === true) {
          this.state.SelectedFakeContactList.push(item);
          console.log('SelectedFakeContactList',item);
          this.setState({selected:this.state.SelectedFakeContactList.length});
        } else if (item.check === false) {
          const i = this.state.SelectedFakeContactList.indexOf(item)
          if (1 != -1) {
            this.state.SelectedFakeContactList.splice(i, 1)
            return this.state.SelectedFakeContactList
          }
          this.setState({selected:this.state.SelectedFakeContactList.length});
        }
      }
    })
    this.setState({data: this.state.data})
  }
  renderPictures(data, index) {
    
    return (
      <View style={Liststyles.GridViewBlockStyle}>
        <TouchableOpacity onPress={()=>this.onPressAction(data.id)}>
        <View 
        style={{
          alignItems:'center',
          alignContent:'center',
          justifyContent:'center',
          
          width: 70,
            height: 70
          }}>

        <Image
          resizeMode="contain"
          resizeMethod="scale"
          style={{
            width: 50,
            height: 50,
          }}
          source={data.image}
        />
        <Text
          style={{
            color: Colors.colorEdittext,
            fontFamily: "OpenSans-SemiBold",
            fontSize: 11,
            
          }}
        >
          {data.name}
        </Text>
        </View>
        </TouchableOpacity>
      </View>
    );
  }
  renderEmpty() {
    return (
      <View>
        <Text
          style={{
            color: Colors.white,
            fontFamily: "OpenSans-SemiBold",
            fontSize: 11,
            textAlign: "center"
          }}
        >
          No Data Found
        </Text>
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 ,backgroundColor:Colors.white,alignContent:'center'}}>
        <Text
          style={{
            color: Colors.colorEdittext,
            fontFamily: "OpenSans-SemiBold",
            fontSize: 11,
            textAlign: "center",
            marginTop:20
          }}
        >
          Choose your favorite sports
        </Text>
        <Text
          style={{
            color: Colors.colorEdittext,
            fontFamily: "OpenSans-Bold",
            fontSize: 11,
            textAlign: "center",
            marginBottom:20
          }}
        >
          Sports selected {this.state.selected}/6
        </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            bounces={false}
            numColumns={5}
          style={{marginStart:5,marginEnd:5}}
           
          keyExtractor={(item, index) => index}
            data={this.state.data}
            renderItem={({ item, index }) => this.renderPictures(item, index)}
            

            
          />
          <TouchableOpacity
              
              style={{
                backgroundColor: "#6da82a",
                width:'100%',
                height: 40,
                position:'absolute',
                bottom:0
              }}
            >
              <Text
                style={{
                
                  fontFamily: "OpenSans-Bold",
                  color: Colors.white,
                  textAlign: "center",
                  fontSize:16
                }}
              >
                DONE
              </Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const Liststyles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    
    margin: 10,
    paddingTop: Platform.OS === "ios" ? 20 : 0
  },

  GridViewBlockStyle: {
    margin: 5,
    flex:1,
    overflow: "hidden"
  },
  GridViewInsideTextItemStyle: {
    color: "#fff",
    padding: 10,
    fontSize: 18,
    justifyContent: "center"
  }
});
export default FavoriteSportScreen;
