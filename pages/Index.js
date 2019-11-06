import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
} from 'native-base';
import { StyleSheet, Image, ImageBackground } from 'react-native';
import { Thumbnail } from 'native-base';


class Index extends Component {
  render() {
    return (
      <Container>
        <ImageBackground
          source={{
            uri:
              'https://images.pexels.com/photos/251287/pexels-photo-251287.png?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          }}
          imageStyle={{ resizeMode: 'stretch' }}
          style={styles.backgroundImage}>
          <Button
            transparent
            style={styles.button}
            onPress={() => this.props.navigation.openDrawer()}>
            <Icon name="menu" style={styles.icon} />
          </Button>
          <Text style={styles.welcome}>Welcome to CoinApp!</Text>
          <Image
            source={{
              uri: 'https://www.blockchainappfactory.com/images/bit%20coin.png',
            }}
          />
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    textAlign: 'center',
    contentAlign: 'center',
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 42,
    top: '65%',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    opacity: 2.8,
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

export default Index;
