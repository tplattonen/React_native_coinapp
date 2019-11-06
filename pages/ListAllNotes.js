import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Header,
  Button,
  Icon,
  Title
} from 'native-base';
import { SQLite } from 'expo';


const db = SQLite.openDatabase('notes.db');

class ListAllNotes extends Component {
  constructor(props) {
    super(props);
    this.state = { notes: [] };
  }

  componentDidMount = () => {
    
    db.transaction(tx => {
      let sql =
        'CREATE TABLE if not exists note (' +
        'id integer PRIMARY KEY NOT NULL, ' +
        'heading text NOT NULL, ' +
        'date date NOT NULL, ' +
        'location text NOT NULL, ' +
        'image blob, ' +
        'note text NOT NULL)';

      tx.executeSql(sql, null, null, this.error);
    });
  };

  getNotes = () => {
    db.transaction(tx => {
      tx.executeSql('select * from note', null, this.ok, this.error);
    });
  };

  ok = (tx, results) => {
    console.log(JSON.stringify(results.rows._array));
    this.setState({ notes: results.rows._array });
  };

  error = (tx, error) => {
    console.log('Error: ' + error);
  };

  

  renderItem = note => {
    return (
      <ListItem
        avatar
        onPress={() =>
          this.props.navigation.navigate('Note', { image: note.image })
        }>
        <Left>
          <Thumbnail source={{ uri: note.image }} />
        </Left>
        <Body>
          <Text>{note.heading}</Text>
          <Text note>{note.location}</Text>
          <Text note>{note.note}</Text>
        </Body>
        <Right>
          <Text note>{note.date}</Text>
        </Right>
      </ListItem>
    );
  };

  render() {
    
    this.getNotes();

    if (this.state.notes.length === 0) {
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
            <Title>List of notes</Title>
          </Body>
        </Header>
          <Content>
            <Text>No notes available</Text>
          </Content>
        </Container>
      );
    }
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
            <Title>List of notes</Title>
          </Body>
        </Header>
        <Content>
          <List dataArray={this.state.notes} renderRow={this.renderItem} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    backgroundColor: 'white',
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
});

export default ListAllNotes;
