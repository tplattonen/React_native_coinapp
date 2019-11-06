import React from 'react';
import { Icon } from 'native-base';
import About from '../pages/About';
import Index from '../pages/Index';
import Coinlist from '../pages/Coinlist';
import CoinlistTicker from '../pages/CoinlistTicker';
import Map from '../pages/Map';
import Maploca from '../pages/Maploca';
import Addnote from '../pages/Addnote';
import ListAllNotes from '../pages/ListAllNotes';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { createDrawerNavigator } from 'react-navigation';

const NaviSide = createDrawerNavigator(
  {
    Frontpage: {
      screen: Index,
      navigationOptions: {
        drawerLabel: 'Index',
        drawerIcon: () => <FontAwesome name="barcode" />,
      },
    },
    About: {
      screen: About,
      navigationOptions: {
        drawerLabel: 'About',
        drawerIcon: () => <FontAwesome name="tag" />,
      },
    },
     Coinlist: {
      screen: Coinlist,
      navigationOptions: {
        drawerLabel: 'List of coins',
        drawerIcon: () => <FontAwesome name="list" />,
      },
    },
    CoinlistTicker: {
      screen: CoinlistTicker,
      navigationOptions: {
        drawerLabel: 'Crypto coin information',
        drawerIcon: () => <FontAwesome name="bar-chart" />,
      },
    },
    Map: {
      screen: Map,
      navigationOptions: {
        drawerLabel: 'Points of interest',
        drawerIcon: () => <FontAwesome name="globe" />,
      },
    },
    Addnote: {
      screen: Addnote,
      navigationOptions: {
        drawerLabel: 'Add note',
        drawerIcon: () => <FontAwesome name="sticky-note" />,
      },
    },
    ListAllNotes: {
      screen: ListAllNotes,
      navigationOptions: {
        drawerLabel: 'List all notes',
        drawerIcon: () => <FontAwesome name="map" />,
      },
    },
    Maploca: {
      screen: Maploca,
      navigationOptions: {
        drawerLabel: 'Where am I?',
        drawerIcon: () => <FontAwesome name="map-marker" />,
      },
    },
  },
  {
    contentOptions: {
      labelStyle: {
        fontFamily: 'Arial',
      },
      activeTintColor: 'black',
      activeBackgroundColor: 'white',
      inactiveTintColor: 'gray',
      inactiveBackgroundColor: 'white',
    },
  }
);

export default NaviSide;
