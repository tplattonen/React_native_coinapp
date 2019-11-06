import React, { Component } from 'react';
import {
  Card,
  CardItem,
  Container,
  Header,
  HeaderTab,
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
  View,
} from 'native-base';
import { StyleSheet, Image, ImageBackground, Linking } from 'react-native';
import { Thumbnail } from 'native-base';

class About extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Button
            transparent
            style={styles.button}
            onPress={() => this.props.navigation.openDrawer()}>
            <Icon name="menu" style={styles.icon} />
          </Button>
          <Body style={styles.headerbody}>
            <Title>About application</Title>
          </Body>
        </Header>
        <Content>
          <ImageBackground
            source={{
              uri:
                'https://images.unsplash.com/photo-1491902872224-17e8a4c88f10?ixlib=rb-1.2.1&w=1000&q=80',
            }}
            imageStyle={{ resizeMode: 'stretch' }}
            style={styles.backgroundImage}>
            <View style={styles.textContainer}>
              <Text>
                Welcome to the cryptocoin application. This application was made
                as school exercise and was mainly about learning React Native.
                Idea for this project came from wanting to know more about
                coding with React Native and to get more intel on crypto
                currencies.
              </Text>
              <Text style={styles.aboutText}>
                This application uses API from coinmarketcap.com to monitor
                changes in crypto currency values and their prices.
              </Text>
              <Text>{'\n'}</Text>
               <Text
                style={{ color: 'blue' }}
                onPress={() => Linking.openURL('https://coinmarketcap.com/')}>
                Coinmarketcap
              </Text>
              <Text>{'\n'}</Text>
              <Text style={styles.aboutText}>
                I find fairly usefull for myself as I own some crypto currency
                myself and I think there is a huge potential for future
                development, which I think I will look into in near future.
              </Text>
              <Text style={styles.aboutText}>
                More information about crypto currencies can be found from the
                following web sites:
              </Text>
              <Text>{'\n'}</Text>
              <Text
                style={{ color: 'blue' }}
                onPress={() => Linking.openURL('https://blockgeeks.com/guides/what-is-cryptocurrency/')}>
                What is crypto currency
              </Text>
              <Text>{'\n'}</Text>
              <Text
                style={{ color: 'blue' }}
                onPress={() => Linking.openURL('https://cryptocurrencyfacts.com/')}>
                Cryptocurrencyfacts.com
              </Text>
              <Text>{'\n'}</Text>
              <Text style={styles.aboutText}>
                If you want to know more about buying and selling of these
                currencies and the actual market behind them I advice you to
                search the internet as it is blooming with different kinds of
                guides to benefit your cause.
              </Text>
              <Text style={styles.aboutText}>
                I really suggest you look look into the coin and do research
                thoroughly before investing in anything so you'll get a proper
                view and understanding of what you are really investing your
                money for, especially with smaller coins.
              </Text>
              <Text style={styles.aboutText}>
                Hope you'll enjoy the application!
              </Text>
      
              <Card>
                <CardItem>
                  <Thumbnail source={require('../assets/tuomaspic.PNG')} />
                  <Body>
                    <Text style={{ fontSize: 14 }}> Tuomas Plattonen</Text>
                    <Text style={{ fontSize: 12 }}>
                      {' '}
                      Student at Haaga-Helia University of applied sciences
                    </Text>
                  </Body>
                </CardItem>
              </Card>
            </View>
          </ImageBackground>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1a1a1a',
  },

  headerbody: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#1a1a1a',
  },
  container: {
    paddingTop: 25,
    flex: 1,
  },
  textContainer: {
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    opacity: 1,
  },
  aboutText: {
    paddingTop: 8,
  },
});

export default About;
