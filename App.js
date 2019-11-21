/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import Navigator  from './src/components/TabNavigation/Navigator'

import { Provider } from 'react-redux'
import configurateStore from './src/store/configureStore'
const store = configurateStore();
export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}



