/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler'
import React, { Component } from 'react';
import {
  Text,
  TextInput,
  ScrollView,
} from 'react-native'
import Navigator from './src/components/TabNavigation/Navigator'

import { Provider } from 'react-redux'
import configurateStore from './src/store/configureStore'
import { BASE_COLOR } from './src/styles';
const store = configurateStore();

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;
Text.defaultProps.color = BASE_COLOR.black

if (TextInput.defaultProps == null) TextInput.defaultProps = {};
TextInput.defaultProps.placeholderTextColor = BASE_COLOR.gray

if (ScrollView.defaultProps == null) ScrollView.defaultProps = {};
ScrollView.defaultProps.scrollIndicatorInsets = { right: 1 };

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}



