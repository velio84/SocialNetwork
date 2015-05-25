"use strict";

socialNetwork.factory( "authentication", function(){
    var authentication = {};

    authentication.isLogged = function(){
        return localStorage[ "sessionToken" ] !== undefined;
    };

    authentication.setUserToStorage = function ( data ) {
    	localStorage[ "sessionToken" ] = data[ "access_token" ];
		localStorage[ "username" ] = data[ "userName" ];
		localStorage[ "name" ] = data[ "name" ];
    };

    authentication.clearUserFromStorage = function () {
        delete localStorage[ "sessionToken" ];
		delete localStorage[ "username" ];
		delete localStorage[ "name" ];
    };

    authentication.getSessionToken = function() {
        return localStorage[ "sessionToken" ];
    };

    authentication.getUsername = function() {
        return localStorage[ "username" ];
    };

    authentication.getName = function() {
        return localStorage[ "name" ];
    };

    return authentication;
});