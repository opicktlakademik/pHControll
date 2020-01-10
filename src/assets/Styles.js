import {
    StyleSheet,
    Dimensions
} from 'react-native';
import { Colors } from "../config/Colors";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        top: 0,
  },
    Height: Dimensions.get('window').height,
    Width: Dimensions.get('window').width,
    shadow: elevationShadowStyle(4),
    containerMarginPadding: {
        margin: 10,
        padding: 10,
    },
    textInput: {
        height: 50,
        marginVertical: 5,
    },
    textarea: {
        marginVertical: 5,
    },
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryDarker, 
        marginVertical: 5
    },
    containerCentered:{
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        flex: 1
    },
    surface: {
        marginVertical: 10,
        //height: 80,
        width: 90 / 100 * Dimensions.get('window').width,
        alignSelf: 'center',
        elevation: 4,
    },
    backhome: {
        width: Dimensions.get('window').width,
        height: 30 / 100 * Dimensions.get('window').height,
        alignContent: 'center',
        alignItems: 'center'
    },
    cardHome: {
        width: '90%',
        height: 30 / 100 * Dimensions.get('window').height,
        backgroundColor: 'white',
        marginTop: 40 / 100 * Dimensions.get('window').height - 30 / 100 * Dimensions.get('window').height,
        top: -30 / 100 * Dimensions.get('window').height,
        alignSelf: 'center',
        elevation: 4,
        borderRadius: 10
    }
});

export default Styles;

function elevationShadowStyle(elevation) {
    return {
        elevation,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0.5 * elevation
        },
        shadowOpacity: 0.3,
        shadowRadius: 0.8 * elevation
    };
}