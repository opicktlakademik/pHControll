import React, { Component } from 'react'
import FA5 from "react-native-vector-icons/FontAwesome5";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { 
    HomeStack,
    ConfigurationStack,
    ProfileStack,
    FishpondStack
} from "./AppStack";
import { Colors } from './Colors';
 
const BottomTabNavigation = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
        },
        Fishpond: {
            screen: FishpondStack
        },
        Config: {
            screen: ConfigurationStack
        },
        Profile: {
            screen: ProfileStack
        }
    }, {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horzontal, tintColor }) => {
            const { routeName } = navigation.state;
            let Icon = FA5;
            let iconName;

            switch (routeName) {
                case 'Home':
                    iconName = `home`;
                    break;
                case 'Profile':
                    iconName = `jenkins`;
                    break;
                case 'Config':
                    iconName = `cog`;
                    break;
                case 'Fishpond':
                    iconName = `water`;
                    break;
                default:
                    break;
            }
             return <Icon name={iconName} size={25} color={tintColor} />
        },
    }),
    tabBarOptions: {
        activeTintColor: Colors.active,
        inactiveTintColor: Colors.inactive
    }
}
);
export default BottomTabNavigation;