// JavaScript Document

var axios = require('axios');

require('dotenv').config();

exports.get_tenant_access_token = async function (code) {


    var tenant_token_api = 'https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal'
    var user_info_api = 'https://open.larksuite.com/open-apis/authen/v1/access_token'

    var code = this.parse(code.code);

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
            'Authorization': 'Bearer ' + response.data.tenant_access_token
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
    // End Login user Identity
}