import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { BASE_COLOR } from '../../styles'

const defaultInput = props => (

    <TextInput

        {...props}
        paddingRight={16}
        paddingLeft={16}
        placeholderTextColor={BASE_COLOR.white}
        style={[styles.input,props.style, styleInvalideSetter(props.touched, props.valid) ? styles.ivalid : null]}
    />

);

const styleInvalideSetter = (touched, valid) => {
  
    if (Boolean(touched)) {

        return !Boolean(valid);
    } else {
        return false;
    }


};

const styles = StyleSheet.create({
    input: {
        backgroundColor: BASE_COLOR.lightBlue,
        fontSize: 15,
        padding: 5,
        height:40,
        borderRadius:20,
        color:BASE_COLOR.white
    },
    ivalid: {
        backgroundColor: BASE_COLOR.red,
        // borderColor: 'red'

    }
});
export default defaultInput;