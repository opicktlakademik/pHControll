import React from 'react';
import axios from 'axios'
import { ScrollView, View, Alert, ActivityIndicator, Text } from 'react-native';
import Styles from '../assets/Styles';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { Webservice } from '../config';
import {
    _getAsync,
    _setAsync,
    _removeAsync,
    _checkAuth
} from '../libs/Helper';

export default class FormPhConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: {
                username: "_getAsync('username')",
                password: "_getAsync('password')",
            },
            name: "",
            min_ph: null,
            max_ph: null,
            note: "",
            isLoading: false,
            indicator: (<ActivityIndicator />),
            isUpdate: false
        };
        this._setup();
    }

    _setup = async () => {
        let username = await _getAsync('username');
        let password = await _getAsync('password');
        this.setState({
            auth: {
                username: username,
                password: password,
           }
        })
    }

    static navigationOptions = {
        title: "Add pH Configuration"
    }

    componentDidMount() {
        _checkAuth();
        let data = this.props.navigation.getParam('data');
        if (typeof data != 'undefined') {
            this.setState({
                name: data.name,
                max_ph: data.ph_max.toString(),
                min_ph: data.ph_min.toString(),
                note: data.note,
                isUpdate: true,
                id: data.id,
            })
        }
        
    }


    _submit() {

        _checkAuth();
        this.setState({ isLoading: true });
        let formData = new FormData();

        formData.append('name', this.state.name);
        formData.append('ph_min', this.state.min_ph);
        formData.append('ph_max', this.state.max_ph);
        formData.append('note', this.state.note);
    

        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");

        let url = Webservice.config;
        url += this.state.isUpdate ? `${this.state.id}` : "";

        axios({
            url: url,
            method: 'POST',
            data: formData,
            headers: headers,
            auth: this.state.auth
        }).then(
            (res) => {
                this.setState({
                    isLoading: false,
                    name: " ",
                    max_ph: null,
                    min_ph: null,
                    note: " ",
                });
                let title = res.data.status ? "Success" : "Failed";
                let message = res.data.message.toString();
                Alert.alert(title, message);
                this.props.navigation.navigate('Configuration');
            },
            (error) => {
                this.setState({ isLoading: false })
                if (error.response.status == 401) {
                    _removeAsync('username')
                    _removeAsync('password')
                    this.props.navigation.navigate('Auth');
                } else {
                    let message = typeof error.response != 'undefined' ? error.response.data.message : error.toString();
                    Alert.alert(`Failed input data!`, message);
                    console.log(error.response.status)
                }
                
            }

        );

    }

    _showAlert(data) {
        let title = data.status ? "Success" : "Failed";
        let message = data.message.toString();
        Alert.alert(title, message);
        
    }

    render() {
        return (
            this.state.isLoading
                ? (
                    <View style={{ justifyContent: 'center', flex: 1, alignSelf: 'center' }}>
                        {this.state.indicator}
                    </View>
                )
                : (
                <ScrollView>
                    <View style={[Styles.containerMarginPadding, {backgroundColor: '#FAFAFA'}, Styles.shadow]}>

                        <HelperText type="error" visible={true} >
                            *Required
                        </HelperText>

                        <TextInput maxLength={20} blurOnSubmit={true} ref='name' mode="outlined" value={this.state.name} onChangeText={(value) => this.setState({name: value}) } style={Styles.textInput} label="Name of Configuration" placeholder="Input name of configuration" underlineColor="#FAFAFA" selectionColor="#FAFAFA"/>

                        <HelperText type="error" visible={true} >
                            *Required
                        </HelperText>

                        <TextInput maxLength={2} blurOnSubmit={true} ref='min_ph' mode="outlined" value={this.state.min_ph} onChangeText={(value) => this.setState({min_ph: value}) } style={Styles.textInput} label="Min. pH" keyboardType='number-pad' />

                        <HelperText type="error" visible={true} >
                            *Required
                        </HelperText> 

                        <TextInput maxLength={2} blurOnSubmit={true} ref='max_ph' mode="outlined" value={this.state.max_ph} onChangeText={(value) => this.setState({ max_ph: value })} style={Styles.textInput} label="Max. pH" keyboardType='number-pad' />


                         <HelperText type="info" visible={true} >
                            Optional
                        </HelperText> 
                        <TextInput blurOnSubmit={true} ref='note' mode="outlined" value={this.state.note} onChangeText={(value) => this.setState({note: value}) } style={Styles.textarea} label="Note" multiline={true} numberOfLines={5} />

                        <Button style={Styles.button} mode="contained" onPress={() => this._submit()}>
                            Submit
                        </Button>
                    </View>
                </ScrollView>
                )
        );
    }
}
