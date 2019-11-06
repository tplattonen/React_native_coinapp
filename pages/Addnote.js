import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Icon,
   Header,
  HeaderTab,
  Body,
  Title
} from 'native-base';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';
import { SQLite, ImagePicker, Location, Permissions } from 'expo';
import { Locate } from '../api/Locate';
import ListAllNotes from '../pages/ListAllNotes';

const db = SQLite.openDatabase('notes.db');

class Addnote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      heading: '',
      date: this.makeDate(),
      noteLocation: '',
      note: '',
      added: false,
    };
    this.id = '0';
    this.handleAdd = this.handleAdd.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.getLocationExpo = this.getLocationExpo.bind(this);
  }

  componentDidMount = () => {
    Locate(this.getLocationExpo);
  };

  getLocationExpo = async (lat, lon, status) => {
    // await Permissions.askAsync(Permissions.LOCATION);
    if (status === 200) {
      let location = { latitude: lat, longitude: lon };
      let geocode = await Location.reverseGeocodeAsync(location);
      this.setState({ noteLocation: geocode[0].city });
    }
  };

  makeDate = () => {
    let today = new Date();
    let month = today.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let day = today.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    let date = day + '.' + month + '.' + today.getFullYear();
    return date;
  };

  handleAdd() {
    db.transaction(tx => {
      let sql =
        'CREATE TABLE if not exists note (' +
        'id integer PRIMARY KEY NOT NULL, ' +
        'heading text NOT NULL, ' +
        'date date NOT NULL, ' +
        'location text NOT NULL, ' +
        'image blob, ' +
        'note text NOT NULL)';
      tx.executeSql(sql, null, null, this.virhe);

      sql =
        'INSERT INTO note (heading, date, location, image, note) ' +
        ' VALUES (?, ?, ?, ?, ?)';

      tx.executeSql(
        sql,
        [
          this.state.heading,
          this.state.date,
          this.state.noteLocation,
          this.state.image,
          this.state.note,
        ],
        this.ok,
        this.error
      );
    });
  
  }

  error = (tx, error) => {
    console.log('Addition failed!');
  };

  ok = () => {
    this.setState({ added: true });
    this.handleClear();
    // handleClear() must be called here because of adding to db is a async function and otherwise state will be cleared before
  };

  handleClear() {
    this.setState({ heading: '', date: '', location: '', note: '' });
    this.setState({ day: this.makeDate() });
  }

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    let result = await ImagePicker.launchCameraAsync({
      base64: true,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  getPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    return (
      <Container>
       <Header style={styles.header}>
         <Button
            transparent
            style={styles.menubutton}
            onPress={() => this.props.navigation.openDrawer()}>
            <Icon name="menu" style={styles.icon} />
          </Button>
          <Body style={styles.headerbody}>
            <Title>Add a note</Title>
          </Body>
        </Header>
        
        <Content style={styles.container}>
        <ImageBackground
            source={{
              uri:
                'https://images.unsplash.com/photo-1491902872224-17e8a4c88f10?ixlib=rb-1.2.1&w=1000&q=80',
            }}
            imageStyle={{ resizeMode: 'cover' }}
            style={styles.backgroundImage}>
          <Form>
            <View style={styles.buttonContainer}>
              <Button
                iconLeft
                light
                rounded
                style={styles.button}
                onPress={this.takePicture}>
                <FontAwesome name="camera-retro" style={styles.iconButton} />
                <Text>Take{"\n"} picture</Text>
              </Button>
              <Button
                iconLeft
                light
                rounded
                style={styles.button}
                onPress={this.getPicture}>
                <FontAwesome name="paperclip" style={styles.iconButtonB} />
                <Text>Retrieve picture</Text>
              </Button>
            </View>
            {this.state.image && (
              <Image source={{ uri: this.state.image }} style={styles.image} />
            )}
            <Item inlineLabel>
              <Label>Heading</Label>
              <Input
                value={this.state.heading}
                onChangeText={text => this.setState({ heading: text })}
              />
            </Item>

            <Item inlineLabel>
              <Label>Date</Label>
              <Text>{this.state.date}</Text>
              <DatePicker
                style={{ width: 200, flex: 1 }}
                date={this.state.date}
                mode="date"
                format="DD.MM.YYYY"
                confirmBtnText="OK"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: {
                    display: 'none',
                  },
                  dateIcon: {
                    position: 'absolute',
                    right: 0,
                  },
                }}
                onDateChange={date => {
                  this.setState({ date: date });
                }}
              />
            </Item>

            <Item inlineLabel>
              <Label>Location</Label>
              <Input
                value={this.state.noteLocation}
                onChangeText={text => this.setState({ noteLocation: text })}
              />
            </Item>

            <Item inlineLabel>
              <Label>Note</Label>
              <Input
                multiline={true}
                style={{ height: 50 }}
                value={this.state.note}
                onChangeText={text => this.setState({ note: text })}
              />
            </Item>

            <View style={styles.buttonContainer}>
              <Button
                iconLeft
                rounded
                style={styles.button}
                success
                onPress={this.handleAdd}>
                <Icon name="checkmark-circle" />
                <Text>Add</Text>
              </Button>
              <Button
                iconLeft
                rounded
                style={styles.button}
                danger
                onPress={this.handleClear}>
                <Icon name="backspace" />
                <Text>Clear</Text>
              </Button>
            </View>
             <Item>
                {this.state.added && <Text style={styles.noteSuccess}>"Note add successful"</Text>}
              </Item>
               <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
         
          </Form>
          </ImageBackground>
         
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '150%'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end', 
  },
  image: {
    flex: 1,
    width: 150,
    height: 150,
    alignSelf: 'center', 
    marginTop: 10,
  },
  button: {
    height: 45,
    width: 140,
    marginRight: 10,
    marginTop: 10,
  },
 
  icon: {
    color: 'white',
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
  noteSuccess: {
    alignSelf: 'center',
    textAlign: 'center'
  },
   backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    opacity: 1,
  },
  iconButton: {
    paddingLeft: 20,
    fontSize: 36
  },
   iconButtonB: {
    paddingLeft: 50,
     fontSize: 36
  }
});

export default Addnote;
