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
    authenticationPromise.success(function(data) {
        $('#test-authentication-status').text(data.code);
        $('#test-authentication-message').text(data.message);
    });
    authenticationPromise.fail(function(data) {
        $('#test-authentication-status').text(data.status);
        $('#test-authentication-message').text(data.statusText);
    });

    /*
     * Testing getRoot
     */
    var response = client.getRoot(auth);
    response.success(function(data) {
        console.log(data);
        $('#test-root-message').text(data.links.accounts.href);
    });
    response.fail(function(data) {
        $('#test-root-message').text(data);
    });

    /*
     * Testing getAccounts
     */
    var response = client.getAccounts(auth);
    response.success(function(data) {
        console.log(data);
        $('#test-accounts-status').text(data.code);
        $('#test-accounts-message').text(data.data.links.first.href);
    });
    response.fail(function(data) {
        $('#test-accounts-status').text(data.status);
        $('#test-accounts-message').text(data);
    });

    /*
     * Testing getAccount
     */
    var response = client.getAccount(auth, 'example-com');
    response.success(function(data) {
        console.log(data);
        $('#test-account-status').text(data.code);
        $('#test-account-message').text(data.data.name);
    });
    response.fail(function(data) {
        $('#test-account-status').text(data.status);
        $('#test-account-message').text(data);
    });

    /*
     * Testing getAdvocates
     */
    var response = client.getAdvocates(auth, 'example-com');
    response.success(function(data) {
        console.log(data);
        $('#test-advocates-status').text(data.code);
        $('#test-advocates-message').text(data.data.total);
    });
    response.fail(function(data) {
        $('#test-advocates-status').text(data.status);
        $('#test-advocates-message').text(data);
    });

    /*
     * Testing getAdvocate
     */
    var response = client.getAdvocate(auth, 'example-com', '07c159102f66a63b18d4da39bf91b06bacb7db8d');
    response.success(function(data) {
        console.log(data);
        $('#test-advocate-status').text(data.code);
        $('#test-advocate-message').text(data.data.name);
    });
    response.fail(function(data) {
        console.log(data);
        $('#test-advocate-status').text(data.status);
        $('#test-advocate-message').text(data);
    });

    /*
     * Testing getAdvocatePaymentMethods
     */
    var response = client.getAdvocatePaymentMethods(auth, 'example-com', '07c159102f66a63b18d4da39bf91b06bacb7db8d', 1, 1, 'username::aaaaa@email.com');
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing getAdvocatePaymentMethod
     */
    var response = client.getAdvocatePaymentMethod(auth, 'example-com', '07c159102f66a63b18d4da39bf91b06bacb7db8d', 15);
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing getReferrals
     */
    var response = client.getReferrals(auth, 'example-com', '07c159102f66a63b18d4da39bf91b06bacb7db8d');
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing getReferral
     */
    var response = client.getReferral(auth, 'example-com', '07c159102f66a63b18d4da39bf91b06bacb7db8d', 19);
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing getBonuses
     */
    var response = client.getBonuses(auth, 'example-com');
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing getBonus
     */
    var response = client.getBonus(auth, 'example-com', 227);
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing getCampains
     */
    var response = client.getCampaigns(auth, 'example-com');
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing getCampaign
     */
    var response = client.getCampaign(auth, 'example-com', 'get-10-of-for-90-days');
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing getRedemptionRequests
     */
    var response = client.getRedemptionRequests(auth, 'example-com');
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing getRedemptionRequest
     */
    var response = client.getRedemptionRequest(auth, 'example-com', 3);
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing getBonusesSummaryPerOriginReport
     */
    var response = client.getBonusesSummaryPerOriginReport(auth, '07c159102f66a63b18d4da39bf91b06bacb7db8d');
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing getReferralsSummaryPerOriginReport
     */
    var response = client.getReferralsSummaryPerOriginReport(auth, '07c159102f66a63b18d4da39bf91b06bacb7db8d');
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing getBonusesRedemptionMethods
     */
    var response = client.getBonusesRedemptionMethods(auth);
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing getBonusRedemptionMethod
     */
    var response = client.getBonusRedemptionMethod(auth, 'auto-into-credit');
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing getCurrencies
     */
    var response = client.getCurrencies(auth);
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing getCurrency
     */
    var response = client.getCurrency(auth, 'USD');
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing getRedemptionRequestsActions
     */
    var response = client.getRedemptionRequestsActions(auth);
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing getRedemptionRequestAction
     */
    var response = client.getRedemptionRequestAction(auth, 'pay-out');
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing getRedemptionRequestStatuses
     */
    var response = client.getRedemptionRequestStatuses(auth);
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing getRedemptionRequestStatus
     */
    var response = client.getRedemptionRequestStatus(auth, 'requested');
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing getBonusesCheckup
     */
    aryBonus = '{"advocate_token":"07c159102f66a63b18d4da39bf91b06bacb7db8d","reference":"HY7292D00", "amount_of_payments":"3","payment_amount":"10"}';
    var response = client.getBonusesCheckup(auth, 'example-com', $.parseJSON(aryBonus));
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing postAdvocate
     */
    aryAdvocate = '{"advocate": {"name":"Alain", "lastname":"Smith", "email":"jonh@email.com", "payout_threshold":10}}';
    var response = client.postAdvocate(auth, 'example-com', $.parseJSON(aryAdvocate));
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing patchAdvocate
     */
    aryAdvocate = '{"name":"Jonh", "lastname":"Smith", "email":"jonh@email.com", "payout_threshold":10}';
    var response = client.patchAdvocate(auth, 'example-com', '07c159102f66a63b18d4da39bf91b06bacb7db8d', $.parseJSON(aryAdvocate));
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing postAdvocatePaymentMethod
     */
    aryPaymentMethod = '{"advocate_payment_method":{"username":"aa@email.com", "description":"My main paypal account", "is_active":true}}';
    var response = client.postAdvocatePaymentMethod(auth, 'example-com', '07c159102f66a63b18d4da39bf91b06bacb7db8d', $.parseJSON(aryPaymentMethod));
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing putAdvocatePaymentMethod
     */
    aryPaymentMethod = '{"advocate_payment_method":{"username":"aaaaa@email.com", "description":"My main paypal account", "is_active":true}}';
    var response = client.putAdvocatePaymentMethod(auth, 'example-com', '07c159102f66a63b18d4da39bf91b06bacb7db8d', 15, $.parseJSON(aryPaymentMethod));
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing postReferral
     */
    aryReferral = '{"referral":{"referred_advocate_token":"8b3856077b4243700c15d3c75d1cf9866253f643","referral_origin_slug":"facebook-share","campaign_slug":"get-10-of-for-90-days","http_referer":"http://www.geniusreferrals.com"}}';
    var response = client.postReferral(auth, 'example-com', '07c159102f66a63b18d4da39bf91b06bacb7db8d', $.parseJSON(aryReferral));
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing postBonuses
     */
    aryBonus = '{"bonus":{"advocate_token":"07c159102f66a63b18d4da39bf91b06bacb7db8d","reference":"HSY7292D00","amount_of_payments":3,"payment_amount":10}}';
    var response = client.postBonuses(auth, 'example-com', $.parseJSON(aryBonus));
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

    /*
     * Testing postRedemptionRequest
     */
    aryRedemptionRequest = '{"redemption_request":{"advocate_token":"07c159102f66a63b18d4da39bf91b06bacb7db8d","request_status_slug":"processing","request_action_slug":"goods", "currency_code":"USD","amount":50, "description":"credit", "advocates_paypal_username":"alain@mail.com"}}';
    var response = client.postRedemptionRequest(auth, 'example-com', $.parseJSON(aryRedemptionRequest));
    response.success(function(data) {
        console.log(datat);
    });
    response.fail(function(data) {
        console.log(data.responseText);
    });

    /*
     * Testing patchRedemptionRequestRedemption
     */
    var response = client.patchRedemptionRequestRedemption(auth, 'example-com', 3);
    response.success(function(data) {
        console.log(data);
    });
    response.fail(function(data) {
        console.log(data);
    });

});

