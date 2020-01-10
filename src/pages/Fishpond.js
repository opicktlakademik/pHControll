import React, { Component } from 'react';
import { 
    View,
    Alert,
    ActivityIndicator,
    Text,
    RefreshControl
 } from 'react-native';
import { AppHeader } from '../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { _getAsync, _checkAuth, _logout } from '../libs/Helper';
import { _get } from '../libs/Httpcrud';
import { Webservice } from '../config';
import Styles from '../assets/Styles';
import { ListFishpond } from "../components";
import { Button, Dialog, TextInput } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';
import { Colors } from '../config/Colors';

class Fishpond extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            auth: {
                username: null,
                password: null,
            },
            data: false,
            indicator: (<ActivityIndicator />),
            refreshing: false,
            refreshData: false,
            dialogVisibility: false,
            idDevice: 0
        };

        _checkAuth(this.props.navigation).then(() => this._setup()).then(() => this._getData()).then(() => this.setState({refreshData: true}));
    }

    _getData = async (command = { refresh: false }) => {
        _checkAuth(this.props.navigation);
        if (command.refresh) {
            this.setState({
                data: false,
                indicator: <ActivityIndicator />
            });
        }
        let data = await _get(this.state.auth.username, this.state.auth.password, Webservice.fishpond);
        if (data.status) {
            if (data.data.code == 200) {
                this.setState({data: data.data.data})
            } else if(data.data.code == 404){
                this.setState({
                    data: false
                })
            } else {
                Alert("Something Wrong!", data.data.message);
            }
        } else if(data.code == 401) {
            _logout(this.props.navigation.navigate('LoginStack'));
        } else {
            this.setState({
               indicator:  this._report({
                    text: data.data.toString(),
                    other: <TouchableOpacity onPress={() => this._getData({refresh: true})}><Button>Reload</Button></TouchableOpacity>
                })
           })
        }
            
    }

    _report = (data) => {
        return (
            <View>
                <Text>{data.text}</Text>
                {data.other}
            </View>
        );
    }

    _setup = async () => {
        let username = await _getAsync('username');
        let password = await _getAsync('password');
        this.setState({
            auth: {
                username: username,
                password: password,
            },
        });
    }

    _dialogHandle (visible) {
        this.setState({ dialogVisibility: visible });
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: (<AppHeader
                title="Fishpond Management"
                subtitle="Manage your fishpond here"
            />),
            headerRight: (<Icon
                name='plus-circle'
                style={{ marginRight: 10 }}
                size={25} color='white'
                onPress={
                    navigation.getParam('dialog')
                }
            />),

        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        navigation.setParams({
            dialog: () => this._dialogHandle(true)
        })
    }

    render() {
        return (
            <>
                <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._getData({refresh: true})} />}>
                    {
                        !this.state.data
                            ?
                            <View style={{ justifyContent: 'center', width: Styles.Width, height: 80/ 100 * Styles.Height, alignItems: 'center' }}>
                                {this.state.indicator}
                            </View>
                            :
                            <ListFishpond data={this.state.data} navigation={this.props.navigation} />
                    }
                    <NavigationEvents onDidFocus={() => { if (this.state.refreshData) { this._getData();}}} />
                </ScrollView>
                <Dialog visible={this.state.dialogVisibility} onDismiss={() => this._dialogHandle(false)}>
                    <Dialog.Title>Input Device ID </Dialog.Title>
                    <Dialog.Content>
                        <TextInput keyboardType='numeric' onChangeText={(value) => this.setState({idDevice: value})} value={this.state.idDevice} mode='flat' style={{paddingVertical: -10, backgroundColor: 'white', marginVertical: -10}}  />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <TouchableOpacity onPress={() => this._dialogHandle(false)}>
                            <Button labelStyle={{color: 'rgba(0,0,0,0.5)'}}>Cancel</Button>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Button labelStyle={{color: '#000'}}>Process</Button>
                        </TouchableOpacity>
                    </Dialog.Actions>
                </Dialog>
            </>
        );
    }
}

export default Fishpond;