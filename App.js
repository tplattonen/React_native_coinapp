import React, {Component} from 'react';
import { Font, AppLoading } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
//import Frontpage from './pages/Frontpage';
//import Index from './pages/Index';
import CoinlistTicker from './pages/CoinlistTicker';
import NaviTab from './navigation/NaviTab';
import NaviSide from './navigation/NaviSide';
import Maploca from './pages/Maploca';

export default class App extends React.Component {
  render() {
    return <NaviSide />;
  } 
}

