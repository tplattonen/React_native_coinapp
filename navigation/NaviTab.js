import React from 'react';
import { Icon } from 'native-base';
//import Coinlist from '../pages/Coinlist';
import About from '../pages/About';
import Index from '../pages/Index';
import { TabNavigator, TabBarBottom, createTabNavigator, createStackNavigator  } from 'react-navigation';
import CoinlistTicker from '../pages/CoinlistTicker';
import Map from '../pages/Map';
import Addnote from '../pages/Addnote';
import ListAllNotes from '../pages/ListAllNotes';
import { Ionicons, FontAwesome } from '@expo/vector-icons';



const NaviTab = createTabNavigator(
  {
    Frontpage: { screen: Index },
    About: { screen: About },
    Coinlist: { screen: CoinlistTicker },
    Map: { screen: Map },
    Addnote: { screen: Addnote },
    ListAllNotes: { screen: ListAllNotes }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
         const { routeName } = navigation.state;
        let iconName;

        if (routeName === 'Frontpage') {
          iconName = `barcode`;
        } else if (routeName === 'About') {
          iconName = `tag`;
        } else if (routeName === 'Coinlist') {
          iconName = `bar-chart`;
        } else if (routeName === 'Map') {
          iconName = `globe`;
        } else if (routeName === 'Addnote') {
          iconName = `sticky-note`;
        } else if (routeName === 'ListAllnotes') {
          iconName = `globe`;
        } 

       return <FontAwesome name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'white',
      labelStyle: { fontSize: 16 },
      style: {
            backgroundColor: 'grey' // TabBar background
        }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
  }
);

export default NaviTab;
