import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenName } from '../../helpers'
import BaseScreen from "../BaseScreen/BaseScreen"
import Header from '../../components/common/BaseHeader'
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import { NAV_COLOR, BASE_COLOR } from '../../styles';
import { CategorySectionList } from '../../components/Category/CategoryList'
import HomeCaroselComponent from '../../components/Home/HomeCaroselComponent';
class HomeScreen extends BaseScreen {
    static navigationOptions = {
        header: null,
        // headerVisible: false,
        // headerBackTitle: "Photo",
    };
    constructor(props) {
        super(props)
        this.state = {
            carosel: [
                {
                    image: "https://thenypost.files.wordpress.com/2019/09/junk-food-turns-kid-blind.jpg?quality=90&strip=all&w=1033"
                },
                {
                    image: "https://caspiannews.com/media/caspian_news/all_original_photos/1528831479_7183783_1528831390_5761793SFF-Foto-2018-001web2.jpg"
                },
                {
                    image: "http://www.colleges-fenway.org/wp-content/uploads/2018/09/food-festival-1.jpg"
                },
                {
                    image: "https://images.startups.co.uk/wp-content/uploads/2018/12/20162418/business-ideas-2019-plant-based-foods.jpg"
                }
            ]
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    categoryListContent = () => (
        <CategorySectionList
            arrayObject={["", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar"]}
            onPressItem={(item) => this.pushNewScreen(ScreenName.CategoryScreen())}
            onPressSeeMore={() => this.pushNewScreen(ScreenName.PlaceListScreen())}
        />
    )
    render() {
        const mainDisplay = this.categoryListContent()
        return (
            <SafeAreaView style={styles.safeAreaHeader}>
                <View style={styles.mainContainer}>
                    <Header backgroundColor={NAV_COLOR.headerBackground} />
                    {mainDisplay}
                    <HomeCaroselComponent data={this.state.carosel} />

                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeAreaHeader: {
        backgroundColor: NAV_COLOR.headerBackground,
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: BASE_COLOR.white
    }
});

export default connect(null, null)(HomeScreen);
