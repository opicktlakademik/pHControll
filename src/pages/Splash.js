import React, { Component } from 'react';
import { View } from 'react-native';
import Styles from "../assets/Styles";
import { Colors } from '../config/Colors';
import { Avatar } from 'react-native-paper';
import { _checkAuthorized } from '../libs/Helper';


class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        setTimeout(() => _checkAuthorized(this.props.navigation), 1000);
    }
    render() {
        return (
            <View style={[Styles.containerCentered, {backgroundColor: Colors.primaryDarker}]}>
                <Avatar.Text
                    size={80 / 100 * Styles.Width}
                    color={Colors.primary}
                    label="pHq"
                    style={{ backgroundColor: 'white' }}
                    labelStyle={{fontSize: 125, top: -7}}
                />
                <View
                    style={
                        {
                            backgroundColor: '#fffffd', width: 60 / 100 * Styles.Width, padding: 15, borderBottomRightRadius: 60, borderBottomLeftRadius: 60, marginTop: 15
                        }
                    }>
                    
                </View>
                <View
                    style={
                        {
                            backgroundColor: '#fffffd', width: 45 / 100 * Styles.Width, padding: 15, borderBottomRightRadius: 60, borderBottomLeftRadius: 60, marginTop: 7.6
                        }
                    }>
                    
                </View>
            </View>
        );
    }
}

export default Splash;