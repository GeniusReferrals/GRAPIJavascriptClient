JavascriptClient
================

Instalando Genius Referral Javascript API
- Genius Referral Javascript API requiere la libraría jQuery para funcionar por lo que primeramente usted debe incluirla en su proyecto.

- Para utilizar la API Javascript de Genius Referrals directamente desde sus productos descarge el cliente JS de Genius Referral API ubicado en [https://github.com/GeniusReferrals/GRAPIJavascriptClient] e incluyalo en su proyecto.

A continuaci'on se muestra un ejemplo de como utilizar el cliente javascript Genius Referral:


<!DOCTYPE html>
<html>
    <head>
        <title>Genius Referral API Javascript Client - Example</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        <script type="text/javascript" src="/path/to/genius-api-client.js"></script>
        <script type="text/javascript">
            $(document).ready(function() {

                // Enter the Genius Referral client email and API token  - to handle any unauthenticated requests in the code.
                var clientEmail = 'client1@mail.com';
                var apiToken = '3433148';

                //Defining the Genius Referral authentication object
                genius.construct(clientEmail, apiToken);
                
                // Get the list of Genius Referrals client accounts.
                var response = genius.getAccounts();
                
                response.done(function(data, textStatus, jqXHR) {
                    ***
                });
                response.fail(function(jqXHR, textStatus) {
                    ***
                });
            });
        </script>   
    </head>
        <body>
            <div>Genius Referral API Javascript Client</div>
        </body>
</html>     

