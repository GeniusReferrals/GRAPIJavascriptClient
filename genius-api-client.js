//Defining the Genius API namespace
var genius = {
    baseurl: "https://staging.api.geniusreferrals.com"
};

//Defining the Genius Referral authentication object
genius.auth = function(clientEmail, apiToken) {
    this.clientEmail = clientEmail;
    this.apiToken = apiToken;
};

/**
 * Generate a WSSE header.
 * 
 * @return string WSSE Header
 */
genius.auth.prototype.generateWSSEHeader = function() {
    return wsseHeader(this.clientEmail, this.apiToken);
};

//Client
genius.client = function() {
};

/**
 * Add common filters to a given API URI.
 *
 * @param integer page Zero based offset index for the results. e.g. 0 would start
 *                     at the first result and 10 would start at the eleventh result.
 * @param integer limit Maximum number of results to return in the response.
 * @param string filter Allowed fields: name. Use the following delimiters to build your
 *                      filters params. The vertical bar ('|') to separate individual filter 
 *                      phrases and a double colon ('::') to separate the names and values. 
 *                      The delimiter of the double colon (':') separates the property name 
 *                      from the comparison value, enabling the comparison value to contain spaces. 
 *                      Example: www.example.com\/users?filter='name::todd|city::denver|title::grand poobah'
 * @param string sort Allowed fields: name, created. Use sort query-string parameter that 
 *                    contains a delimited set of property names. For each property name, sort 
 *                    in ascending order, and for each property prefixed with a dash ('-') sort 
 *                    in descending order. Separate each property name with a vertical bar ('|'),
 *                    which is consistent with the separation of the name\/value pairs in 
 *                    filtering, above. For example, if we want to retrieve users in order of
 *                    their last name (ascending), first name (ascending) and hire date 
 *                    (descending), the request might look like this 
 *                    www.example.com\/users?sort='last_name|first_name|-hire_date'
 * @return string
 */
genius.client.prototype.addCommonFilters = function(page, limit, filter, sort) {

    var params = ['page=' + page, 'limit=' + limit];

    if (filter != '') {
        params.push('filter=' + filter);
    }
    if (filter != '') {
        params.push('sort=' + sort);
    }

    return params.join('&');
};


/**
 * Get Genius Referral Core API Root resource.
 * 
 * @param object auth Genius Referral authentication object
 * @return jqXHR object
 */
