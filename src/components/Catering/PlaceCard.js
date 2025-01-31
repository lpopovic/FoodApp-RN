import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
    IconAssets
} from '../../assets';
import { connect } from 'react-redux';
import { userFavoritePlaces } from '../../store/actions'
import { BASE_COLOR } from '../../styles';

class PlaceCard extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        const { data, userFavoritePlacesIDs } = this.props
        return (
            // <TouchableOpacity onPress={() => this.props.onClick()} activeOpacity={0.5}>
            <View style={(styles.mainContainer)}>
                <Image
                    style={{
                        width: 100,
                        aspectRatio: 1 / 1,
                    }}
                    source={{ uri: data.image.image11t }}
                />
                <View style={{ flex: 10, flexDirection: 'column', height: '100%', paddingLeft: 10, paddingRight: 10 }}>
                    <View style={{ height: 50, flexDirection: 'row' }}>
                        <View style={{ flex: 8, justifyContent: 'center' }}>
                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 18, fontWeight: 'bold', }}>{data.name}</Text>
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <TouchableOpacity onPress={() => this.onPressFavoritePlaceHandler(data)}>
                                <View style={{ borderRadius: 20, height: 35, width: 35, backgroundColor: '#F1F1F1', justifyContent: "center", alignItems: "center", }}>
                                    <Image
                                        style={{
                                            width: 21,
                                            height: 21,
                                            tintColor: userFavoritePlacesIDs.includes(data._id) ? '#FF4233' : '#646464'
                                        }}
                                        source={userFavoritePlacesIDs.includes(data._id) ? IconAssets.heartFillIcon : IconAssets.heartIcon}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: 50, flexDirection: 'row' }}>
                        <TouchableOpacity style={{ flex: 1, marginTop: 10, }}>
                            <View style={{ backgroundColor: '#F1F1F1', height: 26, borderRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <Image
                                    style={{
                                        width: 17,
                                        height: 16,
                                    }}
                                    source={IconAssets.starIcon}
                                />
                                <Text style={{ color: '#646464', fontWeight: '400', fontSize: 11, marginLeft: 2 }}>{data.getAvgRating()}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onClick()} activeOpacity={0.5} style={{ flex: 3, marginTop: 10, marginLeft: 10 }}>
                            <View style={{ backgroundColor: BASE_COLOR.orange, height: 26, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>Meni</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            // </TouchableOpacity>
        )
    }

    onPressFavoritePlaceHandler = (place) => {
        this.props.userFavoritePlacesHandler(place)
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        margin: 10,
        overflow: 'hidden',
        borderRadius: 5,
        height: 100,
        borderWidth: 1.5,
        borderColor: BASE_COLOR.gray,
    }
});


const mapStateToProps = state => {
    return {
        userFavoritePlacesIDs: state.user.userFavoritePlacesIDs
    };
};
const mapDispatchToProps = dispatch => {
    return {
        userFavoritePlacesHandler: (place) => dispatch(userFavoritePlaces(place)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);