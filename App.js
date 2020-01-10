/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import 'react-native-gesture-handler'
import {
  StatusBar,
} from 'react-native';

import  {Routes}  from "./src/config";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <>
        <StatusBar backgroundColor = "#0ca98c"
        barStyle = "light-content" />
        <Routes />
      </>
    );
  }
}

export default App;
