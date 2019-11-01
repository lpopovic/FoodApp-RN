import React, { Component } from 'react';
import {
    StyleSheet
} from 'react-native';

export const headerStyles = StyleSheet.create({
    mainContainer: {
        height: 50,
        paddingLeft: 8,
        paddingRight: 8,
    },
    btnImage: {
        height: 20,
        width: 20,
    },
    btnText: {
        fontSize: 17,
        fontWeight: '500',
    },
    alignCentarBetweenRow: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    }
});