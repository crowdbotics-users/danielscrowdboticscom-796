import React, { Component } from 'react'
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
    ActivityIndicator,
    StatusBar,
    FlatList,
    AsyncStorage,
    NetInfo,
    Alert
} from "react-native";
import HomeBannerCompoment from '../Compoments/HomeBannerCompoment';
import ProgressCompoment from '../Compoments/ProgressCompoment';
import Icons from '../Resource/Icons';
class MainTabScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isProgress: false,
            noData: false,
            isError: false,
            full_name: "",
            profile_image: "",
            cover_image: "",
            follower_count: 0,
            crew_count: 0,
            post_count: 0,
            user_name: "",
            tabTitle: "Stream",
            columnCount: 1,
            isStreamActive: true,
            isFriendsPostActive: false,
            isSearchActive: false,

            activeColor: Colors.orange,
            activeTextColor: Colors.white,
            inactiveColor: Colors.white,
            inactiveTextColor: Colors.backgroundLogin,
            avatarSource: "",
            isPeopleActive: true,
            isPostActive: false,
            isSportActive: false,
            isPageActive: false,
            isLocationActive: false,
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
            filteredData: [],
            postData: []
        };
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <ProgressCompoment isProgress={this.state.isProgress} />
                        <HomeBannerCompoment
                            navigation={this.props.navigation}
                            full_name={this.state.full_name}
                            profile_image={this.state.profile_image}
                            cover_image={this.state.cover_image}
                            user_name={this.state.user_name}
                            follower_count={this.state.follower_count}
                            crew_count={this.state.crew_count} />
                        <ImageBackground source={Icons.bg_fav} style={{ width: "100%", height: 80, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                            <ListView
                                horizontal={true}
                                showsVerticalScrollIndicator={false}
                                alwaysBounceVertical={false}
                                bounces={false}
                                dataSource={ds.cloneWithRows(this.state.dataSource)}
                                renderRow={this.renderRow.bind(this)}
                                renderFooter={this.renderFooter.bind(this)}/>
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: Colors.black,
                                    fontSize: 9,
                                    fontFamily: "OpenSans-SemiBold"
                                }}
                            >FAVORITES</Text>
                        </ImageBackground>
                        <View style={{ backgroundColor: "#414141", flexDirection: "column" }}>

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
const customstyles = StyleSheet.create({
    collapseView: {
        backgroundColor: Colors.black,
        paddingTop: 10,
        paddingStart: 10,
        paddingEnd: 10,
        height: 70
    }
});
export default MainTabScreen;