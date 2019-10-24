import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class BaseScreen extends Component {

    _isMounted = false

    componentDidMount() {
        this._isMounted = true

        this.setNewStateHandler({ color: 'red' })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    setNewStateHandler = (newStateAtributeValue) => {
        if (this._isMounted) {
            this.setState(newStateAtributeValue)
        }
    }


}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'red'
    }
});


export default BaseScreen;