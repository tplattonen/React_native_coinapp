import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';


class BackgroundImage extends Component {

    render() {
        return (
            <Image source={require('../assets/cryptoback.jpg')} style={styles.backgroundImage}>
                    
                    {this.props.children}
                    
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
});