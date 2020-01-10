import React, { Component } from 'react'
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import BottomTabNavigation from "./BottomTabNavigation";
import {AuthStack} from './AuthStack';


const SwitchRoute = createSwitchNavigator(
    {
        App: BottomTabNavigation,
        Auth: AuthStack
    },
    {
        initialRouteName: 'Auth'
    }
)
const Routes = createAppContainer(SwitchRoute);




export default Routes;