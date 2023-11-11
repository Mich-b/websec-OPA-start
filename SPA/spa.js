
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

import { UserManager, settings } from "./settings";

///////////////////////////////
// UI event handlers
///////////////////////////////
document.getElementById("clearState").addEventListener("click", clearState, false);
document.getElementById("getUser").addEventListener("click", getUser, false);
document.getElementById("removeUser").addEventListener("click", removeUser, false);
document.getElementById("orderFristi").addEventListener("click", orderFristi, false);
document.getElementById("orderBeer").addEventListener("click", orderBeer, false);
document.getElementById("manageDrinks").addEventListener("click", manageDrinks, false);


document.getElementById("startSigninMainWindow").addEventListener("click", startSigninMainWindow, false);

document.getElementById("startSignoutMainWindow").addEventListener("click", startSignoutMainWindow, false);

///////////////////////////////
// config
///////////////////////////////

function orderFristi() {
    mgr.getUser().then(function (user) {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", settings.api_bar_uri);
        xhr.onload = function () {
            log(xhr.status, JSON.parse(xhr.responseText));
        }
        xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
        xhr.setRequestHeader("Content-Type", "application/json"); // Set the content type to application/json
        var data = JSON.stringify({
            DrinkName: "Fristi", 
        });
        xhr.send(data);
    });
}

function orderBeer() {
    mgr.getUser().then(function (user) {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", settings.api_bar_uri);
        xhr.onload = function () {
            log(xhr.status, JSON.parse(xhr.responseText));
        }
        xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
        xhr.setRequestHeader("Content-Type", "application/json"); // Set the content type to application/json
        var data = JSON.stringify({
            DrinkName: "Beer", 
        });
        xhr.send(data);
    });
}

function manageDrinks() {
    mgr.getUser().then(function (user) {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", settings.api_manageBar_uri);
        xhr.onload = function () {
            log(xhr.status, JSON.parse(xhr.responseText));
        }
        xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
        xhr.setRequestHeader("Content-Type", "application/json"); // Set the content type to application/json
        var data = JSON.stringify({
            DrinkName: "Whiskey", 
        });
        xhr.send(data);
    });
}

function log() {
    document.getElementById("out").innerText = "";

    Array.prototype.forEach.call(arguments, function(msg) {
        if (msg instanceof Error) {
            msg = "Error: " + msg.message;
        }
        else if (typeof msg !== "string") {
            msg = JSON.stringify(msg, null, 2);
        }
        document.getElementById("out").innerText += msg + "\r\n";
    });
}

const mgr = new UserManager(settings);

///////////////////////////////
// events
///////////////////////////////
mgr.events.addAccessTokenExpiring(function () {
    console.log("token expiring");
    log("token expiring");
});

mgr.events.addAccessTokenExpired(function () {
    console.log("token expired");
    log("token expired");
});

mgr.events.addSilentRenewError(function (e) {
    console.log("silent renew error", e.message);
    log("silent renew error", e.message);
});

mgr.events.addUserLoaded(function (user) {
    console.log("user loaded", user);
    mgr.getUser().then(function() {
        console.log("getUser loaded user after userLoaded event fired");
    }, () => {});
});

mgr.events.addUserUnloaded(function (e) {
    console.log("user unloaded");
});

///////////////////////////////
// functions for UI elements
///////////////////////////////
function clearState() {
    mgr.clearStaleState().then(function() {
        log("clearStateState success");
    }).catch(function(err) {
        console.error(err);
        log(err);
    });
}

function getUser() {
    mgr.getUser().then(function(user) {
        log("got user", user);
    }).catch(function(err) {
        console.error(err);
        log(err);
    });
}

function removeUser() {
    mgr.removeUser().then(function() {
        log("user removed");
    }).catch(function(err) {
        console.error(err);
        log(err);
    });
}

function startSigninMainWindow() {
    mgr.signinRedirect({ state: { some: "data" } }).then(function() {
        log("signinRedirect done");
    }).catch(function(err) {
        console.error(err);
        log(err);
    });
}

function endSigninMainWindow() {
    mgr.signinRedirectCallback().then(function(user) {
        log("signed in", user);
    }).catch(function(err) {
        console.error(err);
        log(err);
    });
}

function popupSignin() {
    mgr.signinPopup().then(function(user) {
        log("signed in", user);
    }).catch(function(err) {
        console.error(err);
        log(err);
    });
}

function popupSignout() {
    mgr.signoutPopup().then(function() {
        log("signed out");
    }).catch(function(err) {
        console.error(err);
        log(err);
    });
}

function iframeSignin() {
    mgr.signinSilent().then(function(user) {
        log("signed in", user);
    }).catch(function(err) {
        console.error(err);
        log(err);
    });
}

function startSignoutMainWindow() {
    mgr.signoutRedirect().then(function(resp) {
        log("signed out", resp);
    }).catch(function(err) {
        console.error(err);
        log(err);
    });
}

function endSignoutMainWindow() {
    mgr.signoutRedirectCallback().then(function(resp) {
        log("signed out", resp);
    }).catch(function(err) {
        console.error(err);
        log(err);
    });
}

export {
    log
};