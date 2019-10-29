import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { BASE_COLOR } from '../../styles'

const defaultInput = props => (

    <TextInput

        {...props}
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
        backgroundColor: BASE_COLOR.white,
        fontSize: 15,
        padding: 5,
        borderBottomColor: BASE_COLOR.gray,
        borderBottomWidth: 0.7,
    },
    ivalid: {
        backgroundColor: '#f9c0c0',
        // borderColor: 'red'

    }
});
export default defaultInput;