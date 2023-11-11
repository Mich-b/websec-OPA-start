import { UserManager, settings } from "./settings";
import { log } from "./spa";

new UserManager(settings).signinRedirectCallback().then(function(user) {
    console.log("signin response success", user);
    log("login successful")
}).catch(function(err) {
    log(err);
    console.log(err);
});