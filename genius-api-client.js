//Defining the Genius API namespace
var genius = {
    baseurl: "https://staging.api.geniusreferrals.com"
};

//Defining the Genius Referral authentication object
genius.construct = function(clientEmail, apiToken) {
    this.clientEmail = clientEmail;
    this.apiToken = apiToken;
};

/**
 * Generate a WSSE header.
 * 
 * @return string WSSE Header
 */
genius.generateWSSEHeader = function() {
    return wsseHeader(this.clientEmail, this.apiToken);
};

/**
 * Returns the API URL 
 *
 * @return string API URL
 */
genius.getApiUrl = function() {
    return genius.baseurl;
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
genius.addCommonFilters = function(page, limit, filter, sort) {

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
genius.getRoot = function() {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
        return $.ajax({
            url: genius.baseurl + '/',
            type: 'OPTIONS',
            header: {
                "HTTP_ACCEPT": "application/json",
                "CONTENT_TYPE": "application/json",
                "Authorization": 'WSSE profile="UsernameToken"',
                "X-WSSE": genius.generateWSSEHeader()
            }
        });
    } else
        alert('You must specify the clientEmail and apiToken');
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
genius.getAccounts = function(page, limit, filter, sort) {
    if (typeof this.clientEmail !== 'undefined' && typeof this.apiToken !== 'undefined')
    {
        page = typeof page !== 'undefined' ? page : 1;
        limit = typeof limit !== 'undefined' ? limit : 10;
        filter = typeof filter !== 'undefined' ? filter : '';
        sort = typeof sort !== 'undefined' ? sort : '';

        var filters = genius.addCommonFilters(page, limit, filter, sort);

        return $.ajax({
            url: genius.baseurl + '/accounts',
            type: 'OPTIONS',
            data: filters,
            header: {
                "HTTP_ACCEPT": "application/json",
                "CONTENT_TYPE": "application/json",
                "Authorization": 'WSSE profile="UsernameToken"',
                "X-WSSE": genius.generateWSSEHeader()
            }
        });
    } else
        alert('You must specify the clientEmail and apiToken');

};

/**
 * Get a Genius Referrals client account by a given slug.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @return jqXHR object
 */
genius.getAccount = function(account_slug) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
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
genius.getAdvocates = function(account_slug, page, limit, filter, sort) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
};

/**
 * Get a Genius Referrals advocate by a given token.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param string advocate_token The advocate token
 * @return jqXHR object
 */
genius.getAdvocate = function(account_slug, advocate_token) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
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
genius.getAdvocatePaymentMethods = function(account_slug, advocate_token, page, limit, filter, sort) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
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
genius.getAdvocatePaymentMethod = function(account_slug, advocate_token, advocate_payment_method_id) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
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
genius.getReferrals = function(account_slug, advocate_token, page, limit, filter, sort) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
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
genius.getReferral = function(account_slug, advocate_token, referral_id) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
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
genius.getBonuses = function(account_slug, page, limit, filter, sort) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
};

/**
 * Get a bonus by a given id.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param integer bonus_id The bonus id
 * @return jqXHR object
 */
genius.getBonus = function(account_slug, bonus_id) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
};

/**
 * Check if there is a bonus to be given to the advocate. Allows the clients to check if there is a bonus to be given, it simulates the behaivor of a POST request to /accounts/{account_slug}/bonuses resource. This resource is idempotent.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @return jqXHR object
 */
genius.getBonusesCheckup = function(account_slug) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
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
genius.getBonusesTraces = function(account_slug, page, limit, filter, sort) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
};

/**
 * Get a bonus request trace.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param integer trace_id The trace id
 * @return jqXHR object
 */
genius.getBonusesTrace = function(account_slug, trace_id) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
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
genius.getCampains = function(account_slug, page, limit, filter, sort) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
};

/**
 * Get a Genius Referrals campaign by a given slug.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param string campaign_slug The campaign slug
 * @return jqXHR object
 */
genius.getCampaign = function(account_slug, campaign_slug) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
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
genius.getRedemptionRequests = function(account_slug, page, limit, filter, sort) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
};

/**
 * Get a redemption request by a given id.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param integer redemption_request_id The redemption request id
 * @return jqXHR object
 */
genius.getRedemptionRequest = function(account_slug, redemption_request_id) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
};

/**
 * Redeem a redemption request. After the redemption request is created it needs to be redeemed. This will deduct the amount of the advocate unclaimed balance and move the request to the completed state.
 * 
 * @param object auth Genius Referral authentication object
 * @param string account_slug The client account slug
 * @param integer redemption_request_id The redemption request id
 * @return jqXHR object
 */
genius.patchRedemptionRequestRedemption = function(account_slug, redemption_request_id) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
};

/**
 * Get bonuses redemption methods.
 * 
 * @param object auth Genius Referral authentication object
 * @param string strAdvocateToken The advocate token
 * @return jqXHR object
 */
