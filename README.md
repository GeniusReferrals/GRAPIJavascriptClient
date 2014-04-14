JavascriptClient
================

Instalando Genius Referral Javascript API
- Genius Referral Javascript API requiere la librar�a jQuery para funcionar por lo que primeramente usted debe incluirla en su proyecto.

- Para utilizar la API Javascript de Genius Referrals directamente desde sus productos descarge el cliente JS de Genius Referral API ubicado en [https://github.com/GeniusReferrals/GRAPIJavascriptClient] e incluyalo en su proyecto.

A continuaci�n se muestra un ejemplo de como utilizar el cliente javascript Genius Referral:


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
                var clientEmail = 'YOUR_USERNAME';
                var apiToken = 'YOUR_API_TOKEN';

                //Defining the Genius Referral authentication object
                var auth = new gr.auth(clientEmail, apiToken);
                
                //Defining the Genius Referral client object
                var client = new gr.client();
				
                // Get the list of Genius Referrals client accounts.
                var response = client.testAuthentication(auth);
                
                response.successs(function(data) {
                    ***
                });
                response.fail(function(data) {
                    ***
                });
            });
        </script>   
    </head>
        <body>
            <div>Genius Referral API Javascript Client</div>
        </body>
</html>     