genius.client.prototype.getRoot = function(auth) {
    auth = typeof auth !== 'undefined' ? auth : '';

    return $.ajax({
        url: genius.baseurl + '/',
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};


/**
 * Get the list of Genius Referrals client accounts.
 * 
 * @param object auth Genius Referral authentication object
 * @param integer page Zero based offset index for the results. e.g. 0 would start
 *                     at the first result and 10 would start at the eleventh result.
 * @param integer limit Maximum number of results to return in the response.
 * @param string filter Allowed fields: name. Use the following delimiters to build your
 *                      filters params. The vertical bar ('|') to separate individual filter 
 *                      phrases and a double colon ('::') to separate the names and values. 
 *                      The delimiter of the double colon (':') separates the property name 
 *                      from the comparison value, enabling the comparison value to contain spaces. 
 *                      Example: www.example.com\/users?filter='name::todd|city::denver|title::grand poobah'
 * @param string sort Allowed fields: name, created. Use sort query-string parameter that 
 *                    contains a delimited set of property names. For each property name, sort 
 *                    in ascending order, and for each property prefixed with a dash ('-') sort 
 *                    in descending order. Separate each property name with a vertical bar ('|'),
 *                    which is consistent with the separation of the name\/value pairs in 
 *                    filtering, above. For example, if we want to retrieve users in order of
 *                    their last name (ascending), first name (ascending) and hire date 
 *                    (descending), the request might look like this 
 *                    www.example.com\/users?sort='last_name|first_name|-hire_date'
 * @return jqXHR object
 */
genius.client.prototype.getAccounts = function(auth, page, limit, filter, sort) {
    auth = typeof auth !== 'undefined' ? auth : '';
    page = typeof page !== 'undefined' ? page : 1;
    limit = typeof limit !== 'undefined' ? limit : 10;
    filter = typeof filter !== 'undefined' ? filter : '';
    sort = typeof sort !== 'undefined' ? sort : '';

    var client = new genius.client();
    var filters = client.addCommonFilters(page, limit, filter, sort);

    return $.ajax({
        url: genius.baseurl + '/accounts',
        type: 'OPTIONS',
        data: filters,
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get a Genius Referrals client account by a given slug.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @return jqXHR object
 */
genius.client.prototype.getAccount = function(auth, account_slug) {
    auth = typeof auth !== 'undefined' ? auth : '';
    account_slug = typeof account_slug !== 'undefined' ? account_slug : '';

    return $.ajax({
        url: genius.baseurl + '/accounts/' + account_slug,
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get the list of Genius Referrals advocates for a given program.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param integer page Zero based offset index for the results. e.g. 0 would start
 *                     at the first result and 10 would start at the eleventh result.
 * @param integer limit Maximum number of results to return in the response.
 * @param string filter Allowed fields: name. Use the following delimiters to build your
 *                      filters params. The vertical bar ('|') to separate individual filter 
 *                      phrases and a double colon ('::') to separate the names and values. 
 *                      The delimiter of the double colon (':') separates the property name 
 *                      from the comparison value, enabling the comparison value to contain spaces. 
 *                      Example: www.example.com\/users?filter='name::todd|city::denver|title::grand poobah'
 * @param string sort Allowed fields: name, created. Use sort query-string parameter that 
 *                    contains a delimited set of property names. For each property name, sort 
 *                    in ascending order, and for each property prefixed with a dash ('-') sort 
 *                    in descending order. Separate each property name with a vertical bar ('|'),
 *                    which is consistent with the separation of the name\/value pairs in 
 *                    filtering, above. For example, if we want to retrieve users in order of
 *                    their last name (ascending), first name (ascending) and hire date 
 *                    (descending), the request might look like this 
 *                    www.example.com\/users?sort='last_name|first_name|-hire_date'
 * @return jqXHR object
 */
genius.client.prototype.getAdvocates = function(auth, account_slug, page, limit, filter, sort) {
    auth = typeof auth !== 'undefined' ? auth : '';
    account_slug = typeof account_slug !== 'undefined' ? account_slug : 1;
    page = typeof page !== 'undefined' ? page : 1;
    limit = typeof limit !== 'undefined' ? limit : 10;
    filter = typeof filter !== 'undefined' ? filter : '';
    sort = typeof sort !== 'undefined' ? sort : '';

    var client = new genius.client();
    var filters = client.addCommonFilters(page, limit, filter, sort);

    return $.ajax({
        url: genius.baseurl + '/accounts/' + account_slug + '/advocates',
        type: 'OPTIONS',
        data: filters,
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get a Genius Referrals advocate by a given token.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param string advocate_token The advocate token
 * @return jqXHR object
 */
genius.client.prototype.getAdvocate = function(auth, account_slug, advocate_token) {
    auth = typeof auth !== 'undefined' ? auth : '';
    account_slug = typeof account_slug !== 'undefined' ? account_slug : '';
    advocate_token = typeof advocate_token !== 'undefined' ? advocate_token : '';

    return $.ajax({
        url: genius.baseurl + '/accounts/' + account_slug + '/advocates/' + advocate_token,
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get the advocate's payment methods.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param string advocate_token The advocate token 
 * @param integer page Zero based offset index for the results. e.g. 0 would start
 *                     at the first result and 10 would start at the eleventh result.
 * @param integer limit Maximum number of results to return in the response.
 * @param string filter Allowed fields: name. Use the following delimiters to build your
 *                      filters params. The vertical bar ('|') to separate individual filter 
 *                      phrases and a double colon ('::') to separate the names and values. 
 *                      The delimiter of the double colon (':') separates the property name 
 *                      from the comparison value, enabling the comparison value to contain spaces. 
 *                      Example: www.example.com\/users?filter='name::todd|city::denver|title::grand poobah'
 * @param string sort Allowed fields: name, created. Use sort query-string parameter that 
 *                    contains a delimited set of property names. For each property name, sort 
 *                    in ascending order, and for each property prefixed with a dash ('-') sort 
 *                    in descending order. Separate each property name with a vertical bar ('|'),
 *                    which is consistent with the separation of the name\/value pairs in 
 *                    filtering, above. For example, if we want to retrieve users in order of
 *                    their last name (ascending), first name (ascending) and hire date 
 *                    (descending), the request might look like this 
 *                    www.example.com\/users?sort='last_name|first_name|-hire_date'
 * @return jqXHR object
 */
genius.client.prototype.getAdvocatePaymentMethods = function(auth, account_slug, advocate_token, page, limit, filter, sort) {
    auth = typeof auth !== 'undefined' ? auth : '';
    account_slug = typeof account_slug !== 'undefined' ? account_slug : 1;
    advocate_token = typeof advocate_token !== 'undefined' ? advocate_token : 1;
    page = typeof page !== 'undefined' ? page : 1;
    limit = typeof limit !== 'undefined' ? limit : 10;
    filter = typeof filter !== 'undefined' ? filter : '';
    sort = typeof sort !== 'undefined' ? sort : '';

    var client = new genius.client();
    var filters = client.addCommonFilters(page, limit, filter, sort);

    return $.ajax({
        url: genius.baseurl + '/accounts/' + account_slug + '/advocates/' + advocate_token + '/payment-methods',
        type: 'OPTIONS',
        data: filters,
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get an advocate's payment method.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param string advocate_token The advocate token
 * @param integer advocate_payment_method_id The payment method id
 * @return jqXHR object
 */
genius.client.prototype.getAdvocate = function(auth, account_slug, advocate_token, advocate_payment_method_id) {
    auth = typeof auth !== 'undefined' ? auth : '';
    account_slug = typeof account_slug !== 'undefined' ? account_slug : '';
    advocate_token = typeof advocate_token !== 'undefined' ? advocate_token : '';
    advocate_payment_method_id = typeof advocate_payment_method_id !== 'undefined' ? advocate_payment_method_id : '';

    return $.ajax({
        url: genius.baseurl + '/accounts/' + account_slug + '/advocates/' + advocate_token + '/payment-methods/' + advocate_payment_method_id,
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get the list of referrals for a given advocate.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param string advocate_token The advocate token 
 * @param integer page Zero based offset index for the results. e.g. 0 would start
 *                     at the first result and 10 would start at the eleventh result.
 * @param integer limit Maximum number of results to return in the response.
 * @param string filter Allowed fields: name. Use the following delimiters to build your
 *                      filters params. The vertical bar ('|') to separate individual filter 
 *                      phrases and a double colon ('::') to separate the names and values. 
 *                      The delimiter of the double colon (':') separates the property name 
 *                      from the comparison value, enabling the comparison value to contain spaces. 
 *                      Example: www.example.com\/users?filter='name::todd|city::denver|title::grand poobah'
 * @param string sort Allowed fields: name, created. Use sort query-string parameter that 
 *                    contains a delimited set of property names. For each property name, sort 
 *                    in ascending order, and for each property prefixed with a dash ('-') sort 
 *                    in descending order. Separate each property name with a vertical bar ('|'),
 *                    which is consistent with the separation of the name\/value pairs in 
 *                    filtering, above. For example, if we want to retrieve users in order of
 *                    their last name (ascending), first name (ascending) and hire date 
 *                    (descending), the request might look like this 
 *                    www.example.com\/users?sort='last_name|first_name|-hire_date'
 * @return jqXHR object
 */
genius.client.prototype.getReferrals = function(auth, account_slug, advocate_token, page, limit, filter, sort) {
    auth = typeof auth !== 'undefined' ? auth : '';
    account_slug = typeof account_slug !== 'undefined' ? account_slug : 1;
    advocate_token = typeof advocate_token !== 'undefined' ? advocate_token : 1;
    page = typeof page !== 'undefined' ? page : 1;
    limit = typeof limit !== 'undefined' ? limit : 10;
    filter = typeof filter !== 'undefined' ? filter : '';
    sort = typeof sort !== 'undefined' ? sort : '';

    var client = new genius.client();
    var filters = client.addCommonFilters(page, limit, filter, sort);

    return $.ajax({
        url: genius.baseurl + '/accounts/' + account_slug + '/advocates/' + advocate_token + '/referrals',
        type: 'OPTIONS',
        data: filters,
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get a referral by a given id.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param string advocate_token The advocate token
 * @param integer referral_id The referral id
 * @return jqXHR object
 */
genius.client.prototype.getAdvocate = function(auth, account_slug, advocate_token, referral_id) {
    auth = typeof auth !== 'undefined' ? auth : '';
    account_slug = typeof account_slug !== 'undefined' ? account_slug : '';
    advocate_token = typeof advocate_token !== 'undefined' ? advocate_token : '';
    referral_id = typeof referral_id !== 'undefined' ? referral_id : '';

    return $.ajax({
        url: genius.baseurl + '/accounts/' + account_slug + '/advocates/' + advocate_token + '/referrals/' + referral_id,
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get the list of bonuses for a given advocate.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param integer page Zero based offset index for the results. e.g. 0 would start
 *                     at the first result and 10 would start at the eleventh result.
 * @param integer limit Maximum number of results to return in the response.
 * @param string filter Allowed fields: name. Use the following delimiters to build your
 *                      filters params. The vertical bar ('|') to separate individual filter 
 *                      phrases and a double colon ('::') to separate the names and values. 
 *                      The delimiter of the double colon (':') separates the property name 
 *                      from the comparison value, enabling the comparison value to contain spaces. 
 *                      Example: www.example.com\/users?filter='name::todd|city::denver|title::grand poobah'
 * @param string sort Allowed fields: name, created. Use sort query-string parameter that 
 *                    contains a delimited set of property names. For each property name, sort 
 *                    in ascending order, and for each property prefixed with a dash ('-') sort 
 *                    in descending order. Separate each property name with a vertical bar ('|'),
 *                    which is consistent with the separation of the name\/value pairs in 
 *                    filtering, above. For example, if we want to retrieve users in order of
 *                    their last name (ascending), first name (ascending) and hire date 
 *                    (descending), the request might look like this 
 *                    www.example.com\/users?sort='last_name|first_name|-hire_date'
 * @return jqXHR object
 */
genius.client.prototype.getBonuses = function(auth, account_slug, page, limit, filter, sort) {
    auth = typeof auth !== 'undefined' ? auth : '';
    account_slug = typeof account_slug !== 'undefined' ? account_slug : 1;
    page = typeof page !== 'undefined' ? page : 1;
    limit = typeof limit !== 'undefined' ? limit : 10;
    filter = typeof filter !== 'undefined' ? filter : '';
    sort = typeof sort !== 'undefined' ? sort : '';

    var client = new genius.client();
    var filters = client.addCommonFilters(page, limit, filter, sort);

    return $.ajax({
        url: genius.baseurl + '/accounts/' + account_slug + '/bonuses',
        type: 'OPTIONS',
        data: filters,
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Check if there is a bonus to be given to the advocate. Allows the clients to check if there is a bonus to be given, it simulates the behaivor of a POST request to /accounts/{account_slug}/bonuses resource. This resource is idempotent.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @return jqXHR object
 */
genius.client.prototype.getBonusesCheckup = function(auth, account_slug) {
    auth = typeof auth !== 'undefined' ? auth : '';
    account_slug = typeof account_slug !== 'undefined' ? account_slug : '';

    return $.ajax({
        url: genius.baseurl + '/accounts/' + account_slug + '/bonuses/checkup',
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get the list of bonuses traces.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param integer page Zero based offset index for the results. e.g. 0 would start
 *                     at the first result and 10 would start at the eleventh result.
 * @param integer limit Maximum number of results to return in the response.
 * @param string filter Allowed fields: name. Use the following delimiters to build your
 *                      filters params. The vertical bar ('|') to separate individual filter 
 *                      phrases and a double colon ('::') to separate the names and values. 
 *                      The delimiter of the double colon (':') separates the property name 
 *                      from the comparison value, enabling the comparison value to contain spaces. 
 *                      Example: www.example.com\/users?filter='name::todd|city::denver|title::grand poobah'
 * @param string sort Allowed fields: name, created. Use sort query-string parameter that 
 *                    contains a delimited set of property names. For each property name, sort 
 *                    in ascending order, and for each property prefixed with a dash ('-') sort 
 *                    in descending order. Separate each property name with a vertical bar ('|'),
 *                    which is consistent with the separation of the name\/value pairs in 
 *                    filtering, above. For example, if we want to retrieve users in order of
 *                    their last name (ascending), first name (ascending) and hire date 
 *                    (descending), the request might look like this 
 *                    www.example.com\/users?sort='last_name|first_name|-hire_date'
 * @return jqXHR object
 */
genius.client.prototype.getBonusesTraces = function(auth, account_slug, page, limit, filter, sort) {
    auth = typeof auth !== 'undefined' ? auth : '';
    account_slug = typeof account_slug !== 'undefined' ? account_slug : 1;
    page = typeof page !== 'undefined' ? page : 1;
    limit = typeof limit !== 'undefined' ? limit : 10;
    filter = typeof filter !== 'undefined' ? filter : '';
    sort = typeof sort !== 'undefined' ? sort : '';

    var client = new genius.client();
    var filters = client.addCommonFilters(page, limit, filter, sort);

    return $.ajax({
        url: genius.baseurl + '/accounts/' + account_slug + '/bonuses/traces',
        type: 'OPTIONS',
        data: filters,
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get a bonus request trace.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param integer trace_id The trace id
 * @return jqXHR object
 */
genius.client.prototype.getBonusesTrace = function(auth, account_slug, trace_id) {
    auth = typeof auth !== 'undefined' ? auth : '';
    account_slug = typeof account_slug !== 'undefined' ? account_slug : '';
    trace_id = typeof trace_id !== 'undefined' ? trace_id : '';

    return $.ajax({
        url: genius.baseurl + '/accounts/' + account_slug + '/bonuses/traces/' + trace_id,
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get a bonus by a given id.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param integer bonus_id The bonus id
 * @return jqXHR object
 */
genius.client.prototype.getBonus = function(auth, account_slug, bonus_id) {
    auth = typeof auth !== 'undefined' ? auth : '';
    account_slug = typeof account_slug !== 'undefined' ? account_slug : '';
    bonus_id = typeof bonus_id !== 'undefined' ? bonus_id : '';

    return $.ajax({
        url: genius.baseurl + '/accounts/' + account_slug + '/bonuses/' + bonus_id,
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get the list of Genius Referrals campaings.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param integer page Zero based offset index for the results. e.g. 0 would start
 *                     at the first result and 10 would start at the eleventh result.
 * @param integer limit Maximum number of results to return in the response.
 * @param string filter Allowed fields: name. Use the following delimiters to build your
 *                      filters params. The vertical bar ('|') to separate individual filter 
 *                      phrases and a double colon ('::') to separate the names and values. 
 *                      The delimiter of the double colon (':') separates the property name 
 *                      from the comparison value, enabling the comparison value to contain spaces. 
 *                      Example: www.example.com\/users?filter='name::todd|city::denver|title::grand poobah'
 * @param string sort Allowed fields: name, created. Use sort query-string parameter that 
 *                    contains a delimited set of property names. For each property name, sort 
 *                    in ascending order, and for each property prefixed with a dash ('-') sort 
 *                    in descending order. Separate each property name with a vertical bar ('|'),
 *                    which is consistent with the separation of the name\/value pairs in 
 *                    filtering, above. For example, if we want to retrieve users in order of
 *                    their last name (ascending), first name (ascending) and hire date 
 *                    (descending), the request might look like this 
 *                    www.example.com\/users?sort='last_name|first_name|-hire_date'
 * @return jqXHR object
 */
genius.client.prototype.getCampains = function(auth, account_slug, page, limit, filter, sort) {
    auth = typeof auth !== 'undefined' ? auth : '';
    account_slug = typeof account_slug !== 'undefined' ? account_slug : 1;
    page = typeof page !== 'undefined' ? page : 1;
    limit = typeof limit !== 'undefined' ? limit : 10;
    filter = typeof filter !== 'undefined' ? filter : '';
    sort = typeof sort !== 'undefined' ? sort : '';

    var client = new genius.client();
    var filters = client.addCommonFilters(page, limit, filter, sort);

    return $.ajax({
        url: genius.baseurl + '/accounts/' + account_slug + '/campaigns',
        type: 'OPTIONS',
        data: filters,
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get a Genius Referrals campaign by a given slug.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param string campaign_slug The campaign slug
 * @return jqXHR object
 */
genius.client.prototype.getBonus = function(auth, account_slug, campaign_slug) {
    auth = typeof auth !== 'undefined' ? auth : '';
    account_slug = typeof account_slug !== 'undefined' ? account_slug : '';
    campaign_slug = typeof campaign_slug !== 'undefined' ? campaign_slug : '';

    return $.ajax({
        url: genius.baseurl + '/accounts/' + account_slug + '/campaigns/' + campaign_slug,
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get the list of redemption requests.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param integer page Zero based offset index for the results. e.g. 0 would start
 *                     at the first result and 10 would start at the eleventh result.
 * @param integer limit Maximum number of results to return in the response.
 * @param string filter Allowed fields: name. Use the following delimiters to build your
 *                      filters params. The vertical bar ('|') to separate individual filter 
 *                      phrases and a double colon ('::') to separate the names and values. 
 *                      The delimiter of the double colon (':') separates the property name 
 *                      from the comparison value, enabling the comparison value to contain spaces. 
 *                      Example: www.example.com\/users?filter='name::todd|city::denver|title::grand poobah'
 * @param string sort Allowed fields: name, created. Use sort query-string parameter that 
 *                    contains a delimited set of property names. For each property name, sort 
 *                    in ascending order, and for each property prefixed with a dash ('-') sort 
 *                    in descending order. Separate each property name with a vertical bar ('|'),
 *                    which is consistent with the separation of the name\/value pairs in 
 *                    filtering, above. For example, if we want to retrieve users in order of
 *                    their last name (ascending), first name (ascending) and hire date 
 *                    (descending), the request might look like this 
 *                    www.example.com\/users?sort='last_name|first_name|-hire_date'
 * @return jqXHR object
 */
genius.client.prototype.getRedemptionRequests = function(auth, account_slug, page, limit, filter, sort) {
    auth = typeof auth !== 'undefined' ? auth : '';
    account_slug = typeof account_slug !== 'undefined' ? account_slug : 1;
    page = typeof page !== 'undefined' ? page : 1;
    limit = typeof limit !== 'undefined' ? limit : 10;
    filter = typeof filter !== 'undefined' ? filter : '';
    sort = typeof sort !== 'undefined' ? sort : '';

    var client = new genius.client();
    var filters = client.addCommonFilters(page, limit, filter, sort);

    return $.ajax({
        url: genius.baseurl + '/accounts/' + account_slug + '/redemption-requests',
        type: 'OPTIONS',
        data: filters,
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get a redemption request by a given id.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param integer redemption_request_id The redemption request id
 * @return jqXHR object
 */
genius.client.prototype.getRedemptionRequest = function(auth, account_slug, redemption_request_id) {
    auth = typeof auth !== 'undefined' ? auth : '';
    account_slug = typeof account_slug !== 'undefined' ? account_slug : '';
    redemption_request_id = typeof redemption_request_id !== 'undefined' ? redemption_request_id : '';

    return $.ajax({
        url: genius.baseurl + '/accounts/' + account_slug + '/redemption-requests/' + redemption_request_id,
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Redeem a redemption request. After the redemption request is created it needs to be redeemed. This will deduct the amount of the advocate unclaimed balance and move the request to the completed state.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param integer redemption_request_id The redemption request id
 * @return jqXHR object
 */
genius.client.prototype.patchRedemptionRequestRedemption = function(auth, account_slug, redemption_request_id) {
    auth = typeof auth !== 'undefined' ? auth : '';
    account_slug = typeof account_slug !== 'undefined' ? account_slug : '';
    redemption_request_id = typeof redemption_request_id !== 'undefined' ? redemption_request_id : '';

    return $.ajax({
        url: genius.baseurl + '/accounts/' + account_slug + '/redemption-requests/' + redemption_request_id + '/redemption',
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get bonuses redemption methods.
 * 
 * @param object auth Genius Referral authentication object
 * @return jqXHR object
 */
genius.client.prototype.getBonusesSummaryPerOriginReport = function(auth) {
    auth = typeof auth !== 'undefined' ? auth : '';

    return $.ajax({
        url: genius.baseurl + '/reports/bonuses-summary-per-origin',
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get referrals summary by referral origin.
 * 
 * @param object auth Genius Referral authentication object
 * @return jqXHR object
 */
genius.client.prototype.getReferralsSummaryPerOriginReport = function(auth) {
    auth = typeof auth !== 'undefined' ? auth : '';

    return $.ajax({
        url: genius.baseurl + '/reports/referrals-summary-per-origin',
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Allow clients to test authentication on Genius Referrals platform.
 * 
 * @param object auth Genius Referral authentication object
 * @return jqXHR object
 */
genius.client.prototype.testAuthentication = function(auth) {
    auth = typeof auth !== 'undefined' ? auth : '';
    return $.ajax({
        url: genius.baseurl + '/test-authentication',
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get bonuses redemption methods.
 * 
 * @param object auth Genius Referral authentication object
 * @return jqXHR object
 */
genius.client.prototype.getBonusesRedemptionMethods = function(auth) {
    auth = typeof auth !== 'undefined' ? auth : '';

    return $.ajax({
        url: genius.baseurl + '/utilities/bonuses-redemption-methods',
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get bonuses redemption method.
 * 
 * @param object auth Genius Referral authentication object
 * @param string bonuses_redemption_method_slug The bonuses redemption method slug
 * @return jqXHR object
 */
genius.client.prototype.getBonusRedemptionMethod = function(auth, bonuses_redemption_method_slug) {
    auth = typeof auth !== 'undefined' ? auth : '';
    bonuses_redemption_method_slug = typeof bonuses_redemption_method_slug !== 'undefined' ? bonuses_redemption_method_slug : '';

    return $.ajax({
        url: genius.baseurl + '/utilities/bonuses-redemption-methods/' + bonuses_redemption_method_slug,
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get currencies.
 * 
 * @param object auth Genius Referral authentication object
 * @return jqXHR object
 */
genius.client.prototype.getCurrencies = function(auth) {
    auth = typeof auth !== 'undefined' ? auth : '';

    return $.ajax({
        url: genius.baseurl + '/utilities/currencies',
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get a currency.
 * 
 * @param object auth Genius Referral authentication object
 * @param string code The bonuses redemption method slug
 * @return jqXHR object
 */
genius.client.prototype.getCurrency = function(auth, code) {
    auth = typeof auth !== 'undefined' ? auth : '';
    code = typeof code !== 'undefined' ? code : '';

    return $.ajax({
        url: genius.baseurl + '/utilities/currencies/' + code,
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get redemption request actions.
 * 
 * @param object auth Genius Referral authentication object
 * @return jqXHR object
 */
genius.client.prototype.getRedemptionRequestsActions = function(auth) {
    auth = typeof auth !== 'undefined' ? auth : '';

    return $.ajax({
        url: genius.baseurl + '/utilities/redemption-request-actions',
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get a redemption request action.
 * 
 * @param object auth Genius Referral authentication object
 * @param string redemption_request_action_slug The redemption request action slug
 * @return jqXHR object
 */
genius.client.prototype.getRedemptionRequestAction = function(auth, redemption_request_action_slug) {
    auth = typeof auth !== 'undefined' ? auth : '';
    redemption_request_action_slug = typeof redemption_request_action_slug !== 'undefined' ? redemption_request_action_slug : '';

    return $.ajax({
        url: genius.baseurl + '/utilities/currencies/' + redemption_request_action_slug,
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get redemption request statuses.
 * 
 * @param object auth Genius Referral authentication object
 * @return jqXHR object
 */
genius.client.prototype.getRedemptionRequestStatuses = function(auth) {
    auth = typeof auth !== 'undefined' ? auth : '';

    return $.ajax({
        url: genius.baseurl + '/utilities/redemption-request-statuses',
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

/**
 * Get a redemption request status.
 * 
 * @param object auth Genius Referral authentication object
 * @param string redemption_request_status_slug The redemption request status slug
 * @return jqXHR object
 */
genius.client.prototype.getRedemptionRequestStatus = function(auth, redemption_request_status_slug) {
    auth = typeof auth !== 'undefined' ? auth : '';
    redemption_request_status_slug = typeof redemption_request_status_slug !== 'undefined' ? redemption_request_status_slug : '';

    return $.ajax({
        url: genius.baseurl + '/utilities/redemption-request-statuses/' + redemption_request_status_slug,
        type: 'OPTIONS',
        header: {
            "HTTP_ACCEPT": "application/json",
            "CONTENT_TYPE": "application/json",
            "Authorization": 'WSSE profile="UsernameToken"',
            "X-WSSE": auth.generateWSSEHeader()
        }
    });
};

