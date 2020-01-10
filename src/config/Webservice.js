
const domain = null;
const ip = '192.168.7.4';
//const ip = '10.69.69.242';
//const ip = "36.78.41.120";
const http = 'http://';
const https = 'https://';

const base_url = `${http}${ip}/ph-controll/`;

const Webservice = {
    base_url: base_url,
    config: `${base_url}api/v1/config/`,
    login: `${base_url}api/v1/login`,
    fishpond: `${base_url}api/v1/fishpond`,
}

export default Webservice;