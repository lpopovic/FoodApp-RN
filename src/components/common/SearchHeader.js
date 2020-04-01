import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Keyboard
} from 'react-native';
import { TestAssets, IconAssets } from '../../assets'
import { NAV_COLOR, headerStyles, BASE_COLOR } from '../../styles'
import { ScreenName } from '../../helpers'
import DefaultInput from './DefaultInput'
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Badge } from 'react-native-elements'
class SearchHeader extends Component {

    constructor(props) {
        super(props)
        this.searchPlaceholder = 'Explore food...'
        this.state = {
            searchText: ''
        }
    }
    searchTextChange = text => {
        this.setState({
            ...this.state,
            searchText: text,
        })
        clearTimeout(this.searchTimeout)
        this.searchTimeout = setTimeout(() => {
            const { searchText } = this.state
            if (searchText.trim() !== '') {
                this.props.searchTextChange(searchText)
            } else {
                this.props.clearText()
            }
        }, 500);


    }
    handleKeySearch = () => {
        const { searchText } = this.state

        Keyboard.dismiss()

        // clearTimeout(this.searchTimeout)
        if (searchText.trim() !== '') {
            this.props.onSubmitEditing(searchText)
        } else {
            this.props.clearText()
        }

    }

    onPressFilterHandler = () => {
        this.props.navigation.navigate(ScreenName.FilterScreen(), { filter: this.props.showFilter })
    }
    badgeContent = () => {
        const { order } = this.props
        if (order.length > 0) {
            return <Badge
                // status="primary"
                value={order.length}
                textStyle={{ color: BASE_COLOR.white, fontSize: 12 }}
                badgeStyle={{ backgroundColor: BASE_COLOR.red, }}
                containerStyle={{ position: 'absolute', bottom: 0, right: 0 }}
            />
        } else {
            return <View />
        }
    }
    render() {
        const tintColor = this.props.tintColor ? this.props.tintColor : BASE_COLOR.darkGray
        const backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : NAV_COLOR.headerBackground
        const borderBottomColor = this.props.borderBottomColor ? this.props.borderBottomColor : NAV_COLOR.borderBottomColor
        return (
            <View style={[styles.mainContainer, { backgroundColor, borderBottomColor }]}>
                <View style={styles.contentBtns}>
                    <View style={[styles.imageOtherContainer, styles.imageContainer]}>
                        <Image
                            source={TestAssets.searchIcon}
                            style={[styles.baseImage, { tintColor: tintColor }]}
                            resizeMode='contain' />
                    </View>
                    <DefaultInput
                        placeholder={this.searchPlaceholder}
                        placeholderTextColor={BASE_COLOR.gray}
                        value={this.state.searchText}
                        style={[styles.searchInput, { color: tintColor }]}
                        onChangeText={text => this.searchTextChange(text)}
                        returnKeyType='done'
                        autoCapitalize="none"
                        autoCorrect={false}
                        onSubmitEditing={() => this.handleKeySearch()}
                    />

                    <View style={styles.otherBtnContent}>
                        <TouchableOpacity onPress={() => this.onPressFilterHandler()}>
                            <View style={[styles.imageOtherContainer, styles.imageContainer]}>
                                <Icon name="sliders" size={25} color={tintColor} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(ScreenName.ShopScreen())}>
                            <View style={[styles.imageOtherContainer]}>
                                <Image
                                    source={TestAssets.shopBagIcon}
                                    style={[styles.baseImage, { tintColor: tintColor }]}
                                    resizeMode='contain' />
                                {this.badgeContent()}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        ...headerStyles.mainContainer,
        borderBottomWidth: 0.7,
    },
    contentBtns: {
        flex: 10,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    otherBtnContent: {
        alignContent: 'flex-end',
        flexDirection: 'row'
    },
    searchInput: {
        flex: 7,
        backgroundColor: NAV_COLOR.locationContent,
        padding: 0
    },
    imageContainer: {
        marginRight: 4
    },
    imageOtherContainer: {
        padding: 4,
    },
    logoImage: {
        height: 35,
        aspectRatio: 1
    },
    markerImage: {
        height: 20,
        aspectRatio: 1
    },
    baseImage: {
        height: 25,
        aspectRatio: 1
    },
});

const mapStateToProps = state => {
    return {
        order: state.order.order
    };
};

export default connect(mapStateToProps, null)(withNavigation(SearchHeader));
