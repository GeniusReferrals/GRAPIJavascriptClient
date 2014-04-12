$(document).ready(function() {
    /* 
     * Genius Referrals API Credentials
     */
    var apiUsername = 'YOUR_USERNAME';
    var apiToken = 'YOUR_API_TOKEN';

    var client = new gr.client();
    var auth = new gr.auth(apiUsername, apiToken); 

    /*
     * Testing authentication
     */
    var authenticationPromise = client.testAuthentication(auth);
    authenticationPromise.success(function (data) {
        $('#test-authentication-status').text(data.code);
        $('#test-authentication-message').text(data.message);
    });
    authenticationPromise.fail(function (data) {
        $('#test-authentication-status').text(data.status);
        $('#test-authentication-message').text(data.statusText);
    });

});