genius.getBonusesSummaryPerOriginReport = function(strAdvocateToken) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
        filter = 'filter=advocate_token::' + strAdvocateToken;

        return $.ajax({
            url: genius.baseurl + '/reports/bonuses-summary-per-origin',
            type: 'OPTIONS',
            data: filter,
            header: {
                "HTTP_ACCEPT": "application/json",
                "CONTENT_TYPE": "application/json",
                "Authorization": 'WSSE profile="UsernameToken"',
                "X-WSSE": auth.generateWSSEHeader()
            }
        });
    } else
        alert('You must specify the clientEmail and apiToken');
};

/**
 * Get referrals summary by referral origin.
 * 
 * @param object auth Genius Referral authentication object
 * @param string strAdvocateToken The advocate token
 * @return jqXHR object
 */
genius.getReferralsSummaryPerOriginReport = function(strAdvocateToken) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
        filter = 'filter=advocate_token::' + strAdvocateToken;

        return $.ajax({
            url: genius.baseurl + '/reports/referrals-summary-per-origin',
            type: 'OPTIONS',
            data: filter,
            header: {
                "HTTP_ACCEPT": "application/json",
                "CONTENT_TYPE": "application/json",
                "Authorization": 'WSSE profile="UsernameToken"',
                "X-WSSE": auth.generateWSSEHeader()
            }
        });
    } else
        alert('You must specify the clientEmail and apiToken');
};

/**
 * Allow clients to test authentication on Genius Referrals platform.
 * 
 * @param object auth Genius Referral authentication object
 * @return jqXHR object
 */
genius.testAuthentication = function(auth) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
};

/**
 * Get bonuses redemption methods.
 * 
 * @param object auth Genius Referral authentication object
 * @return jqXHR object
 */
genius.getBonusesRedemptionMethods = function(auth) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
};

/**
 * Get bonuses redemption method.
 * 
 * @param object auth Genius Referral authentication object
 * @param string bonuses_redemption_method_slug The bonuses redemption method slug
 * @return jqXHR object
 */
genius.getBonusRedemptionMethod = function(bonuses_redemption_method_slug) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
};

/**
 * Get currencies.
 * 
 * @param object auth Genius Referral authentication object
 * @return jqXHR object
 */
genius.getCurrencies = function(auth) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
};

/**
 * Get a currency.
 * 
 * @param object auth Genius Referral authentication object
 * @param string code The bonuses redemption method slug
 * @return jqXHR object
 */
genius.getCurrency = function(code) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
};

/**
 * Get redemption request actions.
 * 
 * @param object auth Genius Referral authentication object
 * @return jqXHR object
 */
genius.getRedemptionRequestsActions = function(auth) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
};

/**
 * Get a redemption request action.
 * 
 * @param object auth Genius Referral authentication object
 * @param string redemption_request_action_slug The redemption request action slug
 * @return jqXHR object
 */
genius.getRedemptionRequestAction = function(redemption_request_action_slug) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
};

/**
 * Get redemption request statuses.
 * 
 * @param object auth Genius Referral authentication object
 * @return jqXHR object
 */
genius.getRedemptionRequestStatuses = function(auth) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
};

/**
 * Get a redemption request status.
 * 
 * @param object auth Genius Referral authentication object
 * @param string redemption_request_status_slug The redemption request status slug
 * @return jqXHR object
 */
genius.getRedemptionRequestStatus = function(redemption_request_status_slug) {
    if (this.clientEmail !== 'undefined' && this.apiToken !== 'undefined')
    {
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
    } else
        alert('You must specify the clientEmail and apiToken');
};


// wsse.js - Generate WSSE authentication header in JavaScript
// (C) 2005 Victor R. Ruiz <victor*sixapart.com> - http://rvr.typepad.com/
//
// Parts:
//   SHA-1 library (C) 2000-2002 Paul Johnston - BSD license
//   ISO 8601 function (C) 2000 JF Walker All Rights
//   Base64 function (C) aardwulf systems - Creative Commons
// 
// Example call:
//
//   var w = wsseHeader(Username, Password);
//   alert('X-WSSE: ' + w);
//
// Changelog:
//   2005.07.21 - Release 1.0
//

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = "="; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha1(s){return binb2hex(core_sha1(str2binb(s),s.length * chrsz));}
function b64_sha1(s){return binb2b64(core_sha1(str2binb(s),s.length * chrsz));}
function str_sha1(s){return binb2str(core_sha1(str2binb(s),s.length * chrsz));}
function hex_hmac_sha1(key, data){ return binb2hex(core_hmac_sha1(key, data));}
function b64_hmac_sha1(key, data){ return binb2b64(core_hmac_sha1(key, data));}
function str_hmac_sha1(key, data){ return binb2str(core_hmac_sha1(key, data));}

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha1_vm_test()
{
  return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

/*
 * Calculate the HMAC-SHA1 of a key and some data
 */
function core_hmac_sha1(key, data)
{
  var bkey = str2binb(key);
  if(bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
  return core_sha1(opad.concat(hash), 512 + 160);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert an 8-bit or 16-bit string to an array of big-endian words
 * In 8-bit function, characters >255 have their hi-byte silently ignored.
 */
function str2binb(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i%32);
  return bin;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (32 - chrsz - i%32)) & mask);
  return str;
}

