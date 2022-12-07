// JavaScript Document

var axios = require('axios');

require('dotenv').config();
// get tenant access token
exports.get_tenant_access_token = async function (code) {

    console.log("hello")

    var code = this.parse(code.code);

    console.log(code)
    var data = JSON.stringify({
        "app_id": process.env.APP_ID,
        "app_secret": process.env.APP_SECRET
    });

    var config = {
        method: 'POST',
        url: 'https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    var response = await axios(config)

    console.log(response.data.tenant_access_token)

    // Get Login user Identity
    var data = JSON.stringify({
        "grant_type": "authorization_code",
        "code": code
    });

    var config = {
        method: 'POST',
        url: 'https://open.larksuite.com/open-apis/authen/v1/access_token',
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
    return user_info;
}