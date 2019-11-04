import React, { Component } from 'react';
import {
    StyleSheet
} from 'react-native';
import { BASE_COLOR } from './color';

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

export const segmentedControlStyles = StyleSheet.create({
    container: {
        height: 36,
        borderColor: '#eeeef0',
        backgroundColor: '#eeeef0',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden'
    },
    commonStyle: {
        backgroundColor: '#eeeef0',
        height: 30,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 2,
        margin: 5,
        borderWidth: 0
    },
    activeStyle: {
        backgroundColor: '#fff',
        shadowOffset: { width: 0.95, height: 0.95 },
        shadowColor: '#a2a2a2',
        shadowOpacity: 0.5,
        shadowRadius: 2
    },
    text: {
        color: BASE_COLOR.darkGray,
        fontWeight: 'bold'
    }
});