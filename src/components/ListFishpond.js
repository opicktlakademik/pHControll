import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Styles from '../assets/Styles';
import { Surface, Card, Title, Avatar, DataTable } from 'react-native-paper';
import { Colors } from '../config/Colors';
import FA5 from 'react-native-vector-icons/FontAwesome5';

class ListFishpond extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <>
                {this.props.data.map((val, i) => {
                    return (
                        <Surface key={i} style={[Styles.surface]}>
                            <Card>
                                <Card.Title
                                    title={`Device: ${val.id_device}`}
                                    subtitle={`IP: ${val.ip}`}
                                    titleStyle={{ fontSize: 18, marginBottom: -5}}
                                    style={{ backgroundColor: 'white', paddingVertical: 0 }}
                                    left = {
                                            (props) => < Avatar.Icon size = {
                                                50
                                            }
                                            style = {
                                                {
                                                    backgroundColor: Colors.primary,
                                                    marginVertica: -5
                                                }
                                            }
                                            icon = {
                                                (props) => ( < FA5 name = 'fax' {
                                                        ...props
                                                    }
                                                    color = 'white' size={20} /> )
                                            }
                                            />}
                                />
                            </Card>
                            <Card.Content>
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title>Name</DataTable.Title>
                                        <DataTable.Title numeric>pH Min</DataTable.Title>
                                        <DataTable.Title numeric>pH Max</DataTable.Title>
                                        <DataTable.Title numeric>Curr. pH</DataTable.Title>
                                    </DataTable.Header>
                                    {
                                        val.fishpond.map((fishpond, i) => {
                                            if (fishpond.id_fishpond != null) {
                                                return (
                                                    <DataTable.Row key={"tb"+i}>
                                                        <DataTable.Cell>{fishpond.name}</DataTable.Cell>
                                                        <DataTable.Cell numeric>{fishpond.ph_min != null ? fishpond.ph_min : (<Text style={{fontStyle: "italic", color: Colors.inactive, fontSize: 11}}>unset</Text>)}</DataTable.Cell>
                                                        <DataTable.Cell numeric>{fishpond.ph_max != null ? fishpond.ph_max : (<Text style={{fontStyle: "italic", color: Colors.inactive, fontSize: 11}}>unset</Text>)}</DataTable.Cell>
                                                        <DataTable.Cell numeric>{fishpond.current_ph}</DataTable.Cell>
                                                    </DataTable.Row>
                                                );
                                            } else {
                                                return (
                                                    <Text
                                                        key={`t${i}`}
                                                        style={
                                                            { alignSelf: 'center', marginVertical: 10, fontSize: 11, fontStyle: 'italic', color: 'rgba(0,0,0,0.3)' }
                                                        }>* This device has no fishpond *</Text>
                                                );
                                            }
                                            })
                                    }
                                </DataTable>
                            </Card.Content>
                        </Surface>
                    );
                })}
            </>
            
             );
         }
     }
     
export default ListFishpond;