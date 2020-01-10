import React, { Component } from 'react';
import Styles from '../assets/Styles';
import {
    Surface,
    Card,
    Paragraph,
    IconButton,
    Button
} from 'react-native-paper';
import {
    Alert,
    Text,
} from 'react-native';
import Axios from 'axios';
import { _get, _delete } from '../libs/Httpcrud';
import { Colors } from '../config/Colors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { _getAsync } from '../libs/Helper';


class ListConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
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

    _confirm(id) {
        Alert.alert(
            "Perhatian!",
            "Apakah anda yakin ingin menghapus data ini?",
            [
                { text: "Delete", onPress: () => this._delete(id), style: 'ok' },
                { text: "Cancel", style: 'cancel' },
            ],
            { cancelable: true }
        );
    }

    _delete = async (id) => {
        await _delete(id, this.state.auth);
        this.props.refresh();
    }

    render() {
        return (
            <>
                {
                    this.props.data.map((val, i) => {
                        return(
                        <Surface key={i} style={[Styles.surface]}>
                            <Card>
                                <Card.Title
                                    style={{marginTop: -10, paddingVertical: 10}}
                                    title={val.name}
                                    subtitle={`pH min ${val.ph_min} | pH max ${val.ph_max}`}
                                />
                                <Card.Content>
                                    <Paragraph textBreakStrategy='highQuality'>
                                        {val.note}
                                    </Paragraph>
                                </Card.Content>
                                <Card.Actions style={{ flexDirection: 'row-reverse',  }}>
                                    <Text onPress={() => this._confirm(val.id)} style={{marginHorizontal: 5, fontSize: 16, color: Colors.primaryDarker, justifyContent: 'space-between'}}>
                                        <FontAwesome5Icon name='trash' size={15} />
                                            { " " }Delete
                                    </Text>
                                    <Text onPress={() => this.props.navigation.push('AddConfig', {data:val})} style={{marginHorizontal: 5, fontSize: 16, color: Colors.primaryDarker, justifyContent: 'space-between'}}>
                                        <FontAwesome5Icon name='cog' size={15} />
                                            { " " }Update
                                    </Text>
                                </Card.Actions>
                            </Card>
                        </Surface>)
                    })
                }
            </>
        );
    }
}

export default ListConfig;