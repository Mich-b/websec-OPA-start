# Get started
## Clone the repository
```
git clone https://github.com/Mich-b/websec-OPA.git
cd websec-OPA
```

## Create the config files
Create a settings.js file in the root of the SPA folder

```
import { Log, UserManager} from "oidc-client-ts";

Log.setLogger(console);
Log.setLevel(Log.INFO);

const url = window.location.origin + "";

export const settings = {
    authority: "<your authority>",
    client_id: "<your clientid>",
    redirect_uri: url + "/callback.html",
    post_logout_redirect_uri: url + "/index.html",
    response_type: "code",
    scope: "openid email roles",

    response_mode: "query",

    filterProtocolClaims: true,
    extraQueryParams: {
        audience: "websec-API",
    },
    api_bar_uri: "http://localhost:5172/api/product",
    api_manageBar_uri: "http://localhost:5172/api/managebar"
};

export {
    Log,
    UserManager
};

```

Create an appsettings.json file in the root of the API folder:

```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Jwt": {
    "Authority": "<your authority>",
    "Audience": "websec-API"
  },
  "Cors": {
    "Origin": "http://localhost:3000"
  }
}

```

## Get up
```
docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up
```

## Test it
Then browse to http://localhost:3000

## Local development
```
cd SPA
npm run start
```

Then start the API from Visual Studio. 