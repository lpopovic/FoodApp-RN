/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Navigation from './src/components/TabNavigation/TabNavigator'

import { Provider } from 'react-redux'
import configurateStore from './src/store/configureStore'
const store = configurateStore();
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}



