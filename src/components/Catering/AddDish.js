import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BASE_COLOR } from '../../styles';
import { withNavigation } from 'react-navigation';
import { CatheringNetwork } from '../../service/api';
import PlaceList from '../../components/Catering/PlaceList';
import { ScreenName } from '../../helpers'

class AddDish extends Component {

    constructor(props) {
        super(props)
        this.state = {
            placesCathering: [],
            hide: true
        }
    }

    componentDidMount() {
        this.apiCallGetPlacesCathering()
    }

    apiCallGetPlacesCathering() {
        CatheringNetwork.fetchPlacesCathering().then(
            res => {
                var PlaceData = []
                res.map(place => {
                    PlaceData.push(place.place)
                })
                this.setState({
                    placesCathering: PlaceData
                })
                // console.log("PLUS DUGME")
                // console.log(res)
            },
            err => {
                // this.showAlertMessage(err)
            }
        )
    }

    placeListContent = (placesCathering, hide) => {

        if (hide == false) {
            return (
                <PlaceList data={placesCathering} clickOnPlace={(placeId) => this.placeSelectHandler(placeId)} />
            )
        } else {
            return (
                null
            )
        }

    }

    placeSelectHandler(placeId) {
        this.props.placeSelect(placeId)
        // let cathering = {
        //     isFromCathering: true,
        //     selectedDate: this.state.selectedDate,
        // }
        // this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}`, params: { _id: placeId, cathering: cathering } })
    }

    render() {
        const { placesCathering, hide } = this.state
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity onPress={() => this.plusOnPress()}>
                    <View style={hide ? styles.cardContainerHidden : styles.cardContainerShow}>
                        <View style={styles.iconContent}>
                            {
                                hide ?
                                    <Icon name="ios-add" size={90} color={BASE_COLOR.orange} />
                                    :
                                    <Icon name="ios-arrow-up" size={35} color={BASE_COLOR.orange} />
                            }
                        </View>
                    </View>
                </TouchableOpacity>
                {this.placeListContent(placesCathering, hide)}
            </View>
        )
    }

    plusOnPress() {
        this.setState({
            hide: !this.state.hide
        })
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: Dimensions.get('window').width - 20,
        alignSelf: 'center',
        borderColor: BASE_COLOR.orange,
        borderWidth: 1.5,
        borderRadius: 5,
    },
    cardContainerHidden: {
        height: 90,
    },
    cardContainerShow: {
        height: 30,
    },
    iconContent: {
        alignSelf: 'center',
    }
});


export default withNavigation(AddDish);