// JavaScript Document

var axios = require('axios');

require('dotenv').config();

const tenant_token_api = 'https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal'
const user_info_api = 'https://open.larksuite.com/open-apis/authen/v1/access_token'

async function get_tenant_token() {
    // get tenant access token
    var data = JSON.stringify({
        "app_id": process.env.APP_ID,
        "app_secret": process.env.APP_SECRET
    });

    var config = {
        method: 'POST',
        url: tenant_token_api,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    var response = await axios(config)
    // End tenant access token

    return response.data.tenant_access_token
}

async function get_user_identity(token, code) {
    // Get Login user Identity
    var data = JSON.stringify({
        "grant_type": "authorization_code",
        "code": code
    });

    var config = {
        method: 'POST',
        url: user_info_api,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        data: data
    };

    var user_info = await axios(config)
        .then(function (response) {

            console.log(JSON.stringify(response.data));
            return response.data
        })
        .catch(function (error) {
            console.log(error);
        });

    return user_info
    // End Login user Identity
}

exports.get_tenant_access_token = async function (code) {



    var code = this.parse(code.code);

    var response = await get_tenant_token()

    return await get_user_identity(response, code)
}

