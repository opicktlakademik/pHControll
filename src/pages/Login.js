import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';  
import Styles from '../assets/Styles';
import { Colors } from '../config/Colors';
import {
    TextInput,
    Button
} from 'react-native-paper';
import { _login } from '../libs/Httpcrud';
import AsyncStorage from '@react-native-community/async-storage';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: null,
            password: null
         };
    }

    _submit = async () => {
        let username = this.state.username;
        let password = this.state.password;
        let login = null;

        if (username != null && password != null && username != " " && password != " " && username != "" && password != "") {
            login = await _login(username, password);
            if (login.status) {
                if (login.response.status) {
                    try {
                        await AsyncStorage.setItem('username', username);
                        await AsyncStorage.setItem('password', password);
                        await AsyncStorage.setItem('login', "wadadidaw");
                        await AsyncStorage.setItem('name', login.response.data.name);
                        this.props.navigation.navigate('App');
                    } catch (error) {
                        //console.log(error);
                        alert('asyn storage failed');
                    }
                } else {
                    Alert.alert('Login Failed: ', login.response.message);
                }
            } else {
                Alert.alert('Login Failed: ', login.response.toString());
            }
        } else {
            alert("Filed must not be empty");
        }
        //console.log(login);
    }
    render() {
        return (
            <View style={[Styles.containerCentered, { backgroundColor: Colors.primaryDarker }]}> 
                <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white', marginBottom: 30}}>pHControl</Text>
                <View style={[{ backgroundColor: 'rgba(255,255,255,0.6)', width: 90 / 100 * Styles.Width, height: 35 / 100 * Styles.Height, padding: 20, }]}>
                    <TextInput
                        style={[Styles.textInput, { backgroundColor: 'rgba(255,255,255,0.7)' }]}
                        placeholder='Username'
                        onChangeText={(value) => this.setState({ username: value })}
                        value={this.state.username}
                    />
                    <TextInput
                        style={[Styles.textInput, { backgroundColor: 'rgba(255,255,255,0.7)' }]}
                        placeholder='Password'
                        value={this.state.password}
                        onChangeText={(value) => this.setState({ password: value })}
                        secureTextEntry={true}
                    />
                        <Button mode='contained' onPress={() => this._submit()} style={{ backgroundColor: Colors.primary, marginTop: 20, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{alignSelf: 'center', justifyContent: 'center'}}>Login</Text>
                        </Button>
                </View>
            </View>
        );
    }
}

export default Login;