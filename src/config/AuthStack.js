import React, {
    Component
} from 'react';
import {
    createStackNavigator
} from "react-navigation-stack";
import { Login, Splash } from '../pages';


const AuthStack = createStackNavigator(
    {
        LoginStack: {
            screen: Login,
            navigationOptions: {
                header: null
            }
        },
        SplashStack: {
            screen: Splash,
            navigationOptions: {
                header: null
            }
        }
    }, {
        initialRouteName: 'SplashStack'
    }
);

export {
    AuthStack,
}