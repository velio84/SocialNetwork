"use strict";

socialNetwork.factory( "userService",
	function( $http, $resource, baseUrl ) {

        return function( token ) {
            $http.defaults.headers.common[ "Authorization" ] = "Bearer " + token;

            var user = {},
                request = $resource(
                baseUrl + "users/:option1/:option2/:option3",
                {
                    option1: "@option1",
                    option2: "@option2",
                    option3: "@option3"
                },
                {
                    edit: {
                        method: "PUT"
                    }
                }
            );

            user.login = function( loginData ) {
                return request.save( { option1: "login" }, loginData );
            };

            user.register = function( registerData ) {
                return request.save( { option1: "register" }, registerData );
            };

            user.logout = function() {
                return request.save( { option1: "logout" } );
            };

            return user;
        };
	}
);