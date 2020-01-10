import React, { Component } from 'react';
import { createStackNavigator } from "react-navigation-stack";
import {
    Home,
    Configuration,
    Profile,
    Fishpond,
    FormPhConfig,
    FormFishpond,
} from '../pages'
import { Colors } from "./Colors";
import FA5 from 'react-native-vector-icons/FontAwesome5';

const defaultNavigationOptions = {
    title: 'Default Title',
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        fontWeight: 'bold'
    },
};

const HomeStack = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                header: null
            }
        }
    }
);
const ConfigurationStack = createStackNavigator(
    {
        Configuration: {
            screen: Configuration,
            navigationOptions:  {
                 headerLeft: null
            }
        },
        AddConfig: {
            screen: FormPhConfig
        }
    },
    {
        defaultNavigationOptions: defaultNavigationOptions,
        initialRouteName: 'Configuration'
    }
);

const ProfileStack = createStackNavigator(
    {
        Profile: {
            screen: Profile
        }
    }
);
const FishpondStack = createStackNavigator(
    {
        Fishpond: {
            screen: Fishpond
        },
    }, {
        defaultNavigationOptions: defaultNavigationOptions,
    }
);

export {
    HomeStack,
    ConfigurationStack,
    ProfileStack,
    FishpondStack,
}