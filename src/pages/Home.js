import React, { Component } from 'react';
import { 
    Text,
    View,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';

import Styles from "../assets/Styles";
//import backhome from "../assets/img/bh.jpg";
import backhome from "../assets/img/backhome.png";
import { Surface, Avatar, Divider } from 'react-native-paper';
import { Colors } from '../config/Colors';
import { _getAsync, _logout, _checkAuth } from '../libs/Helper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationEvents } from 'react-navigation';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: "",
            refreshable: false,
        };
    }

    componentDidMount() {
       _checkAuth().then(() => this._setup() );
    }

    _logut() {
        try {
            _logout();
            this.props.navigation.navigate("LoginStack");
        } catch (error) {
            console.log("ERROR FROM HOME");
            console.log(error);
            Alert.alert("failed", "Failed logout from home!")
        }
    }

    _setup = async () => {
        let name = await _getAsync('name');
        this.setState({
            name: name,
            refreshable: true
        });
    }
    render() {
        return (
            <>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <NavigationEvents onDidFocus={() => {
                            if (this.state.refreshable) {
                                _checkAuth(this.props.navigation);
                            }
                    }} />
                    <ImageBackground style={Styles.backhome} source={backhome}>
                       <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => this._logut()}>
                            <View  style={{padding: 15, alignSelf: 'flex-end', flexDirection: 'row'}}>
                            <Text style={{marginRight: 5, color: 'white', fontSize: 16, marginTop: 0}}>Logout</Text>
                            <FontAwesome5Icon name = 'sign-out-alt' size={22} color="white"/>
                        </View>
                       </TouchableOpacity>
                    </ImageBackground>
                    < Surface style = {
                        [Styles.cardHome, {
                            alignItems: 'center',
                            backgroundColor: 'rgba(253, 254, 254, 0.95)'
                        }]
                    } >
                        <Avatar.Text
                            label="pHq"
                            style={{ backgroundColor: Colors.primary, marginTop: 10 }}
                            size={100}
                            color='white'
                        />
                        <Text style={{ fontSize: 20, fontWeight: '600', marginTop: 15 }}>Hi... {this.state.name}</Text>
                        <Divider />
                        <Text style={{ marginTop: 0, fontWeight: '100', fontSize: 13 }}>Pak, gausah lulusin ari.. </Text>
                    </Surface>
                </ScrollView>
            </>
        );
    }
}

export default Home;