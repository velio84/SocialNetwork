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

            user.getUserWall = function( username, pageSize, startPostId ) {
                var option2 = "wall?StartPostId=" + ( startPostId ? startPostId : "" ) + "&PageSize=" + pageSize;

                return request.query({ option1: username, option2: option2});
            };

            user.searchUser = function(searchTerm) {
                var option1 = "search?searchTerm=" + searchTerm;

                return request.query( { option1: option1 } );
            };

            user.getUserFullData = function( username ) {
                return request.get( { option1: username } );
            };

            user.getUserPreviewData = function( username ) {
                return request.get ({ option1: username, option2: "preview" } );
            };

            user.getUserFriendsPreview = function( username ) {
                return request.get( { option1: username, option2: "friends", option3: "preview" } );
            };

            user.getUserFriends = function( username ) {
                return request.query( { option1: username, option2: "friends" } );
            };

            user.isLogged = function() {
                return authentication.isLogged();
            };

            return user;
        };
	}
);