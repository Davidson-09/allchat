/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ColorPickerScreen from './src/screens/ColorPickerScreen';
import Home from './src/screens/Home';
import { NativeRouter, Route, Link } from "react-router-native";


const App= () => {

  return (
	  <NativeRouter>
		  <SafeAreaView style={styles.container}>
			  <Route exact path="/" component={Home}/>
			  <Route path="/colorpicker" component={ColorPickerScreen}/>
		  </SafeAreaView>
	  </NativeRouter>
    
  );
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%'
	}
});

export default App;