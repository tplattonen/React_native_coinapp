import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon } from 'native-base';
import { Location, MapView } from 'expo';
import { Locate } from '../api/Locate';
//import Maploca from '../pages/Maploca';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 60.1882,
        longitude: 24.9404,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      },
      marker1: {
        latitude: 60.1843,
        longitude: 24.9493,
      },
      marker2: {
        latitude: 60.1709,
        longitude: 24.9437,
      },
      marker3: {
        latitude: 60.2016434,
        longitude: 24.9319998,
      }
    };
  }

  updateLocation = (lat, lon, status) => {
      if (status === 200) {
        this.setState({
          region: {
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          },
        });
        this.setState({ marker3: { latitude: lat, longitude: lon } });
        this.setState({ marker2: { latitude: lat, longitude: lon } });
        this.setState({ marker1: { latitude: lat, longitude: lon } });
    }
  }

  
  render() {
    return (
      <View style={styles.container}>
        <MapView style={{ flex: 1 }} region={this.state.region}>
          <MapView.Marker coordinate={this.state.marker1} title={'Headquarters'} />
          <MapView.Marker coordinate={this.state.marker2} title={'Bitcoin ATM'} />
          <MapView.Marker coordinate={this.state.marker3} title={'Haaga-Helia'} />
        </MapView>
        <Button
          transparent
          style={styles.button}
          onPress={() => this.props.navigation.openDrawer()}>
          <Icon name="menu" style={styles.icon} />
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: 'white',
  },
  button: {
    position: 'absolute',
    top: 15,
    left: 0,
    right: 0,
  },
  icon: {
    color: 'black',
  },
});

export default Map;
