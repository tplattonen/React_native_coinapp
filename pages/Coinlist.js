import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  ImageBackground,
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Content,
  Button,
  Icon,
  Title,
  Text,
  Footer,
  Thumbnail,
  Item,
  Input,
  Form,
  Card,
  CardItem,
} from 'native-base';
import { List, ListItem } from 'react-native-elements';

class Coinlist extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
    };
  }

  renderItem = ({ item }) => {
    console.log(item);
    return (
      <View>
        <View>
        <Card>
          <CardItem>
          <Text>ID: {item.id}</Text>
          </CardItem>
          <CardItem>
          <Text>Name: {item.name}</Text>
</CardItem>
          <CardItem>
          <Text>Symbol: {item.symbol}</Text>
</CardItem>
          <CardItem>
          <Text>Alias: {item.website_slug}</Text>
</CardItem>
          
          <Text>{'\n'}</Text>
          </Card>
        </View>
      </View>
    );
  };
  /* Fetcing data from the server */
  componentDidMount() {
    const url = 'https://api.coinmarketcap.com/v2/listings/';
    fetch(url)
      .then(Response => Response.json())
      .then(ResponseJson => {
        this.setState({
          dataSource: ResponseJson.data,
        });
      })
      .catch(Error => {
        console.log(Error);
      });
  }

  render() {
    console.log(this.state);
    return (
      <Container>
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
                'https://us.123rf.com/450wm/oly5/oly51506/oly5150601746/40772589-gris-textura-suave-de-fondo.jpg?ver=6',
            }}
            imageStyle={{ resizeMode: 'stretch' }}
            style={styles.backgroundImage}>
            <View style={styles.container}>
              <FlatList
                data={this.state.dataSource}
                renderItem={this.renderItem}
              />
            </View>
          </ImageBackground>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#1a1a1a',
  },
  headerbody: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#1a1a1a',
  },
   backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});

export default Coinlist;
