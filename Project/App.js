/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


import Navigation from './Nav/nav';



export default class App extends React.Component{

  render(){
    return(

      <Navigation/>
    )

    
  }


}