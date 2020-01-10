import React, { Component } from 'react';
import {Text} from "react-native-paper";
import { View } from 'react-native';
import { Colors } from '../config/Colors';

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <>
                <View style={{flexDirection: "column", marginHorizontal: 10}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                        {this.props.title}
                    </Text>
                    <Text style={{fontSize: 12, color: 'white'}}>
                        {this.props.subtitle}
                    </Text>
               </View>
            </>
        );
    }
}

export default AppHeader;