// JavaScript Document

$(document).ready(function () {

    // get url parameter code
    var get_url_parameter = function get_url_parameter(s_param) {
        var s_page_url = window.location.search.substring(1),
            s_url_variable = s_page_url.split('&'),
            s_parameter_name,
            i;

        for (i = 0; i < s_url_variable.length; i++) {
            s_parameter_name = s_url_variable[i].split('=');

            if (s_parameter_name[0] === s_param) {
                return s_parameter_name[1] === undefined ? true : decodeURIComponent(s_parameter_name[1]);
            }
        }
        return false;
    };

    var code = get_url_parameter('code');

    if (code != false) {
        // call lark api to fetch logged in user info
        dmx.parse("get_user_info.load({code: '" + code + "'})");

    }



});