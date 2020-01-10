import Axios from "axios";
import { Webservice } from "../config";
import { Alert } from "react-native";
import { _removeAsync } from "./Helper";

let _get = async (username, password, url) => {
    let uri = url;
    let data = await Axios.get(uri, {
        auth: {
            username: username,
            password: password
        },
    }).then(
        (res) => {
            return {status: true, data: res.data};
        },
        (err) => {
            if (typeof err.response != 'undefined') {
                return {status: false, data: err, code: err.response.status}
            } else {
                return {status: false, data: err, code: err};
            }
        }
    );
    
    return data;
}

const _delete = async (id, auth) => {

    let uri = Webservice.config + id;
    await Axios.delete(uri, {
        auth: auth,
        responseType: 'json'
    })
        .then(
            (res) => {
                Alert.alert("Success!", "Data berhasil dihapus");
            },
            (error) => {
                if (error.response.status == 401) {
                    _removeAsync('username')
                    _removeAsync('password')
                    _removeAsync('login')
                    console.log(error.response)
                } else {
                    Alert.alert("Failed!", "Data gagal dihapus. ada yang salah");
                }
            }
        )
}

let _login = async (username, password) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    let req = Axios({
        url: Webservice.login,
        headers: myHeaders,
        data: formData,
        method: 'POST'
    }).then(
        (res) => {
            return {status: true, response: res.data};
            //console.log(res)
        },
        (error) => {
            return { status: false, response: error, url: Webservice.login };
        }
    );
    return req;
}

export {
    _get,
    _delete,
    _login
}