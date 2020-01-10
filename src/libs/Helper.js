import AsyncStorage from "@react-native-community/async-storage"

let _checkAuthorized = async (navigation) => {
    let login = await AsyncStorage.getItem('login');
    let username = await AsyncStorage.getItem('username');
    let password = await AsyncStorage.getItem('password');
    if (username != null && password != null && login == "wadadidaw") {
        navigation.navigate('App');
    } else {
        navigation.navigate('LoginStack');
    }
}

let _checkAuth = async (navigation) => {
    let login = await AsyncStorage.getItem('login');
    if (login != "wadadidaw") {
        _removeAsync('username');
        _removeAsync('password');
        _removeAsync('login');
        navigation.navigate('Auth');
    }
}

let _getAsync = async (item) => {
    let data = await AsyncStorage.getItem(item);
    return data;
}

let _setAsync = async (key, item) => {
    try {
        await AsyncStorage.setItem(key, item).then(() => { return true });
    } catch (error) {
        return false;
    }
}

let _removeAsync = async (key) => {
    try {
        await AsyncStorage.removeItem(key).then(() => true);
    } catch (error) {
        return false;
    }
}

let _logout = async (navigation = false) => {
    try {
        _removeAsync('username');
        _removeAsync('password');
        _removeAsync('login');
        _removeAsync('name');
        if (navigation != false) {
            navigation();
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export {
    _getAsync,
    _setAsync,
    _removeAsync,
    _checkAuth,
    _checkAuthorized,
    _logout,
}