import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { withNavigation } from 'react-navigation'
import { IconAssets } from '../../assets'
import { BASE_COLOR, headerStyles } from '../../styles'
class BackHeader extends Component {

    constructor(props) {
        super(props)
        this.leftBtnTitle = 'Back'
    }
    backPressHandler = ()=> {
        this.props.navigation.goBack()
    }
    render() {
        const tintColor = this.props.tintColor ? this.props.tintColor : BASE_COLOR.white
        const backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : BASE_COLOR.backgroundBlue

        return (
            <View style={[headerStyles.mainContainer, { backgroundColor }]}>
                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.backPressHandler()}>
                        <View style={styles.leftBtn}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={IconAssets.leftArrow}
                                    style={[headerStyles.btnImage, { tintColor }]}
                                    resizeMode='contain' />
                            </View>
                            <Text style={[headerStyles.btnText, { color: tintColor }]}>{this.leftBtnTitle}</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <View style={styles.rightBtn}>
                        <Text style={styles.text}>Right BTN</Text>
                    </View> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    leftBtn: {
        ...headerStyles.alignCentarBetweenRow,
    },
    rightBtn: {
        ...headerStyles.alignCentarBetweenRow,
    },
    imageContainer: {
        marginRight: 4
    },
    backImage: {
        height: 20,
        width: 20,
    },
    text: {
        fontSize: 17,
        fontWeight: '500',
    }
});


export default withNavigation(BackHeader);