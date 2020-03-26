import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { BASE_COLOR } from '../styles'
import Icon from 'react-native-vector-icons/Ionicons';
import ImageResizer from 'react-native-image-resizer';
class PickImage extends Component {
    state = {
        pickedImaged: null,
    }

    pickImageHandler = () => {
        ImagePicker.showImagePicker({ title: this.props.strings.pickImage }, res => {
            if (res.didCancel) {
                console.log("User canceled!");

            } else if (res.error) {
                console.log("Error", res.error);
                alert(res.error);
            } else {
                let rotation = 0

                if (res.originalRotation === 90) {
                    rotation = 90
                } else if (res.originalRotation === 270) {
                    rotation = -90
                }
                const width = this.props.isProfile ? 300 : 800
                const height = this.props.isProfile ? 300 : 600
                ImageResizer.createResizedImage(res.uri, width, height, "JPEG", 90, rotation)
                    .then(({ uri, size }) => {

                        this.setPickedImage(uri)
                    })
                    .catch(err => {
                        console.log(err)
                        alert(err)

                    })
            }
        });
    }

    setPickedImage = (uri) => {
        this.setState({
            pickedImaged: { uri: uri }
        });
        this.props.onImagePicked({ uri: uri })
    }

    buttonContent = (btnTitle) => (
        <View style={{ height: '100%', width: '100%' }}>
            <TouchableOpacity onPress={() => this.pickImageHandler()}>
                <View style={styles.button}>
                    <View style={styles.icon}>
                        <Icon name="ios-add" size={50} color={BASE_COLOR.blue} />
                    </View>
                    <View>
                        <Text numberOfLines={2} style={styles.text}>{btnTitle}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
    imageContent = () => (
        <View style={{ height: '100%', width: '100%' }}>
            <TouchableOpacity onPress={() => this.pickImageHandler()}>
                <Image source={this.state.pickedImaged ? this.state.pickedImaged : { uri: this.props.currentImage }}
                    style={styles.previewImage} />
            </TouchableOpacity>
        </View>
    )
    render() {

        let mainContent = null
        const btnTitle = this.props.showOptional ? `${this.props.strings.addPhoto}${"\n"}(${this.props.strings.optional})` : `${this.props.strings.addPhoto}`
        if (!(this.state.pickedImaged || this.props.currentImage)) {
            mainContent = this.buttonContent(btnTitle)
        } else {
            mainContent = this.imageContent()
        }

        return (
            <View
                style={[styles.container, styles.borderStyle, { borderRadius: this.props.borderRadius ? this.props.borderRadius : 0 }]}>
                {mainContent}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        alignItems: "center",
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: BASE_COLOR.blue,
        backgroundColor: BASE_COLOR.lightGray,
        width: "100%",
        height: "100%",
        overflow: 'hidden'
    },
    borderStyle: {
        borderStyle: 'solid'
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: BASE_COLOR.gray,
        fontSize: 12,
        textAlign: 'center'
    },
    previewImage: {
        width: "100%",
        height: "100%",
        overflow: 'hidden'
    }
});
const mapStateToProps = state => {
    return {
        strings: state.location.language.strings,
    };
};

export default connect(mapStateToProps, null)(PickImage);

