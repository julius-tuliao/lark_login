// JavaScript Document

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};



function accessToken() {


    var myHeaders = new Headers();


    myHeaders.append("Cookie", "QXV0aHpDb250ZXh0=6abe2024960e482790f93d6c7d5ba3c9; passport_web_did=7156048508934455302; swp_csrf_token=252653f4-2861-4ba6-b421-f4d8f9dad309; t_beda37=62d66ad740fb32e1eb071d9ab8a4d09e0810383a6f7568873814870911e1659a");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal?app_id=cli_a2f99415c7f85009&app_secret=9jTzhW1pMKT3SoWBXIhwWhfj5PaoeEo4", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

var code = getUrlParameter('code');

accessToken()

console.log(code)



