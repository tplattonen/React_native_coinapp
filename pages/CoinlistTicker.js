import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  ImageBackground,
  View,
  FlatList,
  AppRegistry,
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
  Overlay,
} from 'native-base';
import { List, ListItem } from 'react-native-elements';
import BackgroundImage from '../components/BackgroundImage';

class CoinlistTicker extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: 'false',
    };
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.flatcontainer}>
        <Card>
          <View>
            <CardItem>
              <Text style={styles.coinName}>Name: {item.name}</Text>
            </CardItem>
            <CardItem>
              <Text style={styles.coinSymbol}>Coin symbol: {item.symbol}</Text>
            </CardItem>
            <CardItem>
              <Text style={styles.coinAka}>
                Also known as: {item.website_slug}
              </Text>
            </CardItem>
            <CardItem>
              <Text style={styles.coinPrice}>
                USD Price: ${item.quotes && item.quotes.USD.price}
              </Text>
            </CardItem>
            <CardItem>
              <Text style={styles.coinRank}>Rank: {item.rank}</Text>
            </CardItem>

            <CardItem>
              <Text>Circulating supply: {item.circulating_supply}</Text>
            </CardItem>
            <CardItem>
              <Text>Total supply: {item.total_supply}</Text>
            </CardItem>
            <CardItem>
              <Text>Max supply: {item.max_supply}</Text>
            </CardItem>

            <CardItem>
              <Text>
                Volume 24h: ${item.quotes && item.quotes.USD.volume_24h}
              </Text>
            </CardItem>
            <CardItem>
              <Text>
                Market cap: ${item.quotes && item.quotes.USD.market_cap}
              </Text>
            </CardItem>
          </View>
          <View style={styles.statisticsContainer}>
            <CardItem>
              <Text
                style={
                  item.quotes && item.quotes.USD.percent_change_1h < 0
                    ? styles.percentChangeMinus
                    : styles.percentChangePlus
                }>
                % Change in 1 hour: 
                {item.quotes && item.quotes.USD.percent_change_1h} %
              </Text>
            </CardItem>
            <CardItem>
              <Text
                style={
                  item.quotes && item.quotes.USD.percent_change_24h < 0
                    ? styles.percentChangeMinus
                    : styles.percentChangePlus
                }>
                % Change in 1 day: 
                {item.quotes && item.quotes.USD.percent_change_24h} %
              </Text>
            </CardItem>
            <CardItem>
              <Text
                style={
                  item.quotes && item.quotes.USD.percent_change_7d < 0
                    ? styles.percentChangeMinus
                    : styles.percentChangePlus
                }>
                % Change in 1 week: 
                {item.quotes && item.quotes.USD.percent_change_7d} %
              </Text>
            </CardItem>
          </View>
        </Card>
        {/* Muistin virkistämiseksi: tää lause on sama kuin: "Jos item.quotes on olemassa, sitten näytä item.quotes.USD.price" */}
        <Text>{'\n'}</Text>
      </View>
    );
  };

  /* Fetcing data from the server */
  componentDidMount() {
    const url = 'https://api.coinmarketcap.com/v2/ticker/?limit=10';
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
    return (
      <Container style={styles.conImage}>
        <Header style={styles.header}>
         <Button
            transparent
            style={styles.button}
            onPress={() => this.props.navigation.openDrawer()}>
            <Icon name="menu" style={styles.icon} />
          </Button>
          <Body style={styles.headerbody}>
            <Title>Crypto coin information</Title>
          </Body>
        </Header>

        <Content style={styles.content}>
          <ImageBackground
            source={{
              uri:     'https://248qms3nhmvl15d4ne1i4pxl-wpengine.netdna-ssl.com/wp-content/uploads/2018/05/Trading-chart-760x400.jpg',
            }}
            imageStyle={{ resizeMode: 'stretch' }}
            style={styles.backgroundImage}>
            <View style={styles.container}>
              {/*Object.values(objekti) muuttaa tosiaan objektin arvot listaan */}
              <FlatList
                data={Object.values(this.state.dataSource)}
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
  flatcontainer: {
    display: 'flex',
    marginBottom: 20,
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 3,
    padding: 20,
  },
  coinSymbol: {
    fontWeight: 'bold',
  },
  coinRank: {
    fontWeight: 'bold',
  },
  coinAka: {
    fontWeight: 'bold',
  },
  statisticsContainer: {
    display: 'flex',
    borderTopColor: '#FAFAFA',
    borderTopWidth: 2,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  percentChangePlus: {
    color: '#00BFA5',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  percentChangeMinus: {
    color: '#DD2C00',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  coinName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  coinPrice: {
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  conImage: {
    flex: 1,
    width: null,
    height: 100,
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
  content: {},
  container: {},
});

export default CoinlistTicker;
