import React, { Component } from 'react';
import { 
    Text,
    View,
 } from 'react-native';
import { _removeAsync } from '../libs/Helper';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        
    }
    render() {
        return (
            <View>
                <Text>Profile</Text>
            </View>
        );
    }
}

export default Profile;