/*
 * Convert an array of big-endian words to a hex string.
 */
function binb2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of big-endian words to a base-64 string
 */
function binb2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * (3 -  i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * (3 - (i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * (3 - (i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}

// aardwulf systems
// This work is licensed under a Creative Commons License.
// http://www.aardwulf.com/tutor/base64/
function encode64(input) {
    var keyStr = "ABCDEFGHIJKLMNOP" +
                "QRSTUVWXYZabcdef" +
                "ghijklmnopqrstuv" +
                "wxyz0123456789+/" +
                "=";

    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;

    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
        enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
        enc4 = 64;
        }

        output = output + 
        keyStr.charAt(enc1) + 
        keyStr.charAt(enc2) + 
        keyStr.charAt(enc3) + 
        keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);

    return output;
}

// TITLE
// TempersFewGit v 2.1 (ISO 8601 Time/Date script) 
//
// OBJECTIVE
// Javascript script to detect the time zone where a browser
// is and display the date and time in accordance with the 
// ISO 8601 standard.
//
// AUTHOR
// John Walker 
// http://321WebLiftOff.net
// jfwalker@ureach.com
//
// ENCOMIUM
// Thanks to Stephen Pugh for his help.
//
// CREATED
// 2000-09-15T09:42:53+01:00 
//
// REFERENCES
// For more about ISO 8601 see:
// http://www.w3.org/TR/NOTE-datetime
// http://www.cl.cam.ac.uk/~mgk25/iso-time.html
//
// COPYRIGHT
// This script is Copyright  2000 JF Walker All Rights 
// Reserved but may be freely used provided this colophon is 
// included in full.
//
function isodatetime() {
    var today = new Date();
    var year  = today.getYear();
    if (year < 2000)    // Y2K Fix, Isaac Powell
    year = year + 1900; // http://onyx.idbsu.edu/~ipowell
    var month = today.getMonth() + 1;
    var day  = today.getDate();
    var hour = today.getHours();
    var hourUTC = today.getUTCHours();
    var diff = hour - hourUTC;
    var hourdifference = Math.abs(diff);
    var minute = today.getMinutes();
    var minuteUTC = today.getUTCMinutes();
    var minutedifference;
    var second = today.getSeconds();
    var timezone;
    if (minute != minuteUTC && minuteUTC < 30 && diff < 0) { hourdifference--; }
    if (minute != minuteUTC && minuteUTC > 30 && diff > 0) { hourdifference--; }
    if (minute != minuteUTC) {
    minutedifference = ":30";
    }
    else {
    minutedifference = ":00";
    }
    if (hourdifference < 10) { 
    timezone = "0" + hourdifference + minutedifference;
    }
    else {
    timezone = "" + hourdifference + minutedifference;
    }
    if (diff < 0) {
    timezone = "-" + timezone;
    }
    else {
    timezone = "+" + timezone;
    }
    if (month <= 9) month = "0" + month;
    if (day <= 9) day = "0" + day;
    if (hour <= 9) hour = "0" + hour;
    if (minute <= 9) minute = "0" + minute;
    if (second <= 9) second = "0" + second;
    time = year + "-" + month + "-" + day + "T"
    + hour + ":" + minute + ":" + second + timezone;
    return time;
}

// (C) 2005 Victor R. Ruiz <victor*sixapart.com>
// Code to generate WSSE authentication header
//
// http://www.sixapart.com/pronet/docs/typepad_atom_api
//
// X-WSSE: UsernameToken Username="name", PasswordDigest="digest", Created="timestamp", Nonce="nonce"
//
//  * Username- The username that the user enters (the TypePad username).
//  * Nonce. A secure token generated anew for each HTTP request.
//  * Created. The ISO-8601 timestamp marking when Nonce was created.
//  * PasswordDigest. A SHA-1 digest of the Nonce, Created timestamp, and the password
//    that the user supplies, base64-encoded. In other words, this should be calculated
//    as: base64(sha1(Nonce . Created . Password))
//

function wsse(Password) {
    var PasswordDigest, Nonce, Created;
    var r = new Array;
    
//    Nonce = b64_sha1(isodatetime() + 'There is more than words');
    Nonce = b64_sha1(isodatetime() + Math.floor((Math.random() * 999999999) + 1));
    nonceEncoded = encode64(Nonce);
    Created = isodatetime();
    PasswordDigest = b64_sha1(Nonce + Created + Password);

    r[0] = nonceEncoded;
    r[1] = Created;
    r[2] = PasswordDigest;
    return r;
}

function wsseHeader(Username, Password) {
    var w = wsse(Password);
//    var header = 'UsernameToken Username="' + Username + '", PasswordDigest="' + w[2] + '", Created="' + w[1] + '", Nonce="' + w[0] + '"';
    var header = 'UsernameToken Username="' + Username + '", PasswordDigest="' + w[2] + '", Nonce="' + w[0] + '", Created="' + w[1] + '"';
    return header;
}


