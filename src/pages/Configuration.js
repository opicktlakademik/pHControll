import { Text, View, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import React, { Component } from 'react';

import {
    AppHeader, ListConfig
} from '../components';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Styles from '../assets/Styles';
import { Button } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';
import { _get } from '../libs/Httpcrud';
import { _checkAuth, _removeAsync } from "../libs/Helper";
import AsyncStorage from '@react-native-community/async-storage';
import { Webservice } from '../config';

class Configuration extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: null,
            password: null,
            data: false,
            refreshing: false,
            indicator: <ActivityIndicator />,
            refreshData: false
        };
        _checkAuth(this.props.navigation);
        this._setup().then(() => this.getData()).then(() => this.setState({ refreshData: true }));
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (<AppHeader
                title="pH Configuration"
                subtitle="Manage your pH Config" />),
            headerRight: (<Icon
                name='plus-circle'
                style={{ marginRight: 10 }}
                size={25} color='white'
                onPress =  { () => navigation.navigate('AddConfig')}
            />),
            navigationOptions: {
                headerBackTitle: null
            }
           
        }
    }

    report = (data) => {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
                <Text>
                    {data.text}
                </Text>
                {data.other}
            </View>
        );
    } 

    getData = async (command = {refresh: false}) => {

        if (command.refresh) {
            this.setState({
                indicator: < ActivityIndicator />,
                data: false
            });
            _checkAuth(this.props.navigation);
        }
        let data;
         data = await _get(this.state.username, this.state.password, Webservice.config);
         if (data.status) {
             if (data.data.status) {
                 this.setState({
                     data: data.data
                 });
             } else {
                 this.setState({
                     indicator: this.report({
                         text: data.data.message,
                         other: <Button onPress={() => this.props.navigation.navigate('AddConfig')}>Add Data</Button>
                     }),
                     data: false
                 });
                 //console.log(data);
             }
         } else if (data.code == 401) {
             _removeAsync('username');
             _removeAsync('password');
             _removeAsync('login');
            this.props.navigation.navigate('Auth');
         } else {
             this.setState({
                 indicator: this.report({
                     text: data.data.toString(),
                     other: <Button onPress={() => this.getData({ refresh: true })}>Reload</Button>
                 }),
                 data: false
             });
        }
       // console.log(data)
    }

    async _setup() {
        await AsyncStorage.getItem('username').then((val) => {
            if (val != null) {
                this.setState({ username: val })
            } else {
                async () => await AsyncStorage.setItem('username', null);
                async () => await AsyncStorage.setItem('password', null);
                this.props.navigation.navigate('Auth');
            }
        }).then(async () => {
            await AsyncStorage.getItem('password').then((val) => {
                if (val != null) {
                    this.setState({ password: val })
                } else {
                    async () => await AsyncStorage.setItem('username', null);
                    async () => await AsyncStorage.setItem('password', null);
                    this.props.navigation.navigate('Auth');
                }
            });
        });
       // console.log(this.state)
    }
    

    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing = {
                            this.state.refreshing
                            }
                        onRefresh = {
                           () => this.getData({refresh: true})
                            }
                />}
                showsVerticalScrollIndicator={false}
                style={{ flex: 1,}}> 
                <NavigationEvents onDidFocus={() => { if (this.state.refreshData) { _checkAuth(this.props.navigation); this.getData();}}} />
                <View style={[Styles.container, {marginTop: 10, flex: 1, minHeight: 75 / 100 * Styles.Height}]}>  
                {
                    this.state.data == false 
                        ? <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flex: 1}}>
                            {this.state.indicator}
                        </View>
                        
                        : <ScrollView>
                            <ListConfig navigation={this.props.navigation} refresh={() => this.getData({refresh: true})} data={this.state.data.data} /> 
                        </ScrollView>
                }
                </View>
            </ScrollView>
        );
    }
}

export default Configuration